---
id: public_api
title: Aleo 公開 API
sidebar_label: Aleo 公開 API
---
## Provable の API 提供概要

Provable API は、RESTful エンドポイントを通じて Aleo ブロックチェーンへアクセスできるよう設計されています。これによりブロックレベルの情報、トランザクション、トランジションなどのネットワーク情報を照会できます。開発者はデータ取得とトランザクションのブロードキャストの両方について、Aleo と直接やり取りできます。提供されているエンドポイントは、エコシステムが成長し発展するために不可欠です。

## API ベース URL

<!-- markdown-link-check-disable -->
| 環境 | URL |
|-------------|-----|
| Mainnet API | https://api.explorer.provable.com/v1/mainnet |
| Testnet API | https://api.explorer.provable.com/v1/testnet |
<!-- markdown-link-check-enable -->

## レート制限
提供されるすべてのエンドポイントにレート制限が設定されており、以下の制限に従います。

1 秒あたり 5 回、1 日あたり最大 100,000 回のリクエストが許可されます。
レート制限は適用され、API の利用を乱用した場合はブラックリストに登録される可能性があります。より高い上限をご希望の場合は devservices@provable.com までお問い合わせください。

## API エンドポイント

### ブロックデータ
これらのエンドポイントは、ブロック高またはブロックハッシュに基づくブロックレベルの情報を提供します。

| エンドポイント | 説明 |
|----------|-------------|
| [`/latest/block`](./02_get_latest_block.md), [`/block/latest`](./02_get_latest_block.md) | 最新のブロック情報を取得します |
| [`/latest/height`](./03_get_latest_height.md), [`/block/height/latest`](./03_get_latest_height.md) | 最新のブロック高を取得します |
| [`/latest/hash`](./04_get_latest_hash.md), [`/block/hash/latest`](./04_get_latest_hash.md) | 最新のブロックハッシュを取得します |
| [`/find/blockHash/{tx_id}`](./05_find_block_hash.md) | トランザクション ID に基づいてブロックハッシュを取得します |
| [`/block/{height_or_hash}`](./06_get_block.md) | ブロック高またはハッシュを指定してブロックを取得します |
| [`/{network}/block/{height_hash}/transactions`](./07_get_block_transactions.md) | ブロック高またはハッシュを指定してブロック内のトランザクションを取得します |

### ネットワークデータ
これらのエンドポイントは、最新ブロック（すなわちチェーン先端）から収集された最新データとネットワーク情報を取得します。

| エンドポイント | 説明 |
|----------|-------------|
| [`/committee/latest`](./08_get_committee.md), [`/latest/committee`](./08_get_committee.md) | 最新の委員会情報を取得します |
| [`/stateRoot/latest`](./09_get_latest_state_root.md), [`/latest/stateRoot`](./09_get_latest_state_root.md) | 最新のステートルートを取得します |
| [`/latest/totalSupply`](./10_get_latest_total_supply.md) | 総供給量を取得します |
| [`/latest/circulatingSupply`](./11_get_latest_circulating_supply.md) | 流通供給量を取得します |

### プログラムデータ
これらのエンドポイントは、デプロイメントやマッピングを含むプログラム関連の情報を提供します。

| エンドポイント | 説明 |
|----------|-------------|
| [`/find/transactionID/deployment/{program_id}`](./12_find_transaction_id_from_program_id.md) | プログラムのデプロイトランザクション ID を取得します |
| [`/program/{id}`](./13_get_program.md) | ID を指定してプログラム情報を取得します |
| [`/program/{id}/mappings`](./14_get_mapping_names.md) | ID を指定してプログラムのマッピングを取得します |
| [`/program/{id}/mapping/{name}/{key}`](./15_get_mapping_value.md) | 名前とキーを指定して特定のプログラムマッピングを取得します |

### トランザクションデータ
これらのエンドポイントは、確定状態やトランジションを含むトランザクション関連の情報を提供します。

| エンドポイント | 説明 |
|----------|-------------|
| [`/find/transactionID/{transition_id}`](./16_find_transaction_id_from_transition_id.md) | トランジション ID に基づいてトランザクション ID を取得します |
| [`/find/transitionID/{input_or_output_id}`](./17_find_transition_id.md) | 入力または出力 ID に基づいてトランジション ID を取得します |
| [`/transaction/{id}`](./18_get_transaction.md) | ID を指定してトランザクション情報を取得します |
| [`/transaction/confirmed/{id}`](./19_get_transaction_confirmed.md) | トランザクションの確定状況を取得します |
| [`/transaction/unconfirmed/{id}`](./20_get_transaction_unconfirmed.md) | ID を指定して未確定トランザクションの詳細を取得します |
| [`/transaction/broadcast`](./21_transaction_broadcast.md) | 新しいトランザクションをブロードキャストします |
