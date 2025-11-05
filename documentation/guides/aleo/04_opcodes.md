---
id: opcodes
title: Aleo opcode リファレンス
sidebar_label: Opcode
---

Aleo instructions でサポートされている標準 opcode と暗号 opcode を以下にまとめます。

## 標準 opcode 一覧
| Name                         | 説明                                           |
|------------------------------|:------------------------------------------------------|
| [abs](#abs)                  | 絶対値の計算                                      |
| [abs.w](#abs.w)             | ラップアラウンド付き絶対値の計算                 |
| [add](#add)                 | 加算                                             |
| [add.w](#add.w)             | ラップアラウンド付き加算                         |
| [and](#and)                 | AND 演算                                         |
| [assert.eq](#asserteq)      | 等値の検証                                       |
| [assert.neq](#assertneq)    | 不等の検証                                       |
| [branch.eq](#brancheq)      | 引数が等しい場合に指定位置へ分岐                 |
| [branch.neq](#branchneq)    | 引数が等しくない場合に指定位置へ分岐             |
| [cast](#cast)               | リテラル間の型変換                               |
| [cast.lossy](#castlossy)    | 情報が失われる型変換                             |
| [div](#div)                 | 除算                                             |
| [div.w](#div.w)             | ラップアラウンド付き除算                         |
| [double](#double)           | 2 倍の計算                                       |
| [gt](#gt)                   | 大なり比較                                       |
| [gte](#gte)                 | 大なりイコール比較                               |
| [inv](#inv)                 | 乗法逆元の計算                                   |
| [is.eq](#iseq)              | 等値判定                                         |
| [is.neq](#isneq)            | 非等値判定                                       |
| [lt](#lt)                   | 小なり比較                                       |
| [lte](#lte)                 | 小なりイコール比較                               |
| [mod](#mod)                 | モジュロ演算                                     |
| [mul](#mul)                 | 乗算                                             |
| [mul.w](#mul.w)             | ラップアラウンド付き乗算                         |
| [nand](#nand)               | `boolean` の NAND 演算                           |
| [neg](#neg)                 | 加法逆元の計算                                   |
| [nor](#nor)                 | `boolean` の NOR 演算                            |
| [not](#not)                 | NOT 演算                                         |
| [or](#or)                   | OR 演算                                          |
| [position](#position)       | position コマンド                                |
| [pow](#pow)                 | 冪乗                                             |
| [pow.w](#pow.w)             | ラップアラウンド付き冪乗                         |
| [rand.chacha](#randchacha)  | `finalize` スコープで乱数を生成                  |
| [rem](#rem)                 | 余りの計算                                       |
| [rem.w](#rem.w)             | ラップアラウンド付き余りの計算                   |
| [shl](#shl)                 | 左シフト                                         |
| [shl.w](#shlw)              | ラップアラウンド付き左シフト                     |
| [shr](#shr)                 | 右シフト                                         |
| [shr.w](#shrw)              | ラップアラウンド付き右シフト                     |
| [sqrt](#sqrt)               | 平方根                                           |
| [square](#square)           | 平方                                             |
| [sub](#sub)                 | 減算                                             |
| [sub.w](#subw)              | ラップアラウンド付き減算                         |
| [ternary](#ternary)         | 三項演算                                         |
| [xor](#xor)                 | XOR 演算                                         |

## 暗号 opcode 一覧
| Name                             | 説明                       |
|----------------------------------|:----------------------------------|
| [commit.bhp256](#commitbhp256)   | 256 ビット入力の BHP コミットメント      |
| [commit.bhp512](#commitbhp512)   | 512 ビット入力の BHP コミットメント      |
| [commit.bhp768](#commitbhp768)   | 768 ビット入力の BHP コミットメント      |
| [commit.bhp1024](#commitbhp1024) | 1024 ビット入力の BHP コミットメント     |
| [commit.ped64](#commitped64)     | 64 ビット入力の Pedersen コミットメント  |
| [commit.ped128](#commitped128)   | 128 ビット入力の Pedersen コミットメント |
| [hash.bhp256](#hashbhp256)       | 256 ビット入力の BHP ハッシュ            |
| [hash.bhp512](#hashbhp512)       | 512 ビット入力の BHP ハッシュ            |
| [hash.bhp768](#hashbhp768)       | 768 ビット入力の BHP ハッシュ            |
| [hash.bhp1024](#hashbhp1024)     | 1024 ビット入力の BHP ハッシュ           |
| [hash.keccak256](#hashkeccak256) | 256 ビット入力の Keccak ハッシュ         |
| [hash.keccak384](#hashkeccak384) | 384 ビット入力の Keccak ハッシュ         |
| [hash.keccak512](#hashkeccak512) | 512 ビット入力の Keccak ハッシュ         |
| [hash.ped64](#hashped64)         | 64 ビット入力の Pedersen ハッシュ        |
| [hash.ped128](#hashped128)       | 128 ビット入力の Pedersen ハッシュ       |
| [hash.psd2](#hashpsd2)           | 入力レート 2 の Poseidon ハッシュ        |
| [hash.psd4](#hashpsd4)           | 入力レート 4 の Poseidon ハッシュ        |
| [hash.psd8](#hashpsd8)           | 入力レート 8 の Poseidon ハッシュ        |
| [hash.sha3_256](#hashsha3_256)   | 256 ビット入力の SHA3 ハッシュ           |
| [hash.sha3_384](#hashsha3_384)   | 384 ビット入力の SHA3 ハッシュ           |
| [hash.sha3_512](#hashsha3_512)   | 512 ビット入力の SHA3 ハッシュ           |
| [sign.verify](#signverify)       | Schnorr 署名の検証                      |

## 仕様

以下では Aleo Virtual Machine (AVM) における各 opcode の仕様を説明します。

### `abs`

[トップに戻る](#table-of-standard-opcodes)

#### 説明

入力値の絶対値を計算し、オーバーフローを検査したうえで結果を出力レジスタに格納します。

整数型ではアンダーフローを検出するための制約が追加されます。ラップアラウンドの挙動が必要な場合は [abs.w](#abs.w) を使用してください。アンダーフローは符号付き整数型の最小値を入力したときに発生します。例えば `abs -128i8` は `i8` 型で `128` を表現できないためアンダーフローになります。

#### サポートされる型

| Input  | Destination |
|--------|:------------|
| `I8`   | `I8`        |
| `I16`  | `I16`       |
| `I32`  | `I32`       |
| `I64`  | `I64`       |
| `I128` | `I128`      |

***

### `abs.w` {#abs.w}

[トップに戻る](#table-of-standard-opcodes)

#### 説明

入力値の絶対値を計算し、型の境界でラップアラウンドした結果を出力レジスタに格納します。

#### サポートされる型

| Input  | Destination |
|--------|:------------|
| `I8`   | `I8`        |
| `I16`  | `I16`       |
| `I32`  | `I32`       |
| `I64`  | `I64`       |
| `I128` | `I128`      |

***

### `add`

[トップに戻る](#table-of-standard-opcodes)

#### 説明

`first` に `second` を加算し、結果を `destination` に格納します。

整数型ではオーバーフローを検出するための制約が追加されます。ラップアラウンドの挙動が必要な場合は [add.w](#add.w) を利用してください。

#### サポートされる型

| First    | Second   | Destination |
|----------|----------|-------------|
| `Field`  | `Field`  | `Field`     |
| `Group`  | `Group`  | `Group`     |
| `I8`     | `I8`     | `I8`        |
| `I16`    | `I16`    | `I16`       |
| `I32`    | `I32`    | `I32`       |
| `I64`    | `I64`    | `I64`       |
| `I128`   | `I128`   | `I128`      |
| `U8`     | `U8`     | `U8`        |
| `U16`    | `U16`    | `U16`       |
| `U32`    | `U32`    | `U32`       |
| `U64`    | `U64`    | `U64`       |
| `U128`   | `U128`   | `U128`      |
| `Scalar` | `Scalar` | `Scalar`    |

***

### `add.w` {#add.w}

[トップに戻る](#table-of-standard-opcodes)

#### 説明

`first` に `second` を加算し、型の境界でラップアラウンドした結果を `destination` に格納します。

#### サポートされる型

| First  | Second | Destination |
|--------|--------|:------------|
| `I8`   | `I8`   | `I8`        |
| `I16`  | `I16`  | `I16`       |
| `I32`  | `I32`  | `I32`       |
| `I64`  | `I64`  | `I64`       |
| `I128` | `I128` | `I128`      |
| `U8`   | `U8`   | `U8`        |
| `U16`  | `U16`  | `U16`       |
| `U32`  | `U32`  | `U32`       |
| `U64`  | `U64`  | `U64`       |
| `U128` | `U128` | `U128`      |

***

### `and`

[トップに戻る](#table-of-standard-opcodes)

#### 説明

整数（ビット演算）または `boolean` の `first` と `second` に AND 演算を適用し、結果を `destination` に格納します。

#### サポートされる型

| First     | Second    | Destination |
|-----------|-----------|:------------|
| `Boolean` | `Boolean` | `Boolean`   |
| `I8`      | `I8`      | `I8`        |
| `I16`     | `I16`     | `I16`       |
| `I32`     | `I32`     | `I32`       |
| `I64`     | `I64`     | `I64`       |
| `I128`    | `I128`    | `I128`      |
| `U8`      | `U8`      | `U8`        |
| `U16`     | `U16`     | `U16`       |
| `U32`     | `U32`     | `U32`       |
| `U64`     | `U64`     | `U64`       |
| `U128`    | `U128`    | `U128`      |

***

### `assert.eq`

[トップに戻る](#table-of-standard-opcodes)

#### 説明

`first` と `second` が等しいかを検証し、一致しない場合は処理を停止します。

#### サポートされる型

| First       | Second      |
|-------------|-------------|
| `Address`   | `Address`   |
| `Boolean`   | `Boolean`   |
| `Field`     | `Field`     |
| `Group`     | `Group`     |
| `I8`        | `I8`        |
| `I16`       | `I16`       |
| `I32`       | `I32`       |
| `I64`       | `I64`       |
| `I128`      | `I128`      |
| `U8`        | `U8`        |
| `U16`       | `U16`       |
| `U32`       | `U32`       |
| `U64`       | `U64`       |
| `U128`      | `U128`      |
| `Scalar`    | `Scalar`    |
| `Signature` | `Signature` |
| `Struct`    | `Struct`    |
| `Record`    | `Record`    |

***

### `assert.neq`

[トップに戻る](#table-of-standard-opcodes)

#### 説明

`first` と `second` が等しくないかを検証し、一致した場合は処理を停止します。

#### サポートされる型

| First       | Second      |
|-------------|-------------|
| `Address`   | `Address`   |
| `Boolean`   | `Boolean`   |
| `Field`     | `Field`     |
| `Group`     | `Group`     |
| `I8`        | `I8`        |
| `I16`       | `I16`       |
| `I32`       | `I32`       |
| `I64`       | `I64`       |
| `I128`      | `I128`      |
| `U8`        | `U8`        |
| `U16`       | `U16`       |
| `U32`       | `U32`       |
| `U64`       | `U64`       |
| `U128`      | `U128`      |
| `Scalar`    | `Scalar`    |
| `Signature` | `Signature` |
| `Struct`    | `Struct`    |
| `Record`    | `Record`    |

***

### `branch.eq`

[トップに戻る](#table-of-standard-opcodes)

#### 説明

コマンド `branch.eq <first> <second> to <destination>` は、`first` と `second` が等しい場合に [position](#position) で示される `destination` へ実行を分岐します。このコマンドは finalize スコープに限定され、分岐先はコマンドの直後に置く必要があります。後方分岐は現在サポートされていません。

| First     | Second    | Destination |
|-----------|-----------|-------------|
| `Address` | `Address` | `Position`  |
| `Boolean` | `Boolean` | `Position`  |
| `Field`   | `Field`   | `Position`  |
| `Group`   | `Group`   | `Position`  |
| `I8`      | `I8`      | `Position`  |
| `I16`     | `I16`     | `Position`  |
| `I32`     | `I32`     | `Position`  |
| `I64`     | `I64`     | `Position`  |
| `I128`    | `I128`    | `Position`  |
| `U8`      | `U8`      | `Position`  |
| `U16`     | `U16`     | `Position`  |
| `U32`     | `U32`     | `Position`  |
| `U64`     | `U64`     | `Position`  |
| `U128`    | `U128`    | `Position`  |
| `Scalar`  | `Scalar`  | `Position`  |
| `Struct`  | `Struct`  | `Position`  |
| `Record`  | `Record`  | `Position`  |

***

### `branch.neq`

[トップに戻る](#table-of-standard-opcodes)

#### 説明

コマンド `branch.neq <first> <second> to <destination>` は、`first` と `second` が等しくない場合に [position](#position) で示される `destination` へ実行を分岐します。このコマンドは finalize スコープに限定され、分岐先はコマンドの直後に置く必要があります。後方分岐は現在サポートされていません。


| First     | Second    | Destination |
|-----------|-----------|-------------|
| `Address` | `Address` | `Position`  |
| `Boolean` | `Boolean` | `Position`  |
| `Field`   | `Field`   | `Position`  |
| `Group`   | `Group`   | `Position`  |
| `I8`      | `I8`      | `Position`  |
| `I16`     | `I16`     | `Position`  |
| `I32`     | `I32`     | `Position`  |
| `I64`     | `I64`     | `Position`  |
| `I128`    | `I128`    | `Position`  |
| `U8`      | `U8`      | `Position`  |
| `U16`     | `U16`     | `Position`  |
| `U32`     | `U32`     | `Position`  |
| `U64`     | `U64`     | `Position`  |
| `U128`    | `U128`    | `Position`  |
| `Scalar`  | `Scalar`  | `Position`  |
| `Struct`  | `Struct`  | `Position`  |
| `Record`  | `Record`  | `Position`  |

***

### `cast`

[トップに戻る](#table-of-standard-opcodes)

#### 説明

異なるリテラル間での型変換を可能にします。

#### 利用例

```aleo
input r0 as field.private;
cast r0 into r1 as group;
cast r0 into r2 as u8;
cast r3 r4 r5 r6 into r7 as [boolean; 4u32];
cast r7 into r8 as [[boolean; 4u32]; 1u32];
```

#### サポートされる型

| From      | To                                                                                                        |
|-----------|-----------------------------------------------------------------------------------------------------------|
| `Address` | `Address`, `Field`, `Group`, `Scalar`, `I8`, `I16`, `I32`,`I64`,`I128`, `U8`, `U16`, `U32`, `U64`, `U128` |
| `Boolean` | `Address`, `Field`, `Group`, `Scalar`, `I8`, `I16`, `I32`,`I64`,`I128`, `U8`, `U16`, `U32`, `U64`, `U128` |
| `Field`   | `Address`, `Field`, `Group`, `Scalar`, `I8`, `I16`, `I32`,`I64`,`I128`, `U8`, `U16`, `U32`, `U64`, `U128` |
| `Group`   | `Address`, `Field`, `Group`, `Scalar`, `I8`, `I16`, `I32`,`I64`,`I128`, `U8`, `U16`, `U32`, `U64`, `U128` |
| `I8`      | `Address`, `Field`, `Group`, `Scalar`, `I8`, `I16`, `I32`,`I64`,`I128`, `U8`, `U16`, `U32`, `U64`, `U128` |
| `I16`     | `Address`, `Field`, `Group`, `Scalar`, `I8`, `I16`, `I32`,`I64`,`I128`, `U8`, `U16`, `U32`, `U64`, `U128` |
| `I32`     | `Address`, `Field`, `Group`, `Scalar`, `I8`, `I16`, `I32`,`I64`,`I128`, `U8`, `U16`, `U32`, `U64`, `U128` |
| `I64`     | `Address`, `Field`, `Group`, `Scalar`, `I8`, `I16`, `I32`,`I64`,`I128`, `U8`, `U16`, `U32`, `U64`, `U128` |
| `I128`    | `Address`, `Field`, `Group`, `Scalar`, `I8`, `I16`, `I32`,`I64`,`I128`, `U8`, `U16`, `U32`, `U64`, `U128` |
| `U8`      | `Address`, `Field`, `Group`, `Scalar`, `I8`, `I16`, `I32`,`I64`,`I128`, `U8`, `U16`, `U32`, `U64`, `U128` |
| `U16`     | `Address`, `Field`, `Group`, `Scalar`, `I8`, `I16`, `I32`,`I64`,`I128`, `U8`, `U16`, `U32`, `U64`, `U128` |
| `U32`     | `Address`, `Field`, `Group`, `Scalar`, `I8`, `I16`, `I32`,`I64`,`I128`, `U8`, `U16`, `U32`, `U64`, `U128` |
| `U64`     | `Address`, `Field`, `Group`, `Scalar`, `I8`, `I16`, `I32`,`I64`,`I128`, `U8`, `U16`, `U32`, `U64`, `U128` |
| `U128`    | `Address`, `Field`, `Group`, `Scalar`, `I8`, `I16`, `I32`,`I64`,`I128`, `U8`, `U16`, `U32`, `U64`, `U128` |
| `Scalar`  | `Address`, `Field`, `Group`, `Scalar`, `I8`, `I16`, `I32`,`I64`,`I128`, `U8`, `U16`, `U32`, `U64`, `U128` |

| Elements  | To                |
|-----------|-------------------|
| `Address` | `Array`, `Struct` |
| `Boolean` | `Array`, `Struct` |
| `Field`   | `Array`, `Struct` |
| `Group`   | `Array`, `Struct` |
| `I8`      | `Array`, `Struct` |
| `I16`     | `Array`, `Struct` |
| `I32`     | `Array`, `Struct` |
| `I64`     | `Array`, `Struct` |
| `I128`    | `Array`, `Struct` |
| `U8`      | `Array`, `Struct` |
| `U16`     | `Array`, `Struct` |
| `U32`     | `Array`, `Struct` |
| `U64`     | `Array`, `Struct` |
| `U128`    | `Array`, `Struct` |
| `Scalar`  | `Array`, `Struct` |

***

### `cast.lossy`

[トップに戻る](#table-of-standard-opcodes)

#### 説明

下位ビットを切り捨てながら型変換を行います。

#### 利用例

```aleo
input r0 as field.private;
cast r0 into r1 as group;
cast r0 into r2 as u8;
cast.lossy r0 into r3 as u8; // r0 の下位 8 ビットを取り出し、u8 として r3 に格納します
```

#### サポートされる型
| From      | To                                                                                                        |
|-----------|:----------------------------------------------------------------------------------------------------------|
| `Address` | `Address`, `Field`, `Group`, `Scalar`, `I8`, `I16`, `I32`,`I64`,`I128`, `U8`, `U16`, `U32`, `U64`, `U128` |
| `Boolean` | `Address`, `Field`, `Group`, `Scalar`, `I8`, `I16`, `I32`,`I64`,`I128`, `U8`, `U16`, `U32`, `U64`, `U128` |
| `Field`   | `Address`, `Field`, `Group`, `Scalar`, `I8`, `I16`, `I32`,`I64`,`I128`, `U8`, `U16`, `U32`, `U64`, `U128` |
| `Group`   | `Address`, `Field`, `Group`, `Scalar`, `I8`, `I16`, `I32`,`I64`,`I128`, `U8`, `U16`, `U32`, `U64`, `U128` |
| `I8`      | `Address`, `Field`, `Group`, `Scalar`, `I8`, `I16`, `I32`,`I64`,`I128`, `U8`, `U16`, `U32`, `U64`, `U128` |
| `I16`     | `Address`, `Field`, `Group`, `Scalar`, `I8`, `I16`, `I32`,`I64`,`I128`, `U8`, `U16`, `U32`, `U64`, `U128` |
| `I32`     | `Address`, `Field`, `Group`, `Scalar`, `I8`, `I16`, `I32`,`I64`,`I128`, `U8`, `U16`, `U32`, `U64`, `U128` |
| `I64`     | `Address`, `Field`, `Group`, `Scalar`, `I8`, `I16`, `I32`,`I64`,`I128`, `U8`, `U16`, `U32`, `U64`, `U128` |
| `I128`    | `Address`, `Field`, `Group`, `Scalar`, `I8`, `I16`, `I32`,`I64`,`I128`, `U8`, `U16`, `U32`, `U64`, `U128` |
| `U8`      | `Address`, `Field`, `Group`, `Scalar`, `I8`, `I16`, `I32`,`I64`,`I128`, `U8`, `U16`, `U32`, `U64`, `U128` |
| `U16`     | `Address`, `Field`, `Group`, `Scalar`, `I8`, `I16`, `I32`,`I64`,`I128`, `U8`, `U16`, `U32`, `U64`, `U128` |
| `U32`     | `Address`, `Field`, `Group`, `Scalar`, `I8`, `I16`, `I32`,`I64`,`I128`, `U8`, `U16`, `U32`, `U64`, `U128` |
| `U64`     | `Address`, `Field`, `Group`, `Scalar`, `I8`, `I16`, `I32`,`I64`,`I128`, `U8`, `U16`, `U32`, `U64`, `U128` |
| `U128`    | `Address`, `Field`, `Group`, `Scalar`, `I8`, `I16`, `I32`,`I64`,`I128`, `U8`, `U16`, `U32`, `U64`, `U128` |
| `Scalar`  | `Address`, `Field`, `Group`, `Scalar`, `I8`, `I16`, `I32`,`I64`,`I128`, `U8`, `U16`, `U32`, `U64`, `U128` |

***

### `commit.bhp256`

[トップに戻る](#table-of-standard-opcodes)

#### 説明

`first` の 256 ビットチャンクと `second` の乱数から Bowe-Hopwood-Pedersen コミットメントを計算し、`destination` に格納します。乱数には必ず `Scalar` 型を使用し、命令末尾の `as` で指定したとおり、生成されるコミットメントは `Address`、`Field`、`Group` のいずれかになります。

入力が 129 ビット未満の場合、コンパイラはエラーを返します。

#### サポートされる型

| First     | Second   | Destination                 |
|-----------|----------|:----------------------------|
| `Address` | `Scalar` | `Address`, `Field`, `Group` |
| `Boolean` | `Scalar` | `Address`, `Field`, `Group` |
| `Field`   | `Scalar` | `Address`, `Field`, `Group` |
| `Group`   | `Scalar` | `Address`, `Field`, `Group` |
| `I8`      | `Scalar` | `Address`, `Field`, `Group` |
| `I16`     | `Scalar` | `Address`, `Field`, `Group` |
| `I32`     | `Scalar` | `Address`, `Field`, `Group` |
| `I64`     | `Scalar` | `Address`, `Field`, `Group` |
| `I128`    | `Scalar` | `Address`, `Field`, `Group` |
| `U8`      | `Scalar` | `Address`, `Field`, `Group` |
| `U16`     | `Scalar` | `Address`, `Field`, `Group` |
| `U32`     | `Scalar` | `Address`, `Field`, `Group` |
| `U64`     | `Scalar` | `Address`, `Field`, `Group` |
| `U128`    | `Scalar` | `Address`, `Field`, `Group` |
| `Scalar`  | `Scalar` | `Address`, `Field`, `Group` |
| `Struct`  | `Scalar` | `Address`, `Field`, `Group` |
| `Array`   | `Scalar` | `Address`, `Field`, `Group` |

***

### `commit.bhp512`

[トップに戻る](#table-of-standard-opcodes)

#### 説明

`first` の 512 ビットチャンクと `second` の乱数から Bowe-Hopwood-Pedersen コミットメントを計算し、`destination` に格納します。乱数には必ず `Scalar` 型を使用し、命令末尾の `as` で指定したとおり、生成されるコミットメントは `Address`、`Field`、`Group` のいずれかになります。

入力が 171 ビット未満の場合、コンパイラはエラーを返します。

#### サポートされる型

| First     | Second   | Destination                 |
|-----------|----------|:----------------------------|
| `Address` | `Scalar` | `Address`, `Field`, `Group` |
| `Boolean` | `Scalar` | `Address`, `Field`, `Group` |
| `Field`   | `Scalar` | `Address`, `Field`, `Group` |
| `Group`   | `Scalar` | `Address`, `Field`, `Group` |
| `I8`      | `Scalar` | `Address`, `Field`, `Group` |
| `I16`     | `Scalar` | `Address`, `Field`, `Group` |
| `I32`     | `Scalar` | `Address`, `Field`, `Group` |
| `I64`     | `Scalar` | `Address`, `Field`, `Group` |
| `I128`    | `Scalar` | `Address`, `Field`, `Group` |
| `U8`      | `Scalar` | `Address`, `Field`, `Group` |
| `U16`     | `Scalar` | `Address`, `Field`, `Group` |
| `U32`     | `Scalar` | `Address`, `Field`, `Group` |
| `U64`     | `Scalar` | `Address`, `Field`, `Group` |
| `U128`    | `Scalar` | `Address`, `Field`, `Group` |
| `Scalar`  | `Scalar` | `Address`, `Field`, `Group` |
| `Struct`  | `Scalar` | `Address`, `Field`, `Group` |
| `Array`   | `Scalar` | `Address`, `Field`, `Group` |

***

### `commit.bhp768`

[トップに戻る](#table-of-standard-opcodes)

#### 説明

`first` の 768 ビットチャンクと `second` の乱数から Bowe-Hopwood-Pedersen コミットメントを計算し、`destination` に格納します。乱数には必ず `Scalar` 型を使用し、命令末尾の `as` で指定したとおり、生成されるコミットメントは `Address`、`Field`、`Group` のいずれかになります。

入力が 129 ビット未満の場合、コンパイラはエラーを返します。

#### サポートされる型

| First     | Second   | Destination                 |
|-----------|----------|:----------------------------|
| `Address` | `Scalar` | `Address`, `Field`, `Group` |
| `Boolean` | `Scalar` | `Address`, `Field`, `Group` |
| `Field`   | `Scalar` | `Address`, `Field`, `Group` |
| `Group`   | `Scalar` | `Address`, `Field`, `Group` |
| `I8`      | `Scalar` | `Address`, `Field`, `Group` |
| `I16`     | `Scalar` | `Address`, `Field`, `Group` |
| `I32`     | `Scalar` | `Address`, `Field`, `Group` |
| `I64`     | `Scalar` | `Address`, `Field`, `Group` |
| `I128`    | `Scalar` | `Address`, `Field`, `Group` |
| `U8`      | `Scalar` | `Address`, `Field`, `Group` |
| `U16`     | `Scalar` | `Address`, `Field`, `Group` |
| `U32`     | `Scalar` | `Address`, `Field`, `Group` |
| `U64`     | `Scalar` | `Address`, `Field`, `Group` |
| `U128`    | `Scalar` | `Address`, `Field`, `Group` |
| `Scalar`  | `Scalar` | `Address`, `Field`, `Group` |
| `Struct`  | `Scalar` | `Address`, `Field`, `Group` |
| `Array`   | `Scalar` | `Address`, `Field`, `Group` |

***

### `commit.bhp1024`

[トップに戻る](#table-of-standard-opcodes)

#### 説明

`first` の 1024 ビットチャンクと `second` の乱数から Bowe-Hopwood-Pedersen コミットメントを計算し、`destination` に格納します。乱数には必ず `Scalar` 型を使用し、命令末尾の `as` で指定したとおり、生成されるコミットメントは `Address`、`Field`、`Group` のいずれかになります。

入力が 171 ビット未満の場合、コンパイラはエラーを返します。

#### サポートされる型

| First     | Second   | Destination                 |
|-----------|----------|:----------------------------|
| `Address` | `Scalar` | `Address`, `Field`, `Group` |
| `Boolean` | `Scalar` | `Address`, `Field`, `Group` |
| `Field`   | `Scalar` | `Address`, `Field`, `Group` |
| `Group`   | `Scalar` | `Address`, `Field`, `Group` |
| `I8`      | `Scalar` | `Address`, `Field`, `Group` |
| `I16`     | `Scalar` | `Address`, `Field`, `Group` |
| `I32`     | `Scalar` | `Address`, `Field`, `Group` |
| `I64`     | `Scalar` | `Address`, `Field`, `Group` |
| `I128`    | `Scalar` | `Address`, `Field`, `Group` |
| `U8`      | `Scalar` | `Address`, `Field`, `Group` |
| `U16`     | `Scalar` | `Address`, `Field`, `Group` |
| `U32`     | `Scalar` | `Address`, `Field`, `Group` |
| `U64`     | `Scalar` | `Address`, `Field`, `Group` |
| `U128`    | `Scalar` | `Address`, `Field`, `Group` |
| `Scalar`  | `Scalar` | `Address`, `Field`, `Group` |
| `Struct`  | `Scalar` | `Address`, `Field`, `Group` |
| `Array`   | `Scalar` | `Address`, `Field`, `Group` |

***

### `commit.ped64`

[トップに戻る](#table-of-standard-opcodes)

#### 説明

`first` に最大 64 ビットの入力と `second` の乱数をとり、Pedersen コミットメントを計算して `destination` に格納します。乱数には必ず `Scalar` 型を使用し、命令末尾の `as` で指定したとおり、生成されるコミットメントは `Address`、`Field`、`Group` のいずれかです。

`Struct` の値が 64 ビットの上限を超える場合、コンパイラはエラーを返します。

#### サポートされる型

| First     | Second   | Destination                 |
|-----------|----------|:----------------------------|
| `Boolean` | `Scalar` | `Address`, `Field`, `Group` |
| `I8`      | `Scalar` | `Address`, `Field`, `Group` |
| `I16`     | `Scalar` | `Address`, `Field`, `Group` |
| `I32`     | `Scalar` | `Address`, `Field`, `Group` |
| `U8`      | `Scalar` | `Address`, `Field`, `Group` |
| `U16`     | `Scalar` | `Address`, `Field`, `Group` |
| `U32`     | `Scalar` | `Address`, `Field`, `Group` |
| `Struct`  | `Scalar` | `Address`, `Field`, `Group` |
| `Array`   | `Scalar` | `Address`, `Field`, `Group` |

***

### `commit.ped128`

[トップに戻る](#table-of-standard-opcodes)

#### 説明

`first` に最大 128 ビットの入力と `second` の乱数をとり、Pedersen コミットメントを計算して `destination` に格納します。乱数には必ず `Scalar` 型を使用し、命令末尾の `as` で指定したとおり、生成されるコミットメントは `Address`、`Field`、`Group` のいずれかです。

`Struct` の値が 128 ビットの上限を超える場合、コンパイラはエラーを返します。

#### サポートされる型

| First     | Second   | Destination                 |
|-----------|----------|:----------------------------|
| `Boolean` | `Scalar` | `Address`, `Field`, `Group` |
| `I8`      | `Scalar` | `Address`, `Field`, `Group` |
| `I16`     | `Scalar` | `Address`, `Field`, `Group` |
| `I32`     | `Scalar` | `Address`, `Field`, `Group` |
| `I64`     | `Scalar` | `Address`, `Field`, `Group` |
| `U8`      | `Scalar` | `Address`, `Field`, `Group` |
| `U16`     | `Scalar` | `Address`, `Field`, `Group` |
| `U32`     | `Scalar` | `Address`, `Field`, `Group` |
| `U64`     | `Scalar` | `Address`, `Field`, `Group` |
| `Struct`  | `Scalar` | `Address`, `Field`, `Group` |
| `Array`   | `Scalar` | `Address`, `Field`, `Group` |

***

### `div`

[トップに戻る](#table-of-standard-opcodes)

#### 説明

`first` を `second` で割り、その結果を `destination` に格納します。`second` がゼロの場合は停止します。

整数型では切り捨て除算を行い、アンダーフローを検出する制約が追加されます。符号付き整数型の最小値を `-1` で割るとアンダーフローが発生します。例えば `div -128i8 -1i8` は `i8` 型で `128` を表現できないためアンダーフローになります。

整数型でラップアラウンドの挙動が必要な場合は [div.w](#div.w) を利用してください。

#### サポートされる型

| First   | Second  | Destination |
|---------|---------|:------------|
| `Field` | `Field` | `Field`     |
| `I8`    | `I8`    | `I8`        |
| `I16`   | `I16`   | `I16`       |
| `I32`   | `I32`   | `I32`       |
| `I64`   | `I64`   | `I64`       |
| `I128`  | `I128`  | `I128`      |
| `U8`    | `U8`    | `U8`        |
| `U16`   | `U16`   | `U16`       |
| `U32`   | `U32`   | `U32`       |
| `U64`   | `U64`   | `U64`       |
| `U128`  | `U128`  | `U128`      |

***

### `div.w` {#div.w}

[トップに戻る](#table-of-standard-opcodes)

#### 説明

`first` を `second` で割り、型の境界でラップアラウンドした結果を `destination` に格納します。

#### サポートされる型

| First  | Second | Destination |
|--------|--------|:------------|
| `I8`   | `I8`   | `I8`        |
| `I16`  | `I16`  | `I16`       |
| `I32`  | `I32`  | `I32`       |
| `I64`  | `I64`  | `I64`       |
| `I128` | `I128` | `I128`      |
| `U8`   | `U8`   | `U8`        |
| `U16`  | `U16`  | `U16`       |
| `U32`  | `U32`  | `U32`       |
| `U64`  | `U64`  | `U64`       |
| `U128` | `U128` | `U128`      |

***

### `double`

[トップに戻る](#table-of-standard-opcodes)

#### 説明

入力値を 2 倍し、結果を `destination` に格納します。

#### サポートされる型

| Input   | Destination |
|---------|-------------|
| `Field` | `Field`     |
| `Group` | `Group`     |

***

### `gt`

[トップに戻る](#table-of-standard-opcodes)

#### 説明

`first` が `second` より大きいかを判定し、結果を `destination` に格納します。

#### サポートされる型

| First     | Second    | Destination |
|-----------|-----------|-------------|
| `Field`   | `Field`   | `Boolean`   |
| `I8`      | `I8`      | `Boolean`   |
| `I16`     | `I16`     | `Boolean`   |
| `I32`     | `I32`     | `Boolean`   |
| `I64`     | `I64`     | `Boolean`   |
| `I128`    | `I128`    | `Boolean`   |
| `U8`      | `U8`      | `Boolean`   |
| `U16`     | `U16`     | `Boolean`   |
| `U32`     | `U32`     | `Boolean`   |
| `U64`     | `U64`     | `Boolean`   |
| `U128`    | `U128`    | `Boolean`   |
| `Scalar`  | `Scalar`  | `Boolean`   |

***

### `gte`

[トップに戻る](#table-of-standard-opcodes)

#### 説明

`first` が `second` 以上かを判定し、結果を `destination` に格納します。

#### サポートされる型

| First    | Second   | Destination |
|----------|----------|-------------|
| `Field`  | `Field`  | `Boolean`   |
| `I8`     | `I8`     | `Boolean`   |
| `I16`    | `I16`    | `Boolean`   |
| `I32`    | `I32`    | `Boolean`   |
| `I64`    | `I64`    | `Boolean`   |
| `I128`   | `I128`   | `Boolean`   |
| `U8`     | `U8`     | `Boolean`   |
| `U16`    | `U16`    | `Boolean`   |
| `U32`    | `U32`    | `Boolean`   |
| `U64`    | `U64`    | `Boolean`   |
| `U128`   | `U128`   | `Boolean`   |
| `Scalar` | `Scalar` | `Boolean`   |

***

### `hash.bhp256`

[トップに戻る](#table-of-standard-opcodes)

#### 説明

`first` の 256 ビットチャンクから Bowe-Hopwood-Pedersen ハッシュを計算し、`destination` に格納します。生成されるハッシュは命令末尾の `as` で指定したとおり、算術型（`U8`、`U16`、`U32`、`U64`、`U128`、`I8`、`I16`、`I32`、`I64`、`I128`、`Field`、`Group`、`Scalar`）または `Address` になります。

入力が 129 ビット未満の場合、コンパイラはエラーを返します。

#### サポートされる型

| First     | Destination                                                                                               |
|-----------|:----------------------------------------------------------------------------------------------------------|
| `Address` | `Address`, `Field`, `Group`, `Scalar`, `I8`, `I16`, `I32`,`I64`,`I128`, `U8`, `U16`, `U32`, `U64`, `U128` |
| `Boolean` | `Address`, `Field`, `Group`, `Scalar`, `I8`, `I16`, `I32`,`I64`,`I128`, `U8`, `U16`, `U32`, `U64`, `U128` |
| `Field`   | `Address`, `Field`, `Group`, `Scalar`, `I8`, `I16`, `I32`,`I64`,`I128`, `U8`, `U16`, `U32`, `U64`, `U128` |
| `Group`   | `Address`, `Field`, `Group`, `Scalar`, `I8`, `I16`, `I32`,`I64`,`I128`, `U8`, `U16`, `U32`, `U64`, `U128` |
| `I8`      | `Address`, `Field`, `Group`, `Scalar`, `I8`, `I16`, `I32`,`I64`,`I128`, `U8`, `U16`, `U32`, `U64`, `U128` |
| `I16`     | `Address`, `Field`, `Group`, `Scalar`, `I8`, `I16`, `I32`,`I64`,`I128`, `U8`, `U16`, `U32`, `U64`, `U128` |
| `I32`     | `Address`, `Field`, `Group`, `Scalar`, `I8`, `I16`, `I32`,`I64`,`I128`, `U8`, `U16`, `U32`, `U64`, `U128` |
| `I64`     | `Address`, `Field`, `Group`, `Scalar`, `I8`, `I16`, `I32`,`I64`,`I128`, `U8`, `U16`, `U32`, `U64`, `U128` |
| `I128`    | `Address`, `Field`, `Group`, `Scalar`, `I8`, `I16`, `I32`,`I64`,`I128`, `U8`, `U16`, `U32`, `U64`, `U128` |
| `U8`      | `Address`, `Field`, `Group`, `Scalar`, `I8`, `I16`, `I32`,`I64`,`I128`, `U8`, `U16`, `U32`, `U64`, `U128` |
| `U16`     | `Address`, `Field`, `Group`, `Scalar`, `I8`, `I16`, `I32`,`I64`,`I128`, `U8`, `U16`, `U32`, `U64`, `U128` |
| `U32`     | `Address`, `Field`, `Group`, `Scalar`, `I8`, `I16`, `I32`,`I64`,`I128`, `U8`, `U16`, `U32`, `U64`, `U128` |
| `U64`     | `Address`, `Field`, `Group`, `Scalar`, `I8`, `I16`, `I32`,`I64`,`I128`, `U8`, `U16`, `U32`, `U64`, `U128` |
| `U128`    | `Address`, `Field`, `Group`, `Scalar`, `I8`, `I16`, `I32`,`I64`,`I128`, `U8`, `U16`, `U32`, `U64`, `U128` |
| `Scalar`  | `Address`, `Field`, `Group`, `Scalar`, `I8`, `I16`, `I32`,`I64`,`I128`, `U8`, `U16`, `U32`, `U64`, `U128` |
| `Struct`  | `Address`, `Field`, `Group`, `Scalar`, `I8`, `I16`, `I32`,`I64`,`I128`, `U8`, `U16`, `U32`, `U64`, `U128` |
| `Array`   | `Address`, `Field`, `Group`, `Scalar`, `I8`, `I16`, `I32`,`I64`,`I128`, `U8`, `U16`, `U32`, `U64`, `U128` |

***

### `hash.bhp512`

[トップに戻る](#table-of-standard-opcodes)

#### 説明

`first` の 512 ビットチャンクから Bowe-Hopwood-Pedersen ハッシュを計算し、`destination` に格納します。生成されるハッシュは命令末尾の `as` で指定したとおり、算術型（`U8`、`U16`、`U32`、`U64`、`U128`、`I8`、`I16`、`I32`、`I64`、`I128`、`Field`、`Group`、`Scalar`）または `Address` になります。

入力が 171 ビット未満の場合、コンパイラはエラーを返します。

#### サポートされる型

| First     | Destination                                                                                               |
|-----------|:----------------------------------------------------------------------------------------------------------|
| `Array`   | `Address`, `Field`, `Group`, `Scalar`, `I8`, `I16`, `I32`,`I64`,`I128`, `U8`, `U16`, `U32`, `U64`, `U128` |
| `Address` | `Address`, `Field`, `Group`, `Scalar`, `I8`, `I16`, `I32`,`I64`,`I128`, `U8`, `U16`, `U32`, `U64`, `U128` |
| `Boolean` | `Address`, `Field`, `Group`, `Scalar`, `I8`, `I16`, `I32`,`I64`,`I128`, `U8`, `U16`, `U32`, `U64`, `U128` |
| `Field`   | `Address`, `Field`, `Group`, `Scalar`, `I8`, `I16`, `I32`,`I64`,`I128`, `U8`, `U16`, `U32`, `U64`, `U128` |
| `Group`   | `Address`, `Field`, `Group`, `Scalar`, `I8`, `I16`, `I32`,`I64`,`I128`, `U8`, `U16`, `U32`, `U64`, `U128` |
| `I8`      | `Address`, `Field`, `Group`, `Scalar`, `I8`, `I16`, `I32`,`I64`,`I128`, `U8`, `U16`, `U32`, `U64`, `U128` |
| `I16`     | `Address`, `Field`, `Group`, `Scalar`, `I8`, `I16`, `I32`,`I64`,`I128`, `U8`, `U16`, `U32`, `U64`, `U128` |
| `I32`     | `Address`, `Field`, `Group`, `Scalar`, `I8`, `I16`, `I32`,`I64`,`I128`, `U8`, `U16`, `U32`, `U64`, `U128` |
| `I64`     | `Address`, `Field`, `Group`, `Scalar`, `I8`, `I16`, `I32`,`I64`,`I128`, `U8`, `U16`, `U32`, `U64`, `U128` |
| `I128`    | `Address`, `Field`, `Group`, `Scalar`, `I8`, `I16`, `I32`,`I64`,`I128`, `U8`, `U16`, `U32`, `U64`, `U128` |
| `U8`      | `Address`, `Field`, `Group`, `Scalar`, `I8`, `I16`, `I32`,`I64`,`I128`, `U8`, `U16`, `U32`, `U64`, `U128` |
| `U16`     | `Address`, `Field`, `Group`, `Scalar`, `I8`, `I16`, `I32`,`I64`,`I128`, `U8`, `U16`, `U32`, `U64`, `U128` |
| `U32`     | `Address`, `Field`, `Group`, `Scalar`, `I8`, `I16`, `I32`,`I64`,`I128`, `U8`, `U16`, `U32`, `U64`, `U128` |
| `U64`     | `Address`, `Field`, `Group`, `Scalar`, `I8`, `I16`, `I32`,`I64`,`I128`, `U8`, `U16`, `U32`, `U64`, `U128` |
| `U128`    | `Address`, `Field`, `Group`, `Scalar`, `I8`, `I16`, `I32`,`I64`,`I128`, `U8`, `U16`, `U32`, `U64`, `U128` |
| `Scalar`  | `Address`, `Field`, `Group`, `Scalar`, `I8`, `I16`, `I32`,`I64`,`I128`, `U8`, `U16`, `U32`, `U64`, `U128` |
| `Struct`  | `Address`, `Field`, `Group`, `Scalar`, `I8`, `I16`, `I32`,`I64`,`I128`, `U8`, `U16`, `U32`, `U64`, `U128` |

***

### `hash.bhp768`

[トップに戻る](#table-of-standard-opcodes)

#### 説明

`first` の 768 ビットチャンクから Bowe-Hopwood-Pedersen ハッシュを計算し、`destination` に格納します。生成されるハッシュは命令末尾の `as` で指定したとおり、算術型（`U8`、`U16`、`U32`、`U64`、`U128`、`I8`、`I16`、`I32`、`I64`、`I128`、`Field`、`Group`、`Scalar`）または `Address` になります。

入力が 129 ビット未満の場合、コンパイラはエラーを返します。

#### サポートされる型

| First     | Destination                                                                                               |
|-----------|:----------------------------------------------------------------------------------------------------------|
| `Array`   | `Address`, `Field`, `Group`, `Scalar`, `I8`, `I16`, `I32`,`I64`,`I128`, `U8`, `U16`, `U32`, `U64`, `U128` |
| `Address` | `Address`, `Field`, `Group`, `Scalar`, `I8`, `I16`, `I32`,`I64`,`I128`, `U8`, `U16`, `U32`, `U64`, `U128` |
| `Boolean` | `Address`, `Field`, `Group`, `Scalar`, `I8`, `I16`, `I32`,`I64`,`I128`, `U8`, `U16`, `U32`, `U64`, `U128` |
| `Field`   | `Address`, `Field`, `Group`, `Scalar`, `I8`, `I16`, `I32`,`I64`,`I128`, `U8`, `U16`, `U32`, `U64`, `U128` |
| `Group`   | `Address`, `Field`, `Group`, `Scalar`, `I8`, `I16`, `I32`,`I64`,`I128`, `U8`, `U16`, `U32`, `U64`, `U128` |
| `I8`      | `Address`, `Field`, `Group`, `Scalar`, `I8`, `I16`, `I32`,`I64`,`I128`, `U8`, `U16`, `U32`, `U64`, `U128` |
| `I16`     | `Address`, `Field`, `Group`, `Scalar`, `I8`, `I16`, `I32`,`I64`,`I128`, `U8`, `U16`, `U32`, `U64`, `U128` |
| `I32`     | `Address`, `Field`, `Group`, `Scalar`, `I8`, `I16`, `I32`,`I64`,`I128`, `U8`, `U16`, `U32`, `U64`, `U128` |
| `I64`     | `Address`, `Field`, `Group`, `Scalar`, `I8`, `I16`, `I32`,`I64`,`I128`, `U8`, `U16`, `U32`, `U64`, `U128` |
| `I128`    | `Address`, `Field`, `Group`, `Scalar`, `I8`, `I16`, `I32`,`I64`,`I128`, `U8`, `U16`, `U32`, `U64`, `U128` |
| `U8`      | `Address`, `Field`, `Group`, `Scalar`, `I8`, `I16`, `I32`,`I64`,`I128`, `U8`, `U16`, `U32`, `U64`, `U128` |
| `U16`     | `Address`, `Field`, `Group`, `Scalar`, `I8`, `I16`, `I32`,`I64`,`I128`, `U8`, `U16`, `U32`, `U64`, `U128` |
| `U32`     | `Address`, `Field`, `Group`, `Scalar`, `I8`, `I16`, `I32`,`I64`,`I128`, `U8`, `U16`, `U32`, `U64`, `U128` |
| `U64`     | `Address`, `Field`, `Group`, `Scalar`, `I8`, `I16`, `I32`,`I64`,`I128`, `U8`, `U16`, `U32`, `U64`, `U128` |
| `U128`    | `Address`, `Field`, `Group`, `Scalar`, `I8`, `I16`, `I32`,`I64`,`I128`, `U8`, `U16`, `U32`, `U64`, `U128` |
| `Scalar`  | `Address`, `Field`, `Group`, `Scalar`, `I8`, `I16`, `I32`,`I64`,`I128`, `U8`, `U16`, `U32`, `U64`, `U128` |
| `Struct`  | `Address`, `Field`, `Group`, `Scalar`, `I8`, `I16`, `I32`,`I64`,`I128`, `U8`, `U16`, `U32`, `U64`, `U128` |

***

### `hash.bhp1024`

[トップに戻る](#table-of-standard-opcodes)

#### 説明

`first` の 1024 ビットチャンクから Bowe-Hopwood-Pedersen ハッシュを計算し、`destination` に格納します。生成されるハッシュは命令末尾の `as` で指定したとおり、算術型（`U8`、`U16`、`U32`、`U64`、`U128`、`I8`、`I16`、`I32`、`I64`、`I128`、`Field`、`Group`、`Scalar`）または `Address` になります。

入力が 171 ビット未満の場合、コンパイラはエラーを返します。

#### サポートされる型

| First     | Destination                                                                                               |
|-----------|:----------------------------------------------------------------------------------------------------------|
| `Array`   | `Address`, `Field`, `Group`, `Scalar`, `I8`, `I16`, `I32`,`I64`,`I128`, `U8`, `U16`, `U32`, `U64`, `U128` |
| `Address` | `Address`, `Field`, `Group`, `Scalar`, `I8`, `I16`, `I32`,`I64`,`I128`, `U8`, `U16`, `U32`, `U64`, `U128` |
| `Boolean` | `Address`, `Field`, `Group`, `Scalar`, `I8`, `I16`, `I32`,`I64`,`I128`, `U8`, `U16`, `U32`, `U64`, `U128` |
| `Field`   | `Address`, `Field`, `Group`, `Scalar`, `I8`, `I16`, `I32`,`I64`,`I128`, `U8`, `U16`, `U32`, `U64`, `U128` |
| `Group`   | `Address`, `Field`, `Group`, `Scalar`, `I8`, `I16`, `I32`,`I64`,`I128`, `U8`, `U16`, `U32`, `U64`, `U128` |
| `I8`      | `Address`, `Field`, `Group`, `Scalar`, `I8`, `I16`, `I32`,`I64`,`I128`, `U8`, `U16`, `U32`, `U64`, `U128` |
| `I16`     | `Address`, `Field`, `Group`, `Scalar`, `I8`, `I16`, `I32`,`I64`,`I128`, `U8`, `U16`, `U32`, `U64`, `U128` |
| `I32`     | `Address`, `Field`, `Group`, `Scalar`, `I8`, `I16`, `I32`,`I64`,`I128`, `U8`, `U16`, `U32`, `U64`, `U128` |
| `I64`     | `Address`, `Field`, `Group`, `Scalar`, `I8`, `I16`, `I32`,`I64`,`I128`, `U8`, `U16`, `U32`, `U64`, `U128` |
| `I128`    | `Address`, `Field`, `Group`, `Scalar`, `I8`, `I16`, `I32`,`I64`,`I128`, `U8`, `U16`, `U32`, `U64`, `U128` |
| `U8`      | `Address`, `Field`, `Group`, `Scalar`, `I8`, `I16`, `I32`,`I64`,`I128`, `U8`, `U16`, `U32`, `U64`, `U128` |
| `U16`     | `Address`, `Field`, `Group`, `Scalar`, `I8`, `I16`, `I32`,`I64`,`I128`, `U8`, `U16`, `U32`, `U64`, `U128` |
| `U32`     | `Address`, `Field`, `Group`, `Scalar`, `I8`, `I16`, `I32`,`I64`,`I128`, `U8`, `U16`, `U32`, `U64`, `U128` |
| `U64`     | `Address`, `Field`, `Group`, `Scalar`, `I8`, `I16`, `I32`,`I64`,`I128`, `U8`, `U16`, `U32`, `U64`, `U128` |
| `U128`    | `Address`, `Field`, `Group`, `Scalar`, `I8`, `I16`, `I32`,`I64`,`I128`, `U8`, `U16`, `U32`, `U64`, `U128` |
| `Scalar`  | `Address`, `Field`, `Group`, `Scalar`, `I8`, `I16`, `I32`,`I64`,`I128`, `U8`, `U16`, `U32`, `U64`, `U128` |
| `Struct`  | `Address`, `Field`, `Group`, `Scalar`, `I8`, `I16`, `I32`,`I64`,`I128`, `U8`, `U16`, `U32`, `U64`, `U128` |

***

### `hash.keccak256`

[トップに戻る](#table-of-standard-opcodes)

#### 説明

`first` に Keccak ハッシュを適用し、256 ビットのダイジェストを `destination` に格納します。生成されるハッシュは命令末尾の `as` で指定したとおり、算術型（`U8`、`U16`、`U32`、`U64`、`U128`、`I8`、`I16`、`I32`、`I64`、`I128`、`Field`、`Group`、`Scalar`）または `Address` になります。

#### サポートされる型

| First     | Destination                                                                                               |
|-----------|:----------------------------------------------------------------------------------------------------------|
| `Array`   | `Address`, `Field`, `Group`, `Scalar`, `I8`, `I16`, `I32`,`I64`,`I128`, `U8`, `U16`, `U32`, `U64`, `U128` |
| `Address` | `Address`, `Field`, `Group`, `Scalar`, `I8`, `I16`, `I32`,`I64`,`I128`, `U8`, `U16`, `U32`, `U64`, `U128` |
| `Boolean` | `Address`, `Field`, `Group`, `Scalar`, `I8`, `I16`, `I32`,`I64`,`I128`, `U8`, `U16`, `U32`, `U64`, `U128` |
| `Field`   | `Address`, `Field`, `Group`, `Scalar`, `I8`, `I16`, `I32`,`I64`,`I128`, `U8`, `U16`, `U32`, `U64`, `U128` |
| `Group`   | `Address`, `Field`, `Group`, `Scalar`, `I8`, `I16`, `I32`,`I64`,`I128`, `U8`, `U16`, `U32`, `U64`, `U128` |
| `I8`      | `Address`, `Field`, `Group`, `Scalar`, `I8`, `I16`, `I32`,`I64`,`I128`, `U8`, `U16`, `U32`, `U64`, `U128` |
| `I16`     | `Address`, `Field`, `Group`, `Scalar`, `I8`, `I16`, `I32`,`I64`,`I128`, `U8`, `U16`, `U32`, `U64`, `U128` |
| `I32`     | `Address`, `Field`, `Group`, `Scalar`, `I8`, `I16`, `I32`,`I64`,`I128`, `U8`, `U16`, `U32`, `U64`, `U128` |
| `I64`     | `Address`, `Field`, `Group`, `Scalar`, `I8`, `I16`, `I32`,`I64`,`I128`, `U8`, `U16`, `U32`, `U64`, `U128` |
| `I128`    | `Address`, `Field`, `Group`, `Scalar`, `I8`, `I16`, `I32`,`I64`,`I128`, `U8`, `U16`, `U32`, `U64`, `U128` |
| `U8`      | `Address`, `Field`, `Group`, `Scalar`, `I8`, `I16`, `I32`,`I64`,`I128`, `U8`, `U16`, `U32`, `U64`, `U128` |
| `U16`     | `Address`, `Field`, `Group`, `Scalar`, `I8`, `I16`, `I32`,`I64`,`I128`, `U8`, `U16`, `U32`, `U64`, `U128` |
| `U32`     | `Address`, `Field`, `Group`, `Scalar`, `I8`, `I16`, `I32`,`I64`,`I128`, `U8`, `U16`, `U32`, `U64`, `U128` |
| `U64`     | `Address`, `Field`, `Group`, `Scalar`, `I8`, `I16`, `I32`,`I64`,`I128`, `U8`, `U16`, `U32`, `U64`, `U128` |
| `U128`    | `Address`, `Field`, `Group`, `Scalar`, `I8`, `I16`, `I32`,`I64`,`I128`, `U8`, `U16`, `U32`, `U64`, `U128` |
| `Scalar`  | `Address`, `Field`, `Group`, `Scalar`, `I8`, `I16`, `I32`,`I64`,`I128`, `U8`, `U16`, `U32`, `U64`, `U128` |
| `Struct`  | `Address`, `Field`, `Group`, `Scalar`, `I8`, `I16`, `I32`,`I64`,`I128`, `U8`, `U16`, `U32`, `U64`, `U128` |

***

### `hash.keccak384`

[トップに戻る](#table-of-standard-opcodes)

#### 説明

`first` に Keccak ハッシュを適用し、384 ビットのダイジェストを `destination` に格納します。生成されるハッシュは命令末尾の `as` で指定したとおり、算術型（`U8`、`U16`、`U32`、`U64`、`U128`、`I8`、`I16`、`I32`、`I64`、`I128`、`Field`、`Group`、`Scalar`）または `Address` になります。

#### サポートされる型

| First     | Destination                                                                                               |
|-----------|:----------------------------------------------------------------------------------------------------------|
| `Array`   | `Address`, `Field`, `Group`, `Scalar`, `I8`, `I16`, `I32`,`I64`,`I128`, `U8`, `U16`, `U32`, `U64`, `U128` |
| `Address` | `Address`, `Field`, `Group`, `Scalar`, `I8`, `I16`, `I32`,`I64`,`I128`, `U8`, `U16`, `U32`, `U64`, `U128` |
| `Boolean` | `Address`, `Field`, `Group`, `Scalar`, `I8`, `I16`, `I32`,`I64`,`I128`, `U8`, `U16`, `U32`, `U64`, `U128` |
| `Field`   | `Address`, `Field`, `Group`, `Scalar`, `I8`, `I16`, `I32`,`I64`,`I128`, `U8`, `U16`, `U32`, `U64`, `U128` |
| `Group`   | `Address`, `Field`, `Group`, `Scalar`, `I8`, `I16`, `I32`,`I64`,`I128`, `U8`, `U16`, `U32`, `U64`, `U128` |
| `I8`      | `Address`, `Field`, `Group`, `Scalar`, `I8`, `I16`, `I32`,`I64`,`I128`, `U8`, `U16`, `U32`, `U64`, `U128` |
| `I16`     | `Address`, `Field`, `Group`, `Scalar`, `I8`, `I16`, `I32`,`I64`,`I128`, `U8`, `U16`, `U32`, `U64`, `U128` |
| `I32`     | `Address`, `Field`, `Group`, `Scalar`, `I8`, `I16`, `I32`,`I64`,`I128`, `U8`, `U16`, `U32`, `U64`, `U128` |
| `I64`     | `Address`, `Field`, `Group`, `Scalar`, `I8`, `I16`, `I32`,`I64`,`I128`, `U8`, `U16`, `U32`, `U64`, `U128` |
| `I128`    | `Address`, `Field`, `Group`, `Scalar`, `I8`, `I16`, `I32`,`I64`,`I128`, `U8`, `U16`, `U32`, `U64`, `U128` |
| `U8`      | `Address`, `Field`, `Group`, `Scalar`, `I8`, `I16`, `I32`,`I64`,`I128`, `U8`, `U16`, `U32`, `U64`, `U128` |
| `U16`     | `Address`, `Field`, `Group`, `Scalar`, `I8`, `I16`, `I32`,`I64`,`I128`, `U8`, `U16`, `U32`, `U64`, `U128` |
| `U32`     | `Address`, `Field`, `Group`, `Scalar`, `I8`, `I16`, `I32`,`I64`,`I128`, `U8`, `U16`, `U32`, `U64`, `U128` |
| `U64`     | `Address`, `Field`, `Group`, `Scalar`, `I8`, `I16`, `I32`,`I64`,`I128`, `U8`, `U16`, `U32`, `U64`, `U128` |
| `U128`    | `Address`, `Field`, `Group`, `Scalar`, `I8`, `I16`, `I32`,`I64`,`I128`, `U8`, `U16`, `U32`, `U64`, `U128` |
| `Scalar`  | `Address`, `Field`, `Group`, `Scalar`, `I8`, `I16`, `I32`,`I64`,`I128`, `U8`, `U16`, `U32`, `U64`, `U128` |
| `Struct`  | `Address`, `Field`, `Group`, `Scalar`, `I8`, `I16`, `I32`,`I64`,`I128`, `U8`, `U16`, `U32`, `U64`, `U128` |

***

### `hash.keccak512`

[トップに戻る](#table-of-standard-opcodes)

#### 説明

`first` に Keccak ハッシュを適用し、512 ビットのダイジェストを `destination` に格納します。生成されるハッシュは命令末尾の `as` で指定したとおり、算術型（`U8`、`U16`、`U32`、`U64`、`U128`、`I8`、`I16`、`I32`、`I64`、`I128`、`Field`、`Group`、`Scalar`）または `Address` になります。

#### サポートされる型

| First     | Destination                                                                                               |
|-----------|:----------------------------------------------------------------------------------------------------------|
| `Array`   | `Address`, `Field`, `Group`, `Scalar`, `I8`, `I16`, `I32`,`I64`,`I128`, `U8`, `U16`, `U32`, `U64`, `U128` |
| `Address` | `Address`, `Field`, `Group`, `Scalar`, `I8`, `I16`, `I32`,`I64`,`I128`, `U8`, `U16`, `U32`, `U64`, `U128` |
| `Boolean` | `Address`, `Field`, `Group`, `Scalar`, `I8`, `I16`, `I32`,`I64`,`I128`, `U8`, `U16`, `U32`, `U64`, `U128` |
| `Field`   | `Address`, `Field`, `Group`, `Scalar`, `I8`, `I16`, `I32`,`I64`,`I128`, `U8`, `U16`, `U32`, `U64`, `U128` |
| `Group`   | `Address`, `Field`, `Group`, `Scalar`, `I8`, `I16`, `I32`,`I64`,`I128`, `U8`, `U16`, `U32`, `U64`, `U128` |
| `I8`      | `Address`, `Field`, `Group`, `Scalar`, `I8`, `I16`, `I32`,`I64`,`I128`, `U8`, `U16`, `U32`, `U64`, `U128` |
| `I16`     | `Address`, `Field`, `Group`, `Scalar`, `I8`, `I16`, `I32`,`I64`,`I128`, `U8`, `U16`, `U32`, `U64`, `U128` |
| `I32`     | `Address`, `Field`, `Group`, `Scalar`, `I8`, `I16`, `I32`,`I64`,`I128`, `U8`, `U16`, `U32`, `U64`, `U128` |
| `I64`     | `Address`, `Field`, `Group`, `Scalar`, `I8`, `I16`, `I32`,`I64`,`I128`, `U8`, `U16`, `U32`, `U64`, `U128` |
| `I128`    | `Address`, `Field`, `Group`, `Scalar`, `I8`, `I16`, `I32`,`I64`,`I128`, `U8`, `U16`, `U32`, `U64`, `U128` |
| `U8`      | `Address`, `Field`, `Group`, `Scalar`, `I8`, `I16`, `I32`,`I64`,`I128`, `U8`, `U16`, `U32`, `U64`, `U128` |
| `U16`     | `Address`, `Field`, `Group`, `Scalar`, `I8`, `I16`, `I32`,`I64`,`I128`, `U8`, `U16`, `U32`, `U64`, `U128` |
| `U32`     | `Address`, `Field`, `Group`, `Scalar`, `I8`, `I16`, `I32`,`I64`,`I128`, `U8`, `U16`, `U32`, `U64`, `U128` |
| `U64`     | `Address`, `Field`, `Group`, `Scalar`, `I8`, `I16`, `I32`,`I64`,`I128`, `U8`, `U16`, `U32`, `U64`, `U128` |
| `U128`    | `Address`, `Field`, `Group`, `Scalar`, `I8`, `I16`, `I32`,`I64`,`I128`, `U8`, `U16`, `U32`, `U64`, `U128` |
| `Scalar`  | `Address`, `Field`, `Group`, `Scalar`, `I8`, `I16`, `I32`,`I64`,`I128`, `U8`, `U16`, `U32`, `U64`, `U128` |
| `Struct`  | `Address`, `Field`, `Group`, `Scalar`, `I8`, `I16`, `I32`,`I64`,`I128`, `U8`, `U16`, `U32`, `U64`, `U128` |

***

### `hash.ped64`

[トップに戻る](#table-of-standard-opcodes)

#### 説明

`first` に最大 64 ビットの入力を取り、Pedersen ハッシュを計算して `destination` に格納します。生成されるハッシュは命令末尾の `as` で指定したとおり、算術型（`U8`、`U16`、`U32`、`U64`、`U128`、`I8`、`I16`、`I32`、`I64`、`I128`、`Field`、`Group`、`Scalar`）または `Address` になります。

`Struct` の値が 64 ビットの上限を超える場合、コンパイラはエラーを返します。

#### サポートされる型

| First     | Destination                                                                                               |
|-----------|:----------------------------------------------------------------------------------------------------------|
| `Array`   | `Address`, `Field`, `Group`, `Scalar`, `I8`, `I16`, `I32`,`I64`,`I128`, `U8`, `U16`, `U32`, `U64`, `U128` |
| `Boolean` | `Address`, `Field`, `Group`, `Scalar`, `I8`, `I16`, `I32`,`I64`,`I128`, `U8`, `U16`, `U32`, `U64`, `U128` |
| `I8`      | `Address`, `Field`, `Group`, `Scalar`, `I8`, `I16`, `I32`,`I64`,`I128`, `U8`, `U16`, `U32`, `U64`, `U128` |
| `I16`     | `Address`, `Field`, `Group`, `Scalar`, `I8`, `I16`, `I32`,`I64`,`I128`, `U8`, `U16`, `U32`, `U64`, `U128` |
| `I32`     | `Address`, `Field`, `Group`, `Scalar`, `I8`, `I16`, `I32`,`I64`,`I128`, `U8`, `U16`, `U32`, `U64`, `U128` |
| `U8`      | `Address`, `Field`, `Group`, `Scalar`, `I8`, `I16`, `I32`,`I64`,`I128`, `U8`, `U16`, `U32`, `U64`, `U128` |
| `U16`     | `Address`, `Field`, `Group`, `Scalar`, `I8`, `I16`, `I32`,`I64`,`I128`, `U8`, `U16`, `U32`, `U64`, `U128` |
| `U32`     | `Address`, `Field`, `Group`, `Scalar`, `I8`, `I16`, `I32`,`I64`,`I128`, `U8`, `U16`, `U32`, `U64`, `U128` |
| `Struct`  | `Address`, `Field`, `Group`, `Scalar`, `I8`, `I16`, `I32`,`I64`,`I128`, `U8`, `U16`, `U32`, `U64`, `U128` |

***

### `hash.ped128`

[トップに戻る](#table-of-standard-opcodes)

#### 説明

`first` に最大 128 ビットの入力を取り、Pedersen ハッシュを計算して `destination` に格納します。生成されるハッシュは命令末尾の `as` で指定したとおり、算術型（`U8`、`U16`、`U32`、`U64`、`U128`、`I8`、`I16`、`I32`、`I64`、`I128`、`Field`、`Group`、`Scalar`）または `Address` になります。

`Struct` の値が 128 ビットの上限を超える場合、コンパイラはエラーを返します。

#### サポートされる型

| First     | Destination                                                                                               |
|-----------|:----------------------------------------------------------------------------------------------------------|
| `Array`   | `Address`, `Field`, `Group`, `Scalar`, `I8`, `I16`, `I32`,`I64`,`I128`, `U8`, `U16`, `U32`, `U64`, `U128` |
| `Boolean` | `Address`, `Field`, `Group`, `Scalar`, `I8`, `I16`, `I32`,`I64`,`I128`, `U8`, `U16`, `U32`, `U64`, `U128` |
| `I8`      | `Address`, `Field`, `Group`, `Scalar`, `I8`, `I16`, `I32`,`I64`,`I128`, `U8`, `U16`, `U32`, `U64`, `U128` |
| `I16`     | `Address`, `Field`, `Group`, `Scalar`, `I8`, `I16`, `I32`,`I64`,`I128`, `U8`, `U16`, `U32`, `U64`, `U128` |
| `I32`     | `Address`, `Field`, `Group`, `Scalar`, `I8`, `I16`, `I32`,`I64`,`I128`, `U8`, `U16`, `U32`, `U64`, `U128` |
| `I64`     | `Address`, `Field`, `Group`, `Scalar`, `I8`, `I16`, `I32`,`I64`,`I128`, `U8`, `U16`, `U32`, `U64`, `U128` |
| `U8`      | `Address`, `Field`, `Group`, `Scalar`, `I8`, `I16`, `I32`,`I64`,`I128`, `U8`, `U16`, `U32`, `U64`, `U128` |
| `U16`     | `Address`, `Field`, `Group`, `Scalar`, `I8`, `I16`, `I32`,`I64`,`I128`, `U8`, `U16`, `U32`, `U64`, `U128` |
| `U32`     | `Address`, `Field`, `Group`, `Scalar`, `I8`, `I16`, `I32`,`I64`,`I128`, `U8`, `U16`, `U32`, `U64`, `U128` |
| `U64`     | `Address`, `Field`, `Group`, `Scalar`, `I8`, `I16`, `I32`,`I64`,`I128`, `U8`, `U16`, `U32`, `U64`, `U128` |
| `Struct`  | `Address`, `Field`, `Group`, `Scalar`, `I8`, `I16`, `I32`,`I64`,`I128`, `U8`, `U16`, `U32`, `U64`, `U128` |

***

### `hash.psd2`

[トップに戻る](#table-of-standard-opcodes)

#### 説明

入力レート 2 の Poseidon ハッシュを `first` から計算し、`destination` に格納します。生成されるハッシュは命令末尾の `as` で指定したとおり、算術型（`U8`、`U16`、`U32`、`U64`、`U128`、`I8`、`I16`、`I32`、`I64`、`I128`、`Field`、`Group`、`Scalar`）または `Address` になります。

#### サポートされる型

| First     | Destination                                                                                               |
|-----------|:----------------------------------------------------------------------------------------------------------|
| `Array`   | `Address`, `Field`, `Group`, `Scalar`, `I8`, `I16`, `I32`,`I64`,`I128`, `U8`, `U16`, `U32`, `U64`, `U128` |
| `Address` | `Address`, `Field`, `Group`, `Scalar`, `I8`, `I16`, `I32`,`I64`,`I128`, `U8`, `U16`, `U32`, `U64`, `U128` |
| `Boolean` | `Address`, `Field`, `Group`, `Scalar`, `I8`, `I16`, `I32`,`I64`,`I128`, `U8`, `U16`, `U32`, `U64`, `U128` |
| `Field`   | `Address`, `Field`, `Group`, `Scalar`, `I8`, `I16`, `I32`,`I64`,`I128`, `U8`, `U16`, `U32`, `U64`, `U128` |
| `Group`   | `Address`, `Field`, `Group`, `Scalar`, `I8`, `I16`, `I32`,`I64`,`I128`, `U8`, `U16`, `U32`, `U64`, `U128` |
| `I8`      | `Address`, `Field`, `Group`, `Scalar`, `I8`, `I16`, `I32`,`I64`,`I128`, `U8`, `U16`, `U32`, `U64`, `U128` |
| `I16`     | `Address`, `Field`, `Group`, `Scalar`, `I8`, `I16`, `I32`,`I64`,`I128`, `U8`, `U16`, `U32`, `U64`, `U128` |
| `I32`     | `Address`, `Field`, `Group`, `Scalar`, `I8`, `I16`, `I32`,`I64`,`I128`, `U8`, `U16`, `U32`, `U64`, `U128` |
| `I64`     | `Address`, `Field`, `Group`, `Scalar`, `I8`, `I16`, `I32`,`I64`,`I128`, `U8`, `U16`, `U32`, `U64`, `U128` |
| `I128`    | `Address`, `Field`, `Group`, `Scalar`, `I8`, `I16`, `I32`,`I64`,`I128`, `U8`, `U16`, `U32`, `U64`, `U128` |
| `U8`      | `Address`, `Field`, `Group`, `Scalar`, `I8`, `I16`, `I32`,`I64`,`I128`, `U8`, `U16`, `U32`, `U64`, `U128` |
| `U16`     | `Address`, `Field`, `Group`, `Scalar`, `I8`, `I16`, `I32`,`I64`,`I128`, `U8`, `U16`, `U32`, `U64`, `U128` |
| `U32`     | `Address`, `Field`, `Group`, `Scalar`, `I8`, `I16`, `I32`,`I64`,`I128`, `U8`, `U16`, `U32`, `U64`, `U128` |
| `U64`     | `Address`, `Field`, `Group`, `Scalar`, `I8`, `I16`, `I32`,`I64`,`I128`, `U8`, `U16`, `U32`, `U64`, `U128` |
| `U128`    | `Address`, `Field`, `Group`, `Scalar`, `I8`, `I16`, `I32`,`I64`,`I128`, `U8`, `U16`, `U32`, `U64`, `U128` |
| `Scalar`  | `Address`, `Field`, `Group`, `Scalar`, `I8`, `I16`, `I32`,`I64`,`I128`, `U8`, `U16`, `U32`, `U64`, `U128` |
| `Struct`  | `Address`, `Field`, `Group`, `Scalar`, `I8`, `I16`, `I32`,`I64`,`I128`, `U8`, `U16`, `U32`, `U64`, `U128` |

***

### `hash.psd4`

[トップに戻る](#table-of-standard-opcodes)

#### 説明

入力レート 4 の Poseidon ハッシュを `first` から計算し、`destination` に格納します。生成されるハッシュは命令末尾の `as` で指定したとおり、算術型（`U8`、`U16`、`U32`、`U64`、`U128`、`I8`、`I16`、`I32`、`I64`、`I128`、`Field`、`Group`、`Scalar`）または `Address` になります。

#### サポートされる型

| First     | Destination                                                                                               |
|-----------|:----------------------------------------------------------------------------------------------------------|
| `Array`   | `Address`, `Field`, `Group`, `Scalar`, `I8`, `I16`, `I32`,`I64`,`I128`, `U8`, `U16`, `U32`, `U64`, `U128` |
| `Address` | `Address`, `Field`, `Group`, `Scalar`, `I8`, `I16`, `I32`,`I64`,`I128`, `U8`, `U16`, `U32`, `U64`, `U128` |
| `Boolean` | `Address`, `Field`, `Group`, `Scalar`, `I8`, `I16`, `I32`,`I64`,`I128`, `U8`, `U16`, `U32`, `U64`, `U128` |
| `Field`   | `Address`, `Field`, `Group`, `Scalar`, `I8`, `I16`, `I32`,`I64`,`I128`, `U8`, `U16`, `U32`, `U64`, `U128` |
| `Group`   | `Address`, `Field`, `Group`, `Scalar`, `I8`, `I16`, `I32`,`I64`,`I128`, `U8`, `U16`, `U32`, `U64`, `U128` |
| `I8`      | `Address`, `Field`, `Group`, `Scalar`, `I8`, `I16`, `I32`,`I64`,`I128`, `U8`, `U16`, `U32`, `U64`, `U128` |
| `I16`     | `Address`, `Field`, `Group`, `Scalar`, `I8`, `I16`, `I32`,`I64`,`I128`, `U8`, `U16`, `U32`, `U64`, `U128` |
| `I32`     | `Address`, `Field`, `Group`, `Scalar`, `I8`, `I16`, `I32`,`I64`,`I128`, `U8`, `U16`, `U32`, `U64`, `U128` |
| `I64`     | `Address`, `Field`, `Group`, `Scalar`, `I8`, `I16`, `I32`,`I64`,`I128`, `U8`, `U16`, `U32`, `U64`, `U128` |
| `I128`    | `Address`, `Field`, `Group`, `Scalar`, `I8`, `I16`, `I32`,`I64`,`I128`, `U8`, `U16`, `U32`, `U64`, `U128` |
| `U8`      | `Address`, `Field`, `Group`, `Scalar`, `I8`, `I16`, `I32`,`I64`,`I128`, `U8`, `U16`, `U32`, `U64`, `U128` |
| `U16`     | `Address`, `Field`, `Group`, `Scalar`, `I8`, `I16`, `I32`,`I64`,`I128`, `U8`, `U16`, `U32`, `U64`, `U128` |
| `U32`     | `Address`, `Field`, `Group`, `Scalar`, `I8`, `I16`, `I32`,`I64`,`I128`, `U8`, `U16`, `U32`, `U64`, `U128` |
| `U64`     | `Address`, `Field`, `Group`, `Scalar`, `I8`, `I16`, `I32`,`I64`,`I128`, `U8`, `U16`, `U32`, `U64`, `U128` |
| `U128`    | `Address`, `Field`, `Group`, `Scalar`, `I8`, `I16`, `I32`,`I64`,`I128`, `U8`, `U16`, `U32`, `U64`, `U128` |
| `Scalar`  | `Address`, `Field`, `Group`, `Scalar`, `I8`, `I16`, `I32`,`I64`,`I128`, `U8`, `U16`, `U32`, `U64`, `U128` |
| `Struct`  | `Address`, `Field`, `Group`, `Scalar`, `I8`, `I16`, `I32`,`I64`,`I128`, `U8`, `U16`, `U32`, `U64`, `U128` |

***

### `hash.psd8`

[トップに戻る](#table-of-standard-opcodes)

#### 説明

入力レート 8 の Poseidon ハッシュを `first` から計算し、`destination` に格納します。生成されるハッシュは命令末尾の `as` で指定したとおり、算術型（`U8`、`U16`、`U32`、`U64`、`U128`、`I8`、`I16`、`I32`、`I64`、`I128`、`Field`、`Group`、`Scalar`）または `Address` になります。

#### サポートされる型

| First     | Destination                                                                                               |
|-----------|:----------------------------------------------------------------------------------------------------------|
| `Array`   | `Address`, `Field`, `Group`, `Scalar`, `I8`, `I16`, `I32`,`I64`,`I128`, `U8`, `U16`, `U32`, `U64`, `U128` |
| `Address` | `Address`, `Field`, `Group`, `Scalar`, `I8`, `I16`, `I32`,`I64`,`I128`, `U8`, `U16`, `U32`, `U64`, `U128` |
| `Boolean` | `Address`, `Field`, `Group`, `Scalar`, `I8`, `I16`, `I32`,`I64`,`I128`, `U8`, `U16`, `U32`, `U64`, `U128` |
| `Field`   | `Address`, `Field`, `Group`, `Scalar`, `I8`, `I16`, `I32`,`I64`,`I128`, `U8`, `U16`, `U32`, `U64`, `U128` |
| `Group`   | `Address`, `Field`, `Group`, `Scalar`, `I8`, `I16`, `I32`,`I64`,`I128`, `U8`, `U16`, `U32`, `U64`, `U128` |
| `I8`      | `Address`, `Field`, `Group`, `Scalar`, `I8`, `I16`, `I32`,`I64`,`I128`, `U8`, `U16`, `U32`, `U64`, `U128` |
| `I16`     | `Address`, `Field`, `Group`, `Scalar`, `I8`, `I16`, `I32`,`I64`,`I128`, `U8`, `U16`, `U32`, `U64`, `U128` |
| `I32`     | `Address`, `Field`, `Group`, `Scalar`, `I8`, `I16`, `I32`,`I64`,`I128`, `U8`, `U16`, `U32`, `U64`, `U128` |
| `I64`     | `Address`, `Field`, `Group`, `Scalar`, `I8`, `I16`, `I32`,`I64`,`I128`, `U8`, `U16`, `U32`, `U64`, `U128` |
| `I128`    | `Address`, `Field`, `Group`, `Scalar`, `I8`, `I16`, `I32`,`I64`,`I128`, `U8`, `U16`, `U32`, `U64`, `U128` |
| `U8`      | `Address`, `Field`, `Group`, `Scalar`, `I8`, `I16`, `I32`,`I64`,`I128`, `U8`, `U16`, `U32`, `U64`, `U128` |
| `U16`     | `Address`, `Field`, `Group`, `Scalar`, `I8`, `I16`, `I32`,`I64`,`I128`, `U8`, `U16`, `U32`, `U64`, `U128` |
| `U32`     | `Address`, `Field`, `Group`, `Scalar`, `I8`, `I16`, `I32`,`I64`,`I128`, `U8`, `U16`, `U32`, `U64`, `U128` |
| `U64`     | `Address`, `Field`, `Group`, `Scalar`, `I8`, `I16`, `I32`,`I64`,`I128`, `U8`, `U16`, `U32`, `U64`, `U128` |
| `U128`    | `Address`, `Field`, `Group`, `Scalar`, `I8`, `I16`, `I32`,`I64`,`I128`, `U8`, `U16`, `U32`, `U64`, `U128` |
| `Scalar`  | `Address`, `Field`, `Group`, `Scalar`, `I8`, `I16`, `I32`,`I64`,`I128`, `U8`, `U16`, `U32`, `U64`, `U128` |
| `Struct`  | `Address`, `Field`, `Group`, `Scalar`, `I8`, `I16`, `I32`,`I64`,`I128`, `U8`, `U16`, `U32`, `U64`, `U128` |

***

### `hash.sha3_256`

[トップに戻る](#table-of-standard-opcodes)

#### 説明

`first` から SHA3-256 ハッシュを計算し、256 ビットのダイジェストを `destination` に格納します。生成されるハッシュは命令末尾の `as` で指定したとおり、算術型（`U8`、`U16`、`U32`、`U64`、`U128`、`I8`、`I16`、`I32`、`I64`、`I128`、`Field`、`Group`、`Scalar`）または `Address` になります。

#### サポートされる型

| First     | Destination                                                                                               |
|-----------|:----------------------------------------------------------------------------------------------------------|
| `Array`   | `Address`, `Field`, `Group`, `Scalar`, `I8`, `I16`, `I32`,`I64`,`I128`, `U8`, `U16`, `U32`, `U64`, `U128` |
| `Address` | `Address`, `Field`, `Group`, `Scalar`, `I8`, `I16`, `I32`,`I64`,`I128`, `U8`, `U16`, `U32`, `U64`, `U128` |
| `Boolean` | `Address`, `Field`, `Group`, `Scalar`, `I8`, `I16`, `I32`,`I64`,`I128`, `U8`, `U16`, `U32`, `U64`, `U128` |
| `Field`   | `Address`, `Field`, `Group`, `Scalar`, `I8`, `I16`, `I32`,`I64`,`I128`, `U8`, `U16`, `U32`, `U64`, `U128` |
| `Group`   | `Address`, `Field`, `Group`, `Scalar`, `I8`, `I16`, `I32`,`I64`,`I128`, `U8`, `U16`, `U32`, `U64`, `U128` |
| `I8`      | `Address`, `Field`, `Group`, `Scalar`, `I8`, `I16`, `I32`,`I64`,`I128`, `U8`, `U16`, `U32`, `U64`, `U128` |
| `I16`     | `Address`, `Field`, `Group`, `Scalar`, `I8`, `I16`, `I32`,`I64`,`I128`, `U8`, `U16`, `U32`, `U64`, `U128` |
| `I32`     | `Address`, `Field`, `Group`, `Scalar`, `I8`, `I16`, `I32`,`I64`,`I128`, `U8`, `U16`, `U32`, `U64`, `U128` |
| `I64`     | `Address`, `Field`, `Group`, `Scalar`, `I8`, `I16`, `I32`,`I64`,`I128`, `U8`, `U16`, `U32`, `U64`, `U128` |
| `I128`    | `Address`, `Field`, `Group`, `Scalar`, `I8`, `I16`, `I32`,`I64`,`I128`, `U8`, `U16`, `U32`, `U64`, `U128` |
| `U8`      | `Address`, `Field`, `Group`, `Scalar`, `I8`, `I16`, `I32`,`I64`,`I128`, `U8`, `U16`, `U32`, `U64`, `U128` |
| `U16`     | `Address`, `Field`, `Group`, `Scalar`, `I8`, `I16`, `I32`,`I64`,`I128`, `U8`, `U16`, `U32`, `U64`, `U128` |
| `U32`     | `Address`, `Field`, `Group`, `Scalar`, `I8`, `I16`, `I32`,`I64`,`I128`, `U8`, `U16`, `U32`, `U64`, `U128` |
| `U64`     | `Address`, `Field`, `Group`, `Scalar`, `I8`, `I16`, `I32`,`I64`,`I128`, `U8`, `U16`, `U32`, `U64`, `U128` |
| `U128`    | `Address`, `Field`, `Group`, `Scalar`, `I8`, `I16`, `I32`,`I64`,`I128`, `U8`, `U16`, `U32`, `U64`, `U128` |
| `Scalar`  | `Address`, `Field`, `Group`, `Scalar`, `I8`, `I16`, `I32`,`I64`,`I128`, `U8`, `U16`, `U32`, `U64`, `U128` |
| `Struct`  | `Address`, `Field`, `Group`, `Scalar`, `I8`, `I16`, `I32`,`I64`,`I128`, `U8`, `U16`, `U32`, `U64`, `U128` |

***

### `hash.sha3_384`

[トップに戻る](#table-of-standard-opcodes)

#### 説明

`first` から SHA3-384 ハッシュを計算し、384 ビットのダイジェストを `destination` に格納します。生成されるハッシュは命令末尾の `as` で指定したとおり、算術型（`U8`、`U16`、`U32`、`U64`、`U128`、`I8`、`I16`、`I32`、`I64`、`I128`、`Field`、`Group`、`Scalar`）または `Address` になります。

#### サポートされる型
| First     | Destination                                                                                               |
|-----------|:----------------------------------------------------------------------------------------------------------|
| `Array`   | `Address`, `Field`, `Group`, `Scalar`, `I8`, `I16`, `I32`,`I64`,`I128`, `U8`, `U16`, `U32`, `U64`, `U128` |
| `Address` | `Address`, `Field`, `Group`, `Scalar`, `I8`, `I16`, `I32`,`I64`,`I128`, `U8`, `U16`, `U32`, `U64`, `U128` |
| `Boolean` | `Address`, `Field`, `Group`, `Scalar`, `I8`, `I16`, `I32`,`I64`,`I128`, `U8`, `U16`, `U32`, `U64`, `U128` |
| `Field`   | `Address`, `Field`, `Group`, `Scalar`, `I8`, `I16`, `I32`,`I64`,`I128`, `U8`, `U16`, `U32`, `U64`, `U128` |
| `Group`   | `Address`, `Field`, `Group`, `Scalar`, `I8`, `I16`, `I32`,`I64`,`I128`, `U8`, `U16`, `U32`, `U64`, `U128` |
| `I8`      | `Address`, `Field`, `Group`, `Scalar`, `I8`, `I16`, `I32`,`I64`,`I128`, `U8`, `U16`, `U32`, `U64`, `U128` |
| `I16`     | `Address`, `Field`, `Group`, `Scalar`, `I8`, `I16`, `I32`,`I64`,`I128`, `U8`, `U16`, `U32`, `U64`, `U128` |
| `I32`     | `Address`, `Field`, `Group`, `Scalar`, `I8`, `I16`, `I32`,`I64`,`I128`, `U8`, `U16`, `U32`, `U64`, `U128` |
| `I64`     | `Address`, `Field`, `Group`, `Scalar`, `I8`, `I16`, `I32`,`I64`,`I128`, `U8`, `U16`, `U32`, `U64`, `U128` |
| `I128`    | `Address`, `Field`, `Group`, `Scalar`, `I8`, `I16`, `I32`,`I64`,`I128`, `U8`, `U16`, `U32`, `U64`, `U128` |
| `U8`      | `Address`, `Field`, `Group`, `Scalar`, `I8`, `I16`, `I32`,`I64`,`I128`, `U8`, `U16`, `U32`, `U64`, `U128` |
| `U16`     | `Address`, `Field`, `Group`, `Scalar`, `I8`, `I16`, `I32`,`I64`,`I128`, `U8`, `U16`, `U32`, `U64`, `U128` |
| `U32`     | `Address`, `Field`, `Group`, `Scalar`, `I8`, `I16`, `I32`,`I64`,`I128`, `U8`, `U16`, `U32`, `U64`, `U128` |
| `U64`     | `Address`, `Field`, `Group`, `Scalar`, `I8`, `I16`, `I32`,`I64`,`I128`, `U8`, `U16`, `U32`, `U64`, `U128` |
| `U128`    | `Address`, `Field`, `Group`, `Scalar`, `I8`, `I16`, `I32`,`I64`,`I128`, `U8`, `U16`, `U32`, `U64`, `U128` |
| `Scalar`  | `Address`, `Field`, `Group`, `Scalar`, `I8`, `I16`, `I32`,`I64`,`I128`, `U8`, `U16`, `U32`, `U64`, `U128` |
| `Struct`  | `Address`, `Field`, `Group`, `Scalar`, `I8`, `I16`, `I32`,`I64`,`I128`, `U8`, `U16`, `U32`, `U64`, `U128` |

***

### `hash.sha3_512`

[トップに戻る](#table-of-standard-opcodes)

#### 説明

`first` から SHA3-512 ハッシュを計算し、512 ビットのダイジェストを `destination` に格納します。生成されるハッシュは命令末尾の `as` で指定したとおり、算術型（`U8`、`U16`、`U32`、`U64`、`U128`、`I8`、`I16`、`I32`、`I64`、`I128`、`Field`、`Group`、`Scalar`）または `Address` になります。

#### サポートされる型

| First     | Destination                                                                                               |
|-----------|:----------------------------------------------------------------------------------------------------------|
| `Array`   | `Address`, `Field`, `Group`, `Scalar`, `I8`, `I16`, `I32`,`I64`,`I128`, `U8`, `U16`, `U32`, `U64`, `U128` |
| `Address` | `Address`, `Field`, `Group`, `Scalar`, `I8`, `I16`, `I32`,`I64`,`I128`, `U8`, `U16`, `U32`, `U64`, `U128` |
| `Boolean` | `Address`, `Field`, `Group`, `Scalar`, `I8`, `I16`, `I32`,`I64`,`I128`, `U8`, `U16`, `U32`, `U64`, `U128` |
| `Field`   | `Address`, `Field`, `Group`, `Scalar`, `I8`, `I16`, `I32`,`I64`,`I128`, `U8`, `U16`, `U32`, `U64`, `U128` |
| `Group`   | `Address`, `Field`, `Group`, `Scalar`, `I8`, `I16`, `I32`,`I64`,`I128`, `U8`, `U16`, `U32`, `U64`, `U128` |
| `I8`      | `Address`, `Field`, `Group`, `Scalar`, `I8`, `I16`, `I32`,`I64`,`I128`, `U8`, `U16`, `U32`, `U64`, `U128` |
| `I16`     | `Address`, `Field`, `Group`, `Scalar`, `I8`, `I16`, `I32`,`I64`,`I128`, `U8`, `U16`, `U32`, `U64`, `U128` |
| `I32`     | `Address`, `Field`, `Group`, `Scalar`, `I8`, `I16`, `I32`,`I64`,`I128`, `U8`, `U16`, `U32`, `U64`, `U128` |
| `I64`     | `Address`, `Field`, `Group`, `Scalar`, `I8`, `I16`, `I32`,`I64`,`I128`, `U8`, `U16`, `U32`, `U64`, `U128` |
| `I128`    | `Address`, `Field`, `Group`, `Scalar`, `I8`, `I16`, `I32`,`I64`,`I128`, `U8`, `U16`, `U32`, `U64`, `U128` |
| `U8`      | `Address`, `Field`, `Group`, `Scalar`, `I8`, `I16`, `I32`,`I64`,`I128`, `U8`, `U16`, `U32`, `U64`, `U128` |
| `U16`     | `Address`, `Field`, `Group`, `Scalar`, `I8`, `I16`, `I32`,`I64`,`I128`, `U8`, `U16`, `U32`, `U64`, `U128` |
| `U32`     | `Address`, `Field`, `Group`, `Scalar`, `I8`, `I16`, `I32`,`I64`,`I128`, `U8`, `U16`, `U32`, `U64`, `U128` |
| `U64`     | `Address`, `Field`, `Group`, `Scalar`, `I8`, `I16`, `I32`,`I64`,`I128`, `U8`, `U16`, `U32`, `U64`, `U128` |
| `U128`    | `Address`, `Field`, `Group`, `Scalar`, `I8`, `I16`, `I32`,`I64`,`I128`, `U8`, `U16`, `U32`, `U64`, `U128` |
| `Scalar`  | `Address`, `Field`, `Group`, `Scalar`, `I8`, `I16`, `I32`,`I64`,`I128`, `U8`, `U16`, `U32`, `U64`, `U128` |
| `Struct`  | `Address`, `Field`, `Group`, `Scalar`, `I8`, `I16`, `I32`,`I64`,`I128`, `U8`, `U16`, `U32`, `U64`, `U128` |

***

### `inv`

[トップに戻る](#table-of-standard-opcodes)

#### 説明

入力値の乗法逆元を計算し、結果を `destination` に格納します。

#### サポートされる型

| Input   | Destination |
|---------|-------------|
| `Field` | `Field`     |

***

### `is.eq`

[トップに戻る](#table-of-standard-opcodes)

#### 説明

`first` と `second` を比較し、結果を `destination` に格納します。

#### サポートされる型

| First       | Second      | Destination |
|-------------|-------------|-------------|
| `Address`   | `Address`   | `Boolean`   |
| `Boolean`   | `Boolean`   | `Boolean`   |
| `Field`     | `Field`     | `Boolean`   |
| `Group`     | `Group`     | `Boolean`   |
| `I8`        | `I8`        | `Boolean`   |
| `I16`       | `I16`       | `Boolean`   |
| `I32`       | `I32`       | `Boolean`   |
| `I64`       | `I64`       | `Boolean`   |
| `I128`      | `I128`      | `Boolean`   |
| `U8`        | `U8`        | `Boolean`   |
| `U16`       | `U16`       | `Boolean`   |
| `U32`       | `U32`       | `Boolean`   |
| `U64`       | `U64`       | `Boolean`   |
| `U128`      | `U128`      | `Boolean`   |
| `Scalar`    | `Scalar`    | `Boolean`   |
| `Signature` | `Signature` | `Boolean`   |
| `Struct`    | `Struct`    | `Boolean`   |
| `Record`    | `Record`    | `Boolean`   |

***

### `is.neq`

[トップに戻る](#table-of-standard-opcodes)

#### 説明

`first` と `second` が等しくない場合は `true` を返し、結果を `destination` に格納します。

#### サポートされる型

| First       | Second      | Destination |
|-------------|-------------|-------------|
| `Address`   | `Address`   | `Boolean`   |
| `Boolean`   | `Boolean`   | `Boolean`   |
| `Field`     | `Field`     | `Boolean`   |
| `Group`     | `Group`     | `Boolean`   |
| `I8`        | `I8`        | `Boolean`   |
| `I16`       | `I16`       | `Boolean`   |
| `I32`       | `I32`       | `Boolean`   |
| `I64`       | `I64`       | `Boolean`   |
| `I128`      | `I128`      | `Boolean`   |
| `U8`        | `U8`        | `Boolean`   |
| `U16`       | `U16`       | `Boolean`   |
| `U32`       | `U32`       | `Boolean`   |
| `U64`       | `U64`       | `Boolean`   |
| `U128`      | `U128`      | `Boolean`   |
| `Scalar`    | `Scalar`    | `Boolean`   |
| `Signature` | `Signature` | `Boolean`   |
| `Struct`    | `Struct`    | `Boolean`   |
| `Record`    | `Record`    | `Boolean`   |

***

### `lt`

[トップに戻る](#table-of-standard-opcodes)

#### 説明

`first` が `second` より小さいかを判定し、結果を `destination` に格納します。

#### サポートされる型

| First    | Second   | Destination |
|----------|----------|-------------|
| `Field`  | `Field`  | `Boolean`   |
| `I8`     | `I8`     | `Boolean`   |
| `I16`    | `I16`    | `Boolean`   |
| `I32`    | `I32`    | `Boolean`   |
| `I64`    | `I64`    | `Boolean`   |
| `I128`   | `I128`   | `Boolean`   |
| `U8`     | `U8`     | `Boolean`   |
| `U16`    | `U16`    | `Boolean`   |
| `U32`    | `U32`    | `Boolean`   |
| `U64`    | `U64`    | `Boolean`   |
| `U128`   | `U128`   | `Boolean`   |
| `Scalar` | `Scalar` | `Boolean`   |

***

### `lte`

[トップに戻る](#table-of-standard-opcodes)

#### 説明

`first` が `second` 以下かを判定し、結果を `destination` に格納します。

#### サポートされる型

| First    | Second   | Destination |
|----------|----------|-------------|
| `Field`  | `Field`  | `Boolean`   |
| `I8`     | `I8`     | `Boolean`   |
| `I16`    | `I16`    | `Boolean`   |
| `I32`    | `I32`    | `Boolean`   |
| `I64`    | `I64`    | `Boolean`   |
| `I128`   | `I128`   | `Boolean`   |
| `U8`     | `U8`     | `Boolean`   |
| `U16`    | `U16`    | `Boolean`   |
| `U32`    | `U32`    | `Boolean`   |
| `U64`    | `U64`    | `Boolean`   |
| `U128`   | `U128`   | `Boolean`   |
| `Scalar` | `Scalar` | `Boolean`   |

***

### `mod`

[トップに戻る](#table-of-standard-opcodes)

#### 説明

`first` を `second` で割った剰余を `destination` に格納します。`second` がゼロの場合は停止します。

この演算の意味論は数学的な剰余演算の定義と同じです。

#### サポートされる型

| First  | Second | Destination |
|--------|--------|-------------|
| `U8`   | `U8`   | `U8`        |
| `U16`  | `U16`  | `U16`       |
| `U32`  | `U32`  | `U32`       |
| `U64`  | `U64`  | `U64`       |
| `U128` | `U128` | `U128`      |

***

### `mul`

[トップに戻る](#table-of-standard-opcodes)

#### 説明

`first` と `second` を乗算し、結果を `destination` に格納します。

整数型ではオーバーフローとアンダーフローを検出する制約が追加されます。ラップアラウンドの挙動が必要な場合は [mul.w](#mul.w) を利用してください。

#### サポートされる型

| First    | Second   | Destination |
|----------|----------|-------------|
| `Field`  | `Field`  | `Field`     |
| `Group`  | `Scalar` | `Group`     |
| `Scalar` | `Group`  | `Group`     |
| `I8`     | `I8`     | `I8`        |
| `I16`    | `I16`    | `I16`       |
| `I32`    | `I32`    | `I32`       |
| `I64`    | `I64`    | `I64`       |
| `I128`   | `I128`   | `I128`      |
| `U8`     | `U8`     | `U8`        |
| `U16`    | `U16`    | `U16`       |
| `U32`    | `U32`    | `U32`       |
| `U64`    | `U64`    | `U64`       |
| `U128`   | `U128`   | `U128`      |

***

### `mul.w` {#mul.w}

[トップに戻る](#table-of-standard-opcodes)

#### 説明

`first` と `second` を乗算し、型の境界でラップアラウンドした結果を `destination` に格納します。

#### サポートされる型

| First  | Second | Destination |
|--------|--------|-------------|
| `I8`   | `I8`   | `I8`        |
| `I16`  | `I16`  | `I16`       |
| `I32`  | `I32`  | `I32`       |
| `I64`  | `I64`  | `I64`       |
| `I128` | `I128` | `I128`      |
| `U8`   | `U8`   | `U8`        |
| `U16`  | `U16`  | `U16`       |
| `U32`  | `U32`  | `U32`       |
| `U64`  | `U64`  | `U64`       |
| `U128` | `U128` | `U128`      |

***

### `nand`

[トップに戻る](#table-of-standard-opcodes)

#### 説明

`first` と `second` が両方とも `true` の場合にのみ `false` を返し、結果を `destination` に格納します。

#### サポートされる型

| First     | Second    | Destination |
|-----------|-----------|-------------|
| `Boolean` | `Boolean` | `Boolean`   |

***

### `neg`

[トップに戻る](#table-of-standard-opcodes)

#### 説明

`first` の符号を反転し、結果を `destination` に格納します。

符号付き整数型では、最小値に対して `neg` を呼び出すことは無効です。例えば `-128i8` を入力すると、`i8` 型で `128` を表現できないため無効になります。

#### サポートされる型

| Input   | Destination |
|---------|-------------|
| `Field` | `Field`     |
| `Group` | `Group`     |
| `I8`    | `I8`        |
| `I16`   | `I16`       |
| `I32`   | `I32`       |
| `I64`   | `I64`       |
| `I128`  | `I128`      |

***

### `nor`

[トップに戻る](#table-of-standard-opcodes)

#### 説明

`first` と `second` のいずれも `true` でないときに `true` を返し、結果を `destination` に格納します。

#### サポートされる型

| First     | Second    | Destination |
|-----------|-----------|-------------|
| `Boolean` | `Boolean` | `Boolean`   |

***

### `not`

[トップに戻る](#table-of-standard-opcodes)

#### 説明

整数（ビット演算）または `boolean` の入力に NOT 演算を適用し、結果を `destination` に格納します。

#### サポートされる型

| Input     | Destination |
|-----------|-------------|
| `Boolean` | `Boolean`   |
| `I8`      | `I8`        |
| `I16`     | `I16`       |
| `I32`     | `I32`       |
| `I64`     | `I64`       |
| `I128`    | `I128`      |
| `U8`      | `U8`        |
| `U16`     | `U16`       |
| `U32`     | `U32`       |
| `U64`     | `U64`       |
| `U128`    | `U128`      |

***

### or

[トップに戻る](#table-of-standard-opcodes)

#### 説明

整数（ビット演算）または `boolean` の `first` と `second` に OR 演算を適用し、結果を `destination` に格納します。

#### サポートされる型

| First     | Second    | Destination |
|-----------|-----------|-------------|
| `Boolean` | `Boolean` | `Boolean`   |
| `I8`      | `I8`      | `I8`        |
| `I16`     | `I16`     | `I16`       |
| `I32`     | `I32`     | `I32`       |
| `I64`     | `I64`     | `I64`       |
| `I128`    | `I128`    | `I128`      |
| `U8`      | `U8`      | `U8`        |
| `U16`     | `U16`     | `U16`       |
| `U32`     | `U32`     | `U32`       |
| `U64`     | `U64`     | `U64`       |
| `U128`    | `U128`    | `U128`      |

***

### position

[トップに戻る](#table-of-standard-opcodes)

#### 説明

`position <name>` のような position 宣言は、分岐先となるプログラム内の位置 `name` を示します。  
分岐名は小文字の英数字のみで構成されている必要があります。  

***

### `pow`

[トップに戻る](#table-of-standard-opcodes)

#### 説明

`first` を `second` 乗し、結果を `destination` に格納します。

整数型ではオーバーフローとアンダーフローを検出する制約が追加されます。ラップアラウンドの挙動が必要な場合は [pow.w](#pow.w) を利用してください。

#### サポートされる型

`Magnitude` には `U8`、`U16`、`U32` のいずれかを指定できます。

| First   | Second      | Destination |
|---------|-------------|-------------|
| `Field` | `Field`     | `Field`     |
| `I8`    | `Magnitude` | `I8`        |
| `I16`   | `Magnitude` | `I16`       |
| `I32`   | `Magnitude` | `I32`       |
| `I64`   | `Magnitude` | `I64`       |
| `I128`  | `Magnitude` | `I128`      |
| `U8`    | `Magnitude` | `U8`        |
| `U16`   | `Magnitude` | `U16`       |
| `U32`   | `Magnitude` | `U32`       |
| `U64`   | `Magnitude` | `U64`       |
| `U128`  | `Magnitude` | `U128`      |

***

### `pow.w` {#pow.w}

[トップに戻る](#table-of-standard-opcodes)

#### 説明

`first` を `second` 乗し、型の境界でラップアラウンドした結果を `destination` に格納します。

#### サポートされる型

`Magnitude` には `U8`、`U16`、`U32` のいずれかを指定できます。

| First  | Second      | Destination |
|--------|-------------|-------------|
| `I8`   | `Magnitude` | `I8`        |
| `I16`  | `Magnitude` | `I16`       |
| `I32`  | `Magnitude` | `I32`       |
| `I64`  | `Magnitude` | `I64`       |
| `I128` | `Magnitude` | `I128`      |
| `U8`   | `Magnitude` | `U8`        |
| `U16`  | `Magnitude` | `U16`       |
| `U32`  | `Magnitude` | `U32`       |
| `U64`  | `Magnitude` | `U64`       |
| `U128` | `Magnitude` | `U128`      |

***

### `rand.chacha`

#### 説明

`rand.chacha` opcode は `finalize` スコープ内で乱数を生成するために使用します。幅広い型で乱数を生成できます。

#### 利用例

```aleo
rand.chacha into r0 as field;
rand.chacha r0 into r1 as field;
rand.chacha r0 r1 into r2 as field;
rand.chacha 1u8 2i16 into r27 as u32;
```

#### サポートされる型

`Single` には `Address`、`Boolean`、`Field`、`Group`、`I8`、`I16`、`I32`、`I64`、`I128`、`U8`、`U16`、`U32`、`U64`、`U128`、`Scalar` のいずれかを指定できます。構造体やマッピングなどの複合データ型は使用できません。

| First       | Second      | Destination |
|-------------|-------------|-------------|
| `Single` | `Single` | `Single` |

***

### `rem`

[トップに戻る](#table-of-standard-opcodes)

#### 説明

`first` を `second` で割った切り捨て余りを `destination` に格納します。`second` がゼロの場合は停止します。


関連する除算命令 [div](#div) がアンダーフローするときに備えて、アンダーフローを検出する制約が追加されます。

整数型でラップアラウンドの挙動が必要な場合は [rem.w](#rem.w) を利用してください。

#### サポートされる型

| First  | Second | Destination |
|--------|--------|-------------|
| `I8`   | `I8`   | `I8`        |
| `I16`  | `I16`  | `I16`       |
| `I32`  | `I32`  | `I32`       |
| `I64`  | `I64`  | `I64`       |
| `I128` | `I128` | `I128`      |
| `U8`   | `U8`   | `U8`        |
| `U16`  | `U16`  | `U16`       |
| `U32`  | `U32`  | `U32`       |
| `U64`  | `U64`  | `U64`       |
| `U128` | `U128` | `U128`      |

***

### `rem.w` {#rem.w}

[トップに戻る](#table-of-standard-opcodes)

#### 説明
`first` を `second` で割った切り捨て余りを求め、型の境界でラップアラウンドした結果を `destination` に格納します。

#### サポートされる型

| First  | Second | Destination |
|--------|--------|-------------|
| `I8`   | `I8`   | `I8`        |
| `I16`  | `I16`  | `I16`       |
| `I32`  | `I32`  | `I32`       |
| `I64`  | `I64`  | `I64`       |
| `I128` | `I128` | `I128`      |
| `U8`   | `U8`   | `U8`        |
| `U16`  | `U16`  | `U16`       |
| `U32`  | `U32`  | `U32`       |
| `U64`  | `U64`  | `U64`       |
| `U128` | `U128` | `U128`      |

***

### `sign.verify`

[トップに戻る](#table-of-standard-opcodes)

#### 説明

`first` の署名を公開鍵アドレス `second` とメッセージ `third` に対して検証し、結果を `destination` に格納します。

#### 利用例

```aleo
sign.verify r0 r1 r2 into r3;
```

#### サポートされる型

| First       | Second    | Third     | Destination |
|-------------|-----------|-----------|-------------|
| `Signature` | `Address` | Array of `Field` | `Boolean`   |

***

### `shl`

[トップに戻る](#table-of-standard-opcodes)

#### 説明

`first` を `second` ビット左シフトし、結果を `destination` に格納します。

#### サポートされる型

`Magnitude` には `U8`、`U16`、`U32` のいずれかを指定できます。

| First  | Second      | Destination |
|--------|-------------|-------------|
| `I8`   | `Magnitude` | `I8`        |
| `I16`  | `Magnitude` | `I16`       |
| `I32`  | `Magnitude` | `I32`       |
| `I64`  | `Magnitude` | `I64`       |
| `I128` | `Magnitude` | `I128`      |
| `U8`   | `Magnitude` | `U8`        |
| `U16`  | `Magnitude` | `U16`       |
| `U32`  | `Magnitude` | `U32`       |
| `U64`  | `Magnitude` | `U64`       |
| `U128` | `Magnitude` | `U128`      |

***

### `shl.w`

[トップに戻る](#table-of-standard-opcodes)

#### 説明

`first` を `second` ビット左シフトし、型の境界でラップアラウンドした結果を `destination` に格納します。

#### サポートされる型

`Magnitude` には `U8`、`U16`、`U32` のいずれかを指定できます。

| First  | Second      | Destination |
|--------|-------------|-------------|
| `I8`   | `Magnitude` | `I8`        |
| `I16`  | `Magnitude` | `I16`       |
| `I32`  | `Magnitude` | `I32`       |
| `I64`  | `Magnitude` | `I64`       |
| `I128` | `Magnitude` | `I128`      |
| `U8`   | `Magnitude` | `U8`        |
| `U16`  | `Magnitude` | `U16`       |
| `U32`  | `Magnitude` | `U32`       |
| `U64`  | `Magnitude` | `U64`       |
| `U128` | `Magnitude` | `U128`      |

***

### `shr`

[トップに戻る](#table-of-standard-opcodes)

#### 説明

`first` を `second` ビット右シフトし、結果を `destination` に格納します。

#### サポートされる型

`Magnitude` には `U8`、`U16`、`U32` のいずれかを指定できます。

| First  | Second      | Destination |
|--------|-------------|-------------|
| `I8`   | `Magnitude` | `I8`        |
| `I16`  | `Magnitude` | `I16`       |
| `I32`  | `Magnitude` | `I32`       |
| `I64`  | `Magnitude` | `I64`       |
| `I128` | `Magnitude` | `I128`      |
| `U8`   | `Magnitude` | `U8`        |
| `U16`  | `Magnitude` | `U16`       |
| `U32`  | `Magnitude` | `U32`       |
| `U64`  | `Magnitude` | `U64`       |
| `U128` | `Magnitude` | `U128`      |

***

### `shr.w`

[トップに戻る](#table-of-standard-opcodes)

#### 説明

`first` を `second` ビット右シフトし、型の境界でラップアラウンドした結果を `destination` に格納します。

#### サポートされる型

`Magnitude` には `U8`、`U16`、`U32` のいずれかを指定できます。

| First  | Second      | Destination |
|--------|-------------|-------------|
| `I8`   | `Magnitude` | `I8`        |
| `I16`  | `Magnitude` | `I16`       |
| `I32`  | `Magnitude` | `I32`       |
| `I64`  | `Magnitude` | `I64`       |
| `I128` | `Magnitude` | `I128`      |
| `U8`   | `Magnitude` | `U8`        |
| `U16`  | `Magnitude` | `U16`       |
| `U32`  | `Magnitude` | `U32`       |
| `U64`  | `Magnitude` | `U64`       |
| `U128` | `Magnitude` | `U128`      |

***

### `square`

[トップに戻る](#table-of-standard-opcodes)

#### 説明

入力値を自乗し、結果を `destination` に格納します。

#### サポートされる型

| Input   | Destination |
|---------|-------------|
| `Field` | `Field`     |

***

### `sqrt`

[トップに戻る](#table-of-standard-opcodes)

#### 説明

入力値の平方根を計算し、結果を `destination` に格納します。

#### サポートされる型

| Input   | Destination |
|---------|-------------|
| `Field` | `Field`     |

***


### `sub`

[トップに戻る](#table-of-standard-opcodes)

#### 説明

`first` から `second` を減算し、結果を `destination` に格納します。

#### サポートされる型

| First   | Second  | Destination |
|---------|---------|-------------|
| `Field` | `Field` | `Field`     |
| `Group` | `Group` | `Group`     |
| `I8`    | `I8`    | `I8`        |
| `I16`   | `I16`   | `I16`       |
| `I32`   | `I32`   | `I32`       |
| `I64`   | `I64`   | `I64`       |
| `I128`  | `I128`  | `I128`      |
| `U8`    | `U8`    | `U8`        |
| `U16`   | `U16`   | `U16`       |
| `U32`   | `U32`   | `U32`       |
| `U64`   | `U64`   | `U64`       |
| `U128`  | `U128`  | `U128`      |

***

### `sub.w`

[トップに戻る](#table-of-standard-opcodes)

#### 説明

`first` から `second` を減算し、型の境界でラップアラウンドした結果を `destination` に格納します。

#### サポートされる型

| First  | Second | Destination |
|--------|--------|-------------|
| `I8`   | `I8`   | `I8`        |
| `I16`  | `I16`  | `I16`       |
| `I32`  | `I32`  | `I32`       |
| `I64`  | `I64`  | `I64`       |
| `I128` | `I128` | `I128`      |
| `U8`   | `U8`   | `U8`        |
| `U16`  | `U16`  | `U16`       |
| `U32`  | `U32`  | `U32`       |
| `U64`  | `U64`  | `U64`       |
| `U128` | `U128` | `U128`      |

***

### `ternary`

[トップに戻る](#table-of-standard-opcodes)

#### 説明

`condition` が `true` のときは `first` を、そうでなければ `second` を選択し、結果を `destination` に格納します。

例: `ternary r0 r1 r2 into r3` では、`r0` が条件、`r1` が first、`r2` が second、`r3` が結果の格納先です。

#### サポートされる型

| Condition | First       | Second      | Destination |
|-----------|-------------|-------------|-------------|
| `Boolean` | `Boolean`   | `Boolean`   | `Boolean`   |
| `Boolean` | `Field`     | `Field`     | `Field`     |
| `Boolean` | `Group`     | `Group`     | `Group`     |
| `Boolean` | `I8`        | `I8`        | `I8`        |
| `Boolean` | `I16`       | `I16`       | `I16`       |
| `Boolean` | `I32`       | `I32`       | `I32`       |
| `Boolean` | `I64`       | `I64`       | `I64`       |
| `Boolean` | `I128`      | `I128`      | `I128`      |
| `Boolean` | `U8`        | `U8`        | `U8`        |
| `Boolean` | `U16`       | `U16`       | `U16`       |
| `Boolean` | `U32`       | `U32`       | `U32`       |
| `Boolean` | `U64`       | `U64`       | `U64`       |
| `Boolean` | `U128`      | `U128`      | `U128`      |
| `Boolean` | `Scalar`    | `Scalar`    | `Scalar`    |
| `Boolean` | `Signature` | `Signature` | `Signature` |

***

### `xor`

[トップに戻る](#table-of-standard-opcodes)

#### 説明

整数（ビット演算）または `boolean` の `first` と `second` に XOR 演算を適用し、結果を `destination` に格納します。

#### サポートされる型

| First     | Second    | Destination |
|-----------|-----------|-------------|
| `Boolean` | `Boolean` | `Boolean`   |
| `I8`      | `I8`      | `I8`        |
| `I16`     | `I16`     | `I16`       |
| `I32`     | `I32`     | `I32`       |
| `I64`     | `I64`     | `I64`       |
| `I128`    | `I128`    | `I128`      |
| `U8`      | `U8`      | `U8`        |
| `U16`     | `U16`     | `U16`       |
| `U32`     | `U32`     | `U32`       |
| `U64`     | `U64`     | `U64`       |
| `U128`    | `U128`    | `U128`      |

***
