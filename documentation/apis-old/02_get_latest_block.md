---
id: get_latest_block
title: 最新のブロックを取得
sidebar_label: 最新のブロックを取得
---

```bash title=ENDPOINT
GET /{network}/block/latest
```

```bash title=ENDPOINT
GET /{network}/latest/block
```

最新のブロックを返します。

### 引数

なし

### レスポンス
| パラメーター |                 型                  |   説明    |
|:---------:|:-------------------------------------:|:----------------:|
| `result`  | [object](../concepts/fundamentals/05_blocks.md) | 最新のブロック |
