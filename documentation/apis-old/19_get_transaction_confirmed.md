---
id: get_transaction_confirmed
title: トランザクションの確定状況を取得
sidebar_label: トランザクションの確定状況を取得
---

```bash title=ENDPOINT
GET /{network}/transaction/confirmed/{ID}
```

Aleo ブロックチェーンに送信されたトランザクションの確定状況を取得します。

### 引数

| パラメーター | 型 | 説明 |
|:---------:|:----:|:-----------:|
| `ID` | string | 確定状況を確認するトランザクション ID |

### レスポンス

| パラメーター | 型 |            説明            |
|:---------:|:----:|:---------------------------------:|
| `result`  | boolean  | トランザクションの確定状況 |
