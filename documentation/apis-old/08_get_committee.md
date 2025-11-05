---
id: get_committee
title: 委員会を取得
sidebar_label: 委員会を取得
---

```bash title=ENDPOINT
GET /{network}/committee/latest
```

```bash title=ENDPOINT
GET /{network}/latest/committee
```

現在の委員会メンバーとステークの一覧を返します。

### 引数

なし

### レスポンス

| パラメーター |                  型                  |         説明          |
|:---------:|:--------------------------------------:|:----------------------------:|
| `result`  | [array](../concepts/fundamentals/00_accounts.md) | 最新の委員会メンバー |
