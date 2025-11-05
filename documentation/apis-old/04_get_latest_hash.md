---
id: get_latest_hash
title: 最新のブロックハッシュを取得
sidebar_label: 最新のブロックハッシュを取得
---

```bash title=ENDPOINT
GET /{network}/block/hash/latest
```
または
```bash title=ENDPOINT
GET /{network}/latest/hash
```

最新のブロックハッシュを返します。

### 引数

なし

### レスポンス

| パラメーター |  型  |                 説明                  |
|:---------:|:------:|:--------------------------------------------:|
| `result`  | string |   最新ブロックのブロックハッシュ    |
