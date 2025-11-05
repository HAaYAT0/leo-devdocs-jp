---
id: get_latest_total_supply
title: 最新の総供給量を取得
sidebar_label: 最新の総供給量を取得
---

```bash title=ENDPOINT
GET /{network}/latest/totalSupply
```

Aleo ブロックチェーンの最新の総供給量を取得します。

**注記:** 現在、このエンドポイントは Mainnet でのみ利用できます。

### 引数

なし

### レスポンス

| パラメーター | 型 |            説明            |
|:---------:|:----:|:---------------------------------:|
| `result`  | u64  | Aleo credit の総供給量 |
