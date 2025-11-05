---
id: find_transaction_id_from_transition_id
title: トランジション ID からトランザクション ID を検索
sidebar_label: トランジション ID からトランザクション ID を検索
---

```bash title=ENDPOINT
GET /{network}/find/transactionID/{transitionID}
```

指定したトランジション ID を含むトランザクションのトランザクション ID を返します。

### 引数

| パラメーター |  型  |    説明    |
|:---------:|:------:|:-----------------:|
| `transitionID`  | String | トランジション ID |

### レスポンス

| パラメーター |  型  |    説明     |
|:---------:|:------:|:------------------:|
| `result`  | String | トランザクション ID |
