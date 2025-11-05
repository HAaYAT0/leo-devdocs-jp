---
id: get_latest_state_root
title: 最新のステートルートを取得
sidebar_label: 最新のステートルートを取得
---

```bash title=ENDPOINT
GET /{network}/stateRoot/latest
```

```bash title=ENDPOINT
GET /{network}/latest/stateRoot
```

最新のステートルートを返します。

### 引数

なし

### レスポンス
| パラメーター |                 型                  |      説明      |
|:---------:|:-------------------------------------:|:---------------------:|
| `result`  | [string](../concepts/fundamentals/05_blocks.md) | 最新のステートルート |
