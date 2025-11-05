---
id: get_mapping_value
title: マッピング値を取得
sidebar_label: マッピング値を取得
---

```bash title=ENDPOINT
GET /{network}/program/{programID}/mapping/{mappingName}/{mappingKey}
```

指定した mappingKey に対応するキーと値のマッピングの値を返します。


### 引数

| パラメーター     |  型  | 必須 | 説明                                  |
|:--------------|:------:|:--------:|:---------------------------------------------|
| `programID`   | string |   Yes    | 取得したいマッピングが属する program ID      |
| `mappingName` | string |   Yes    | 参照するマッピングの名前            |
| `mappingKey`  | string |   Yes    | マッピング内のキーと値のペアのキー |

### レスポンス

| パラメーター |                  型                   |                  説明                   |
|:---------:|:---------------------------------------:|:----------------------------------------------:|
| `result`  | [object](../concepts/fundamentals/01_programs.md) | マッピング内のキーと値のペアの値 |
