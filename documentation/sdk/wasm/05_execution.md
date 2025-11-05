---
title: 実行
sidebar_label: 実行
---

<a name="Execution"></a>

## 概要

<p>Execution クラスは Aleo プログラムの実行を表します。Aleo ネットワーク上でプログラムを実行した際の状態と証明を保持し、グローバルステートルート、実行証明、トランジションといった詳細へアクセスするためのメソッドを提供します。</p>



## メソッド

<a name="Execution+toString"></a>

### toString

<p>実行内容の文字列表現を返します。</p>

```javascript
toString() ► string
```



| パラメーター | 型 |
| --- | --- |
| *return* | <code>string</code> | 実行の文字列表現 |

---

<a name="Execution.fromString"></a>

### fromString

<p>実行の文字列表現から Execution オブジェクトを生成します。</p>

```javascript
fromString(execution) ► Execution
```



| パラメーター | 型 |
| --- | --- |
| execution | <code>string</code> |
| *return* | <code>Execution</code> | 実行オブジェクトの WASM 表現 |

---

<a name="Execution+globalStateRoot"></a>

### globalStateRoot

<p>実行に使用されたグローバルステートルートを返します。</p>

```javascript
globalStateRoot() ► Execution
```



| パラメーター | 型 |
| --- | --- |
| *return* | <code>Execution</code> | 実行で使用されたグローバルステートルート |

---

<a name="Execution+proof"></a>

### proof

<p>実行の証明を返します。</p>

```javascript
proof() ► string
```



| パラメーター | 型 |
| --- | --- |
| *return* | <code>string</code> | 実行証明 |

---

<a name="Execution+transitions"></a>

### transitions

<p>実行に含まれるトランジションを返します。</p>

```javascript
transitions() ► 
```



| パラメーター | 型 |
| --- | --- |
| *return* | <code>undefined</code> | Array&lt;Transition&gt; 実行に含まれるトランジションの配列 |

---
