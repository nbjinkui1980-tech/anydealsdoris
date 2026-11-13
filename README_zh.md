<!--
Licensed to the Apache Software Foundation (ASF) under one
or more contributor license agreements.  See the NOTICE file
distributed with this work for additional information
regarding copyright ownership.  The ASF licenses this file
to you under the Apache License, Version 2.0 (the
"License"); you may not use this file except in compliance
with the License.  You may obtain a copy of the License at

  http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing,
software distributed under the License is distributed on an
"AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, either express or implied.  See the License for the
specific language governing permissions and limitations
under the License.
-->

<div align="center">

# AnydealsDoris

[![License](https://img.shields.io/badge/license-Apache%202-4EB1BA.svg)](https://www.apache.org/licenses/LICENSE-2.0.html)
[![GitHub release](https://img.shields.io/github/release/apache/doris.svg)](https://github.com/apache/doris/releases)
[![OSSRank](https://shields.io/endpoint?url=https://ossrank.com/shield/516)](https://ossrank.com/p/516)
[![Commit activity](https://img.shields.io/github/commit-activity/m/apache/doris)](https://github.com/apache/doris/commits/master/)
[![EN doc](https://img.shields.io/badge/Docs-English-blue.svg)](https://doris.apache.org/docs/gettingStarted/what-is-apache-doris)
[![CN doc](https://img.shields.io/badge/文档-中文版-blue.svg)](https://doris.apache.org/zh-CN/docs/gettingStarted/what-is-apache-doris)

<div>

[![Official Website](<https://img.shields.io/badge/-Visit%20the%20Official%20Website%20%E2%86%92-rgb(15,214,106)?style=for-the-badge>)](https://doris.apache.org/)
[![Quick Download](<https://img.shields.io/badge/-Quick%20%20Download%20%E2%86%92-rgb(66,56,255)?style=for-the-badge>)](https://doris.apache.org/download)


</div>


<div>
    <a href="https://twitter.com/doris_apache"><img src="https://img.shields.io/badge/- @Doris_Apache -424549?style=social&logo=x" height=25></a>
    &nbsp;
    <a href="https://github.com/apache/doris/discussions"><img src="https://img.shields.io/badge/- Discussion -red?style=social&logo=discourse" height=25></a>
    &nbsp;
    <a href="https://join.slack.com/t/apachedoriscommunity/shared_invite/zt-35mzao67o-BrpU70FNKPyB6UlgpXf8_w" height=25></a>
    &nbsp;
    <a href="https://medium.com/@ApacheDoris"><img src="https://img.shields.io/badge/-Medium-red?style=social&logo=medium" height=25></a>

</div>

</div>

---

[English](README.md) | 简体中文

AnydealsDoris 是一款基于 MPP 架构的易用、高性能、实时分析型数据库，以极速和易用著称。在海量数据下，查询结果只需亚秒级响应时间，既能支持高并发的点查询场景，也能支持高吞吐的复杂分析场景。

因此，AnydealsDoris 非常适合报表分析、即席查询、统一数仓构建、数据湖联邦查询加速等场景。用户可以在 AnydealsDoris 之上构建用户行为分析、AB 实验平台、日志检索分析、用户画像分析、订单分析等应用。

> AnydealsDoris 基于 [Apache Doris](https://github.com/apache/doris) 构建。Apache Doris 是 Apache 软件基金会（ASF）的项目，采用 Apache License 2.0 授权。Apache、Apache Doris 及 Apache 羽毛标识是 Apache 软件基金会的商标。本发行版未获得 ASF 的背书。详见 `LICENSE.txt` 和 `NOTICE.txt`。

🎉 查看 🔗[所有版本发布](https://doris.apache.org/zh-CN/docs/releasenotes/all-release)，按时间顺序了解过去一年发布的 Apache Doris 版本。

👀 访问 🔗[官方网站](https://doris.apache.org/zh-CN/)，详细了解 Apache Doris 的核心特性、博客和用户案例。

## 📈 使用场景

如下图所示，数据源经过各种数据集成和加工处理后，通常会存入实时数仓 Apache Doris，以及离线数据湖或数据仓库（Apache Hive、Apache Iceberg 或 Apache Hudi）。

<br />

<img src="https://cdn.selectdb.com/static/What_is_Apache_Doris_3_a61692c2ce.png" />

<br />

Apache Doris 被广泛应用于以下场景：

- **实时数据分析**：
  - **实时报表与决策**：Doris 为企业内部和外部提供实时更新的报表和看板，支持自动化流程中的实时决策。
  - **即席分析**：Doris 提供多维数据分析能力，支持快速的商业智能分析和即席查询，帮助用户从复杂数据中快速发现洞察。
  - **用户画像与行为分析**：Doris 可以分析用户的参与、留存、转化等行为，同时支持人群洞察、人群圈选等行为分析场景。

- **湖仓分析**：
  - **湖仓查询加速**：Doris 借助高效的查询引擎加速湖仓数据查询。
  - **联邦分析**：Doris 支持跨多个数据源的联邦查询，简化架构并消除数据孤岛。
  - **实时数据处理**：Doris 结合实时数据流与批量数据处理能力，满足高并发、低延迟的复杂业务需求。

- **基于 SQL 的可观测性**：
  - **日志与事件分析**：Doris 支持对分布式系统中的日志和事件进行实时或批量分析，帮助发现问题并优化性能。

## 整体架构

Apache Doris 使用 MySQL 协议，高度兼容 MySQL 语法，支持标准 SQL。用户可以通过各类客户端工具访问 Apache Doris，并与 BI 工具无缝集成。

### 存算一体架构

Apache Doris 的存算一体架构精简、易于维护。如下图所示，它只包含两类进程：

- **Frontend（FE）：** 主要负责处理用户请求、查询解析与规划、元数据管理以及节点管理。
- **Backend（BE）：** 主要负责数据存储和查询执行。数据被切分为分片，并以多副本形式存储在 BE 节点上。

![Apache Doris 整体架构](https://cdn.selectdb.com/static/What_is_Apache_Doris_adb26397e2.png)

<br />

在生产环境中，可以部署多个 FE 节点以实现容灾。每个 FE 节点都保存一份完整的元数据副本。FE 节点分为三种角色：

| 角色      | 功能                                                         |
| --------- | ------------------------------------------------------------ |
| Master    | FE Master 节点负责元数据的读写。当 Master 上的元数据发生变更时，会通过 BDB JE 协议同步到 Follower 或 Observer 节点。 |
| Follower  | Follower 节点负责读取元数据。如果 Master 节点故障，可以从 Follower 节点中选出新的 Master。 |
| Observer  | Observer 节点负责读取元数据，主要用于提升查询并发能力。它不参与集群的主节点选举。 |

FE 和 BE 进程都可以水平扩展，单个集群可支持数百台机器、数十 PB 的存储容量。FE 和 BE 进程通过一致性协议保证服务的高可用和数据的高可靠。存算一体架构高度集成，显著降低了分布式系统的运维复杂度。

## Apache Doris 的核心特性

- **高可用**：在 Apache Doris 中，元数据和数据都以多副本方式存储，并通过 quorum 协议同步数据日志。只要多数副本写入完成，即视为写入成功，从而保证少数节点故障时集群仍然可用。Apache Doris 支持同城和跨地域容灾，可以部署双集群主从模式。当部分节点发生故障时，集群可以自动隔离故障节点，避免影响整体集群的可用性。

- **高兼容性**：Apache Doris 高度兼容 MySQL 协议，支持标准 SQL 语法，覆盖大部分 MySQL 和 Hive 函数。这种高兼容性使用户可以无缝迁移和集成现有的应用与工具。Apache Doris 支持 MySQL 生态，用户可以使用 MySQL Client 工具连接 Doris，使运维更加便捷；同时也兼容 BI 报表工具和数据传输工具的 MySQL 协议，保证数据分析和数据传输过程的高效与稳定。

- **实时数仓**：基于 Apache Doris 可以构建实时数仓服务。Apache Doris 提供秒级的数据接入能力，可将上游在线事务数据库的增量变更在数秒内同步到 Doris。借助向量化引擎、MPP 架构和 Pipeline 执行引擎，Doris 提供亚秒级的数据查询能力，从而构建高性能、低延迟的实时数仓平台。

- **湖仓一体**：Apache Doris 可以基于数据湖或关系型数据库等外部数据源构建统一的湖仓架构。Doris 湖仓一体方案实现了数据湖与数据仓库之间的无缝集成和数据自由流动，帮助用户直接利用数仓能力解决数据湖中的数据分析问题，同时充分利用数据湖的数据管理能力来提升数据价值。

- **灵活建模**：Apache Doris 提供多种建模方式，如宽表模型、预聚合模型、星型/雪花模型等。在数据导入时，可以通过 Flink 或 Spark 等计算引擎将数据打平成宽表后写入 Doris，也可以直接将数据导入 Doris，再通过视图、物化视图或实时多表关联完成数据建模。

## 技术概览

Doris 提供高效的 SQL 接口，并完全兼容 MySQL 协议。其查询引擎基于 MPP（大规模并行处理）架构，能够高效执行复杂的分析查询并实现低延迟的实时查询。通过列式存储技术对数据进行编码和压缩，显著优化了查询性能和存储压缩比。

### 接口

Apache Doris 采用 MySQL 协议，支持标准 SQL，高度兼容 MySQL 语法。用户可以通过各类客户端工具访问 Apache Doris，并与 BI 工具无缝集成，包括但不限于 Smartbi、DataEase、FineBI、Tableau、Power BI 和 Apache Superset。Apache Doris 可以作为任何支持 MySQL 协议的 BI 工具的数据源。

### 存储引擎

Apache Doris 拥有列式存储引擎，按列对数据进行编码、压缩和读取，因而可以实现非常高的数据压缩比，并大幅减少不必要的数据扫描，更高效地利用 IO 和 CPU 资源。

Apache Doris 支持多种索引结构以尽量减少数据扫描：

- **排序复合键索引**：用户最多可指定三列组成复合排序键，可以有效裁剪数据，更好地支持高并发报表场景。
- **Min/Max 索引**：在数值类型的等值和范围查询中实现有效的数据过滤。
- **BloomFilter 索引**：对高基数列的等值过滤和裁剪非常有效。
- **倒排索引**：支持对任意字段的快速检索。

Apache Doris 支持多种数据模型，并针对不同场景做了优化：

- **明细模型（Duplicate Key Model）：** 满足事实表明细数据存储需求的明细数据模型。
- **主键模型（Unique Key Model）：** 保证 Key 唯一，相同 Key 的数据会被覆盖，从而实现行级数据更新。
- **聚合模型（Aggregate Key Model）：** 合并具有相同 Key 的 Value 列，通过预聚合显著提升性能。

Apache Doris 还支持强一致的单表物化视图和异步刷新的多表物化视图。单表物化视图由系统自动刷新和维护，无需用户手动干预。多表物化视图可以通过集群内调度或外部调度工具定期刷新，降低数据建模的复杂度。

### 🔍 查询引擎

Apache Doris 拥有基于 MPP 的查询引擎，支持节点间和节点内的并行执行，并支持大表的分布式 Shuffle Join，以更好地处理复杂查询。

<br />

![查询引擎](https://cdn.selectdb.com/static/What_is_Apache_Doris_1_c6f5ba2af9.png)

<br />

Apache Doris 的查询引擎是完全向量化的，所有内存结构都按列式布局，可以大幅减少虚函数调用、提高缓存命中率，并高效利用 SIMD 指令。在宽表聚合场景下，Apache Doris 的性能是非向量化引擎的 5~10 倍。

<br />

![Doris 查询引擎](https://cdn.selectdb.com/static/What_is_Apache_Doris_2_29cf58cc6b.png)

<br />

Apache Doris 采用自适应查询执行技术，根据运行时统计信息动态调整执行计划。例如，可以生成 Runtime Filter 并下推到 Probe 侧。具体来说，它会把过滤条件下推到 Probe 侧最底层的扫描节点，大幅减少需要处理的数据量，提升 Join 性能。Apache Doris 的 Runtime Filter 支持 In/Min/Max/Bloom Filter。

Apache Doris 采用 Pipeline 执行引擎，将查询拆分为多个子任务并行执行，充分发挥多核 CPU 的能力，同时通过限制查询线程数量解决线程膨胀问题。Pipeline 执行引擎减少了数据拷贝与共享，优化了排序和聚合操作，从而显著提升查询效率和吞吐量。

在优化器方面，Apache Doris 采用 CBO（基于代价的优化器）、RBO（基于规则的优化器）和 HBO（基于历史的优化器）相结合的优化策略。RBO 支持常量折叠、子查询改写、谓词下推等；CBO 支持 Join 重排序等优化；HBO 则根据历史查询信息推荐最优执行计划。这些多层次的优化措施确保 Doris 能够在各类查询中枚举出高性能的查询计划。

## 🎆 为什么选择 Apache Doris？

- 🎯 **简单易用：** 仅有两类进程，无其他依赖；支持在线集群扩缩容，副本自动恢复；兼容 MySQL 协议，使用标准 SQL。

- 🚀 **高性能：** 借助列式存储引擎、现代 MPP 架构、向量化查询引擎、预聚合物化视图和数据索引，在低延迟和高吞吐查询场景下都具备极致性能。

- 🖥 **统一一体：** 单个系统即可支持实时数据服务、交互式数据分析和离线数据处理场景。

- ⚛ **联邦查询：** 支持对 Hive、Iceberg、Hudi 等数据湖，以及 MySQL、Elasticsearch 等数据库进行联邦查询。

- ⏩ **丰富的数据导入方式：** 支持从 HDFS/S3 批量导入，以及从 MySQL Binlog/Kafka 流式导入；支持通过 HTTP 接口进行微批写入，以及通过 JDBC 使用 Insert 实时写入。

- 🚙 **丰富的生态：** Spark 通过 Spark-Doris-Connector 读写 Doris；Flink-Doris-Connector 支持 Flink CDC 以 Exactly-Once 语义写入 Doris；同时提供 DBT Doris Adapter，可使用 DBT 对 Doris 中的数据进行转换。

## 🙌 贡献者

**Apache Doris 已于 2022 年 6 月从 Apache 孵化器顺利毕业，成为 Apache 顶级项目。**

衷心感谢 🔗[社区贡献者](https://github.com/apache/doris/graphs/contributors) 对 Apache Doris 的贡献。

[![contrib graph](https://contrib.rocks/image?repo=apache/doris)](https://github.com/apache/doris/graphs/contributors)

## 👨‍👩‍👧‍👦 用户

Apache Doris 目前在中国和全球拥有广泛的用户群体，截至目前，**Apache Doris 已在全球数千家企业的生产环境中使用。** 按市值或估值计算的中国互联网企业 50 强中，超过 80% 长期使用 Apache Doris，包括百度、美团、小米、京东、字节跳动、腾讯、网易、快手、新浪、360、米哈游和贝壳等。它也被广泛应用于金融、能源、制造和电信等传统行业。

Apache Doris 用户列表：🔗[用户](https://doris.apache.org/users)

在 Apache Doris 官网添加你的公司标识：🔗[添加你的公司](https://github.com/apache/doris/discussions/27683)

## 👣 快速开始

### 📚 文档

全部文档 🔗[文档](https://doris.apache.org/zh-CN/docs/gettingStarted/what-is-apache-doris)

### ⬇ 下载

所有发布版本和二进制版本 🔗[下载](https://doris.apache.org/download)

### 🗄 编译

了解如何编译 🔗[编译](https://doris.apache.org/community/source-install/compilation-with-docker)

### 📮 安装

了解如何安装和部署 🔗[安装部署](https://doris.apache.org/docs/install/preparation/env-checking)

## 🧩 组件

### 📝 Doris Connector

Doris 支持通过 Connector 让 Spark/Flink 读取存储在 Doris 中的数据，也支持通过 Connector 向 Doris 写入数据。

🔗[apache/doris-flink-connector](https://github.com/apache/doris-flink-connector)

🔗[apache/doris-spark-connector](https://github.com/apache/doris-spark-connector)

## 🌈 社区与支持

### 📤 订阅邮件列表

邮件列表是 Apache 社区最认可的交流方式。了解如何 🔗[订阅邮件列表](https://doris.apache.org/community/subscribe-mail-list)

### 🙋 报告问题或提交 Pull Request

如果遇到任何问题，欢迎提交 🔗[GitHub Issue](https://github.com/apache/doris/issues) 或在 🔗[GitHub Discussion](https://github.com/apache/doris/discussions) 中发帖，也可以通过提交 🔗[Pull Request](https://github.com/apache/doris/pulls) 来修复问题。

### 🍻 如何贡献

欢迎你提出建议、意见（包括批评）并参与贡献。请参阅 🔗[如何贡献](https://doris.apache.org/community/how-to-contribute/) 和 🔗[代码提交指南](https://doris.apache.org/community/how-to-contribute/pull-request/)

### ⌨ Doris 改进提案（DSIP）

🔗[Doris 改进提案（DSIP）](https://cwiki.apache.org/confluence/display/DORIS/Doris+Improvement+Proposals) 可以看作是 **所有重大功能更新或改进的设计文档集合**。

### 🔑 Backend C++ 编码规范

🔗[Backend C++ 编码规范](https://cwiki.apache.org/confluence/pages/viewpage.action?pageId=240883637) 应被严格遵守，这有助于我们获得更好的代码质量。

## 💬 联系我们

请通过以下邮件列表联系我们。

| 名称                                                                          | 范围                            |                                                                 |                                                                     |                                                                              |
|:------------------------------------------------------------------------------|:--------------------------------|:----------------------------------------------------------------|:--------------------------------------------------------------------|:-----------------------------------------------------------------------------|
| [dev@doris.apache.org](mailto:dev@doris.apache.org)     | 开发相关讨论 | [订阅](mailto:dev-subscribe@doris.apache.org)   | [取消订阅](mailto:dev-unsubscribe@doris.apache.org)   | [归档](http://mail-archives.apache.org/mod_mbox/doris-dev/)   |

## 🧰 链接

* Apache Doris 官方网站 - [Site](https://doris.apache.org)
* 开发者邮件列表 - <dev@doris.apache.org>。发送邮件至 <dev-subscribe@doris.apache.org>，按回复提示订阅邮件列表。
* Slack 频道 - [加入 Slack](https://join.slack.com/t/apachedoriscommunity/shared_invite/zt-35mzao67o-BrpU70FNKPyB6UlgpXf8_w)
* Twitter - [关注 @doris_apache](https://twitter.com/doris_apache)

## 📜 许可证

[Apache License, Version 2.0](https://www.apache.org/licenses/LICENSE-2.0)

> **注意**
> 部分第三方依赖的许可证与 Apache 2.0 许可证不兼容，因此需要禁用部分 Doris 功能才能符合 Apache 2.0 许可证。详情请参阅 `thirdparty/LICENSE.txt`。
