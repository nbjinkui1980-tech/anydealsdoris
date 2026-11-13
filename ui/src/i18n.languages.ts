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
// Language registry for the admin UI. To add a language:
//   1. add public/locales/<name>.json with the same keys as en-us.json
//      (verify with `node scripts/check-i18n.js`)
//   2. import it below and add one entry to `resources`
// i18n.tsx (upstream-owned) does not need to change.
import enUsTrans from '../public/locales/en-us.json';
import zhCnTrans from '../public/locales/zh-cn.json';

// Keys are i18next language codes; a regional code such as "zh-CN" falls back to "zh".
export const resources = {
    en: {translation: enUsTrans},
    zh: {translation: zhCnTrans}
};

export const fallbackLng = 'en';
