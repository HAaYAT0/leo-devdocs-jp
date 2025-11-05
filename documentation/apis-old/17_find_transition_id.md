---
id: find_transition_id
title: トランジション ID を検索
sidebar_label: トランジション ID を検索
---

```bash title=ENDPOINT
GET /{network}/find/transitionID/{inputOrOutputID}
```

入力または出力の ID に対応するトランジションのトランジション ID を返します。

### 引数

|     パラメーター     |  型  |      説明       |
|:-----------------:|:------:|:----------------------:|
| `inputOrOutputID` | String | 入力または出力の ID |

### レスポンス

| パラメーター |  型  |    説明    |
|:---------:|:------:|:-----------------:|
| `result`  | String | トランジション ID |
