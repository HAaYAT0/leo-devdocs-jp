---
title: オフラインクエリ
sidebar_label: オフラインクエリ
---

<a name="OfflineQuery"></a>

## 概要

<p>OfflineQuery オブジェクトは、グローバルステートルートとステートパスを挿入してオフラインで有効な包含証明を作成するために使用します。ネットワークへ接続しなくても証明を生成できるようにする際に役立ちます。</p>



## コンストラクター

### OfflineQuery

<p>新しい OfflineQuery オブジェクトを作成します。ステートルートは文字列として渡す必要があります。</p>

```javascript
OfflineQuery(block_height, state_root)
```

| パラメーター | 型 | 説明 |
| --- | --- | --- |
| block_height | <code>u32</code> | ブロック高 |
| state_root | <code>string</code> | 現在のネットワークのステートルート |
| *return* | <code>OfflineQuery</code> | 生成された OfflineQuery オブジェクト |

## メソッド

<a name="OfflineQuery+addBlockHeight"></a>

### addBlockHeight

<p>OfflineQuery オブジェクトに新しいブロック高を追加します。</p>

```javascript
addBlockHeight(block_height) ► void
```



| パラメーター | 型 | 説明 |
| --- | --- | --- |
| block_height | <code>u32</code> | 追加するブロック高 |
| *return* | <code>void</code> |

---

<a name="OfflineQuery+addStatePath"></a>

### addStatePath

<p>OfflineQuery オブジェクトに新しいステートパスを追加します。</p>

```javascript
addStatePath(commitment:, state_path:) ► void
```



| パラメーター | 型 | 説明 |
| --- | --- | --- |
| commitment: | <code>string</code> | レコード入力に対応するコミットメント |
| state_path: | <code>string</code> | コミットメントに対応するステートパス |
| *return* | <code>void</code> |

---

<a name="OfflineQuery+toString"></a>

### toString

<p>OfflineQuery オブジェクトの JSON 文字列表現を取得します。</p>

```javascript
toString() ► string
```



| パラメーター | 型 |
| --- | --- |
| *return* | <code>string</code> | OfflineQuery オブジェクトの JSON 文字列表現 |

---

<a name="OfflineQuery.fromString"></a>

### fromString

<p>JSON 文字列表現から OfflineQuery オブジェクトを生成します。</p>

```javascript
fromString(JSON) ► OfflineQuery
```



| パラメーター | 型 | 説明 |
| --- | --- | --- |
| JSON | <code>string</code> | OfflineQuery オブジェクトの文字列表現 |
| *return* | <code>OfflineQuery</code> |

---
