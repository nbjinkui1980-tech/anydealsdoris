/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

// Key-parity check for the admin UI locale files. No dependencies.
// Usage: node scripts/check-i18n.js   (run from ui/, or anywhere)
// Fails (exit 1) when:
//   - a locale file does not parse or has a duplicated key
//   - locale files do not all have the same key set
//   - a key used in src/ is missing from the locale files
//   - a locale key is not used in src/ (unused keys are misleading)
'use strict';

const fs = require('fs');
const path = require('path');

const uiDir = path.resolve(__dirname, '..');
const localeDir = path.join(uiDir, 'public', 'locales');
const srcDir = path.join(uiDir, 'src');
const errors = [];

// Parse a flat JSON object and report duplicated keys (JSON.parse hides them).
function parseLocale(file) {
    const text = fs.readFileSync(file, 'utf8');
    const data = JSON.parse(text);
    const seen = new Set();
    const re = /^\s*"((?:[^"\\]|\\.)*)"\s*:/gm;
    let m;
    while ((m = re.exec(text)) !== null) {
        if (seen.has(m[1])) {
            errors.push(`${path.basename(file)}: duplicated key "${m[1]}"`);
        }
        seen.add(m[1]);
    }
    return data;
}

function walk(dir, out) {
    for (const name of fs.readdirSync(dir)) {
        const full = path.join(dir, name);
        if (fs.statSync(full).isDirectory()) {
            walk(full, out);
        } else if (/\.(tsx?|jsx?)$/.test(name)) {
            out.push(full);
        }
    }
    return out;
}

// Keys used via t('key'), i18n.t('key'), i18nKey="key" and <Trans>key</Trans>.
function collectUsedKeys() {
    const used = new Map();
    const add = (key, file) => {
        if (!used.has(key)) used.set(key, []);
        used.get(key).push(path.relative(uiDir, file));
    };
    const patterns = [
        /\bt\(\s*['"]([^'"]+)['"]/g,
        /i18nKey=["']([^"']+)["']/g,
        /<Trans[^>]*>\s*([A-Za-z0-9_.]+)\s*<\/Trans>/g,
    ];
    for (const file of walk(srcDir, [])) {
        const text = fs.readFileSync(file, 'utf8');
        for (const re of patterns) {
            let m;
            while ((m = re.exec(text)) !== null) add(m[1], file);
        }
    }
    return used;
}

const files = fs.readdirSync(localeDir).filter((f) => f.endsWith('.json')).sort();
if (files.length === 0) {
    console.error('No locale files found in ' + localeDir);
    process.exit(1);
}
const locales = {};
for (const f of files) {
    try {
        locales[f] = parseLocale(path.join(localeDir, f));
    } catch (e) {
        errors.push(`${f}: cannot parse (${e.message})`);
    }
}

const loaded = Object.keys(locales);
const union = new Set();
loaded.forEach((f) => Object.keys(locales[f]).forEach((k) => union.add(k)));

for (const f of loaded) {
    for (const k of union) {
        if (!(k in locales[f])) errors.push(`${f}: missing key "${k}"`);
    }
    for (const [k, v] of Object.entries(locales[f])) {
        if (typeof v !== 'string' || v.trim() === '') {
            errors.push(`${f}: key "${k}" has an empty or non-string value`);
        }
    }
}

const used = collectUsedKeys();
for (const [k, where] of used) {
    if (!union.has(k)) {
        errors.push(`key "${k}" is used in ${[...new Set(where)].join(', ')} but missing from locale files`);
    }
}
for (const k of union) {
    if (!used.has(k)) errors.push(`key "${k}" is defined in locale files but not used in src/`);
}

if (errors.length > 0) {
    console.error(`i18n check FAILED (${errors.length} problem(s)):`);
    errors.forEach((e) => console.error('  - ' + e));
    process.exit(1);
}
console.log(`i18n check OK: ${loaded.length} locale files (${loaded.join(', ')}), ${union.size} keys, ${used.size} keys used.`);
