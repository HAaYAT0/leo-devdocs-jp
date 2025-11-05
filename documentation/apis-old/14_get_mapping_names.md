---
id: get_mapping_names
title: マッピング名を取得
sidebar_label: マッピング名を取得
---

```bash title=ENDPOINT
GET /{network}/program/{programID}/mappings
```

指定したプログラム ID のプログラムに含まれるマッピングの名前を返します。

### 引数

| パラメーター   |  型  | 必須 | 説明                                     |
|:------------|:------:|:--------:|:------------------------------------------------|
| `programID` | string |   Yes    | 取得したいマッピングが属する program ID        |

### レスポンス

| パラメーター |                  型                   |         説明         |
|:---------:|:---------------------------------------:|:---------------------------:|
|  `array`  | [object](../concepts/fundamentals/01_programs.md) | 要求されたマッピング名 |
