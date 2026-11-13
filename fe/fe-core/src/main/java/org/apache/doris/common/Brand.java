// Licensed to the Apache Software Foundation (ASF) under one
// or more contributor license agreements.  See the NOTICE file
// distributed with this work for additional information
// regarding copyright ownership.  The ASF licenses this file
// to you under the Apache License, Version 2.0 (the
// "License"); you may not use this file except in compliance
// with the License.  You may obtain a copy of the License at
//
//   http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing,
// software distributed under the License is distributed on an
// "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
// KIND, either express or implied.  See the License for the
// specific language governing permissions and limitations
// under the License.

package org.apache.doris.common;

import org.apache.doris.mysql.MysqlHandshakePacket;

/**
 * Central place for the user-visible product brand.
 */
public final class Brand {
    public static final String PRODUCT_NAME = "AnydealsDoris";

    private Brand() {
    }

    /**
     * Server version reported to MySQL clients. The leading numeric part stays unchanged so that
     * clients can still parse it.
     */
    public static String serverVersion() {
        return MysqlHandshakePacket.DEFAULT_SERVER_VERSION + "-" + PRODUCT_NAME + "-" + Version.DORIS_BUILD_VERSION;
    }
}
