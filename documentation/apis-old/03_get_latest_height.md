---
id: get_latest_height
title: 最新のブロック高を取得
sidebar_label: 最新のブロック高を取得
---

```bash title=ENDPOINT
GET /{network}/block/height/latest
```
または
```bash title=ENDPOINT
GET /{network}/latest/height
```

最新のブロック高を返します。

### 引数

なし

### レスポンス

| パラメーター | 型 |            説明            |
|:---------:|:----:|:---------------------------------:|
| `result`  | u32  | チェーン内のブロック数 |
