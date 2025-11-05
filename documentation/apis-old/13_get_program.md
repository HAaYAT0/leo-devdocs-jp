---
id: get_program
title: プログラムを取得
sidebar_label: プログラムを取得
---

```bash title=ENDPOINT
# エディション指定なしでプログラムを取得（最新エディションを使用）
GET /{network}/program/{programID}

# 特定のエディションでプログラムを取得
GET /{network}/program/{programID}/{edition}

# 特定のエディションのプログラムにメタデータを含める
GET /{network}/program/{programID}/{edition}?metadata=true
```

指定したプログラム ID に対応するプログラムを返します。

### 引数

| パラメーター   |  型  | 必須 | 説明                             |
|:------------|:------:|:--------:|:----------------------------------------|
| `programID` | string |   Yes    | 取得したいプログラムの program ID |
| `edition`   | integer|   Yes    | プログラムのエディション                     |
| `metadata`  | boolean|    No     | レスポンスにプログラムのメタデータを含めます    |

### レスポンス

| パラメーター |                  型                   |      説明      |
|:---------:|:---------------------------------------:|:---------------------:|
| `result`  | [object](../concepts/fundamentals/01_programs.md) | 要求されたプログラム |
