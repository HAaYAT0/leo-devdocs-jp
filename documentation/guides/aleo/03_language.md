---
id: language
title: Aleo instructions 言語ガイド
sidebar_label: 言語
---

### 静的型付け

Aleo instructions は**静的型付け言語**であり、回路を実行する前に各変数の型を把握しておく必要があります。

### 明示的な型指定が必要

Aleo instructions には `undefined` や `null` といった値は存在しません。新しい変数を代入する際は、**その値の型を明示的に指定する必要があります**。

### 値渡し

Aleo instructions の式は常に**値渡し**であり、関数の引数や代入の右辺で使用される際には値がコピーされます。

### レジスタベース

Aleo instructions には変数名はなく、すべての値は `r0`, `r1`, `r2`, … といった 0 から始まる非負整数で表されるレジスタに格納されます。

## データ型と値

### ブール値

ブール値として `true` と `false` をサポートします。ステートメントでは明示的に `boolean` 型を指定します。

```aleo
function main:
    input r0: boolean.private;
```

### 整数

Aleo instructions は符号付き整数 `i8`, `i16`, `i32`, `i64`, `i128` と符号なし整数 `u8`, `u16`, `u32`, `u64`, `u128` をサポートします。

```aleo
function main:
    input r0: u8.public;
```

:::info
ビット幅の大きい整数は回路に多くの制約を生み、計算時間が長くなる可能性があります。
:::

### フィールド要素

Aleo instructions は楕円曲線の基底体の要素である `field` 型をサポートします。
これは基底体の法未満の符号なし整数であり、最大値は
`8444461749428370424248824938781546531375899335154063827935233455917409239040field` です。

```aleo
function main:
    input r0: field.private;
```

### グループ要素

Aleo instructions コンパイラに渡される楕円曲線上のアフィン点集合は群を形成します。
曲線は `a = -1`, `d = 3021` の Twisted Edwards 曲線です。
Aleo instructions では、生成元によって生成される部分群をプリミティブデータ型として扱えます。
グループ要素は点の x 座標で表記します。例えば `2group` は点 `(2, 5553594316923449299484601589326170487897520766531075014687114064346375156608)` を意味します。
生成元は `1540945439182663264862696551825005342995406165131907382295858612069623286213group` です。

```aleo
function main:
    input r0: group.private;
```

### スカラー要素

Aleo instructions は楕円曲線部分群のスカラー体要素である `scalar` 型をサポートします。
これはスカラー体の法未満の符号なし整数であり、最大値は
`2111115437357092606062206234695386632838870926408408195193685246394721360382scalar` です。

```aleo
function main:
    input r0: scalar.private;
```

### アドレス

アドレスは、アドレスの解析や操作をコンパイラが最適化できるよう設計されています。

```aleo
function main:
    input r0: address.private;
```

### シグネチャ

Aleo は Schnorr 署名方式を用いて Aleo 秘密鍵でメッセージに署名します。
署名は Aleo instructions の [`sign.verify`](./04_opcodes.md#signverify) 命令で検証できます。

```aleo
sign.verify sign069ju4e8s66unu25celqycvsv3k9chdyz4n4sy62tx6wxj0u25vqp58hgu9hwyqc63qzxvjwesf2wz0krcvvw9kd9x0rsk4lwqn2acqhp9v0pdkhx6gvkanuuwratqmxa3du7l43c05253hhed9eg6ppzzfnjt06fpzp6msekdjxd36smjltndmxjndvv9x2uecsgngcwsc2qkns4afd r1 r2 into r3;
```

## Aleo プログラムの構成

Aleo プログラムには [Program ID](#programid)、[Import](#import)、[Function](#function)、[Closure](#closure)、[Struct](#struct)、[Record](#record)、
[Mapping](#mapping)、[Finalize](#finalize) の宣言が含まれます。Import のみファイル先頭に配置する必要があります。
宣言は同一ファイル内でローカルにアクセスできます。他ファイルの宣言が必要な場合は import してください。

### Program ID {#programid}

プログラム ID は `{name}.{network}` の形式で宣言します。
`name` の先頭文字は小文字でなければならず、小文字・数字・アンダースコアが使用できます。
現在サポートされている `network` ドメインは `aleo` のみです。

```aleo showLineNumbers
program hello.aleo; // valid

program Foo.aleo;   // invalid
program baR.aleo;   // invalid
program 0foo.aleo;  // invalid
program 0_foo.aleo; // invalid
program _foo.aleo;  // invalid
```

### Import

Import は `import {ProgramID};` の形式で宣言します。  
指定したプログラム ID の宣言を読み込み、現在のファイルスコープに取り込みます。
依存関係が `imports` ディレクトリにダウンロードされている場合はそこからインポートできます。

```aleo showLineNumbers
import foo.aleo; // Import the `foo.aleo` program into the `hello.aleo` program.

program hello.aleo;
```

### Function

Function は `function {name}:` の形式で宣言します。  
関数には値を計算する命令を記述できます。
関数を呼び出すにはプログラムのスコープ内に存在している必要があります。

```aleo showLineNumbers
function foo:
    input r0 as field.public;
    input r1 as field.private;
    add r0 r1 into r2;
    output r2 as field.private;
```

#### Function Inputs

Function の入力は `input {register} as {type}.{visibility};` で宣言します。  
入力は関数宣言の直後に記述する必要があります。

```aleo showLineNumbers
// The function `foo` takes a single input `r0` with type `field` and visibility `public`.
function foo:
    input r0 as field.public;
```

#### Function Outputs

Function の出力は `output {register} as {type}.{visibility};` で宣言します。  
出力は関数定義の最後に記述する必要があります。

```aleo showLineNumbers
...
    output r0 as field.public;
```

#### Call a Function

Aleo プロトコルでは、関数を呼び出すとレコードを消費・生成するトランジションがオンチェーンで作成されます。
`aleo run` CLI コマンドを利用して関数へ入力を渡し、プログラムを実行できます。  
Testnet ではプログラム関数が内部の別関数を呼び出すことはできません。
もしプログラム内でのみ呼び出されるヘルパー関数を作成したい場合は `closure` を使用してください。

#### Call an Imported Function

Aleo プログラムは `call {program}/{function} {register} into {register}` 命令を使って外部の Aleo プログラムを呼び出せます。

```aleo
import foo.aleo;

program bar.aleo;

function call_external:
    input r0 as u64.private;
    call foo.aleo/baz r0 into r1; // Externally call function `baz` in foo.aleo with argument `r0` and store the result in `r1`.
    output r1 as u64.private;
```

### Closure

Closure は `closure {name}:` で宣言します。  
値を計算する命令を含められますが、直接実行することはできません。他の関数から呼び出すヘルパー関数として利用します。

```aleo showLineNumbers
closure foo:
    input r0 as field;
    input r1 as field;
    add r0 r1 into r2;
    output r2 as field;
```

#### Call a Closure

Aleo プログラムは `call {name} {register} into {register}` 命令を用いて内部の closure を呼び出せます。

```aleo
program bar.aleo;

function call_internal:
    input r0 as u64.private;
    call foo r0 into r1; // Internally call closure `foo` with argument `r0` and store the result in `r1`.
    output r1 as u64.private;
```

### Struct

Struct は `struct {name}:` で宣言するデータ型で、`{name} as {type}` の形式でフィールドを指定します。

```aleo showLineNumbers
struct array3:
    a0 as u32;
    a1 as u32;
    a2 as u32;
```

Struct をインスタンス化するには `cast` 命令を使用します。

```aleo showLineNumbers
function new_array3:
    input r0 as u32.private;
    input r1 as u32.private;
    input r2 as u32.private;
    cast r0 r1 r2 into r3 as array3;
    output r3 as array3.private;
```

### Array

配列リテラルは `[{value}, {value}, ..]` の形式で、すべて同じ型の値を列挙します。例えば

```aleo
[true, false, true]
```

配列の型は要素の型と長さを含み `[{type}; {length}]` と表記します。この例では次のようになります。

```aleo
[boolean; 3u32]
```

配列は `cast` opcode を使って初期化できます。

```aleo showLineNumbers
function new_array:
    input r0 as boolean.private;
    input r1 as boolean.private;
    input r2 as boolean.private;
    cast r0 r1 r2 into r3 as [boolean; 3u32];
    output r3 as [boolean; 3u32].private;
```

配列は `{name}[{index}]` でインデックス指定できます。

```aleo showLineNumbers
function get_array_element:
    input r0 as [boolean; 4u32].public;
    input r1 as u32.public;
    r0[r1] into r2;
    output r2 as boolean.public;
```

配列はネストすることも可能です。

```aleo
[[true, false, true, false], [false, true, false, true]]
```

```aleo showLineNumbers
function get_nested_array_element:
    input r0 as [[boolean; 4u32]; 2u32].public;
    r0[0u32][1u32] into r1;
    output r1 as boolean.public;
```

:::info
Aleo instructions は現時点では固定長の静的配列のみをサポートします。
:::

### Record

[Record](../../concepts/fundamentals/02_records.md) 型は `record {name}:` で宣言します。  
`{name} as {type}.{visibility};` の形式で各フィールドを定義します。  
Record には必ず `owner` フィールドを含める必要があります。  
Record をプログラム関数へ入力する際は `_nonce as group.{visibility}` の宣言も必要です。

```aleo showLineNumbers
record token:
    // The token owner.
    owner as address.private;
    // The token amount.
    amount as u64.private;
```

Record をインスタンス化するには `cast` 命令を使用します。

```aleo showLineNumbers
function new_token:
    input r0 as address.private;
    input r1 as u64.private;
    input r2 as u64.private;
    cast r0 r1 r2 into r3 as token.record;
    output r3 as token.record;
```

### Special Operands

#### self.signer

`self.signer` オペランドはトランジションを発生させたユーザーのアドレスを返します。  
中間プログラムが自分自身ではなく元の呼び出し元の状態を変更する必要がある場合に有用です。  

下の例では、`transfer_public_as_signer` 関数が `self.signer` を利用して、中間プログラムのアカウントではなく元のユーザーのアカウントから残高を減算しています。  

```aleo showLineNumbers
// The `transfer_public_as_signer` function sends the specified amount
// from the signer's `account` to the receiver's `account`.
function transfer_public_as_signer:
    // Input the receiver.
    input r0 as address.public;
    // Input the amount.
    input r1 as u64.public;
    // Transfer the credits publicly.
    async transfer_public_as_signer self.signer r0 r1 into r2;
    // Output the finalize future.
    output r2 as credits.aleo/transfer_public_as_signer.future;

finalize transfer_public_as_signer:
    // Input the signer.
    input r0 as address.public;
    // Input the receiver.
    input r1 as address.public;
    // Input the amount.
    input r2 as u64.public;
    // Decrements `account[r0]` by `r2`.
    // If `account[r0] - r2` underflows, `transfer_public_as_signer` is reverted.
    get account[r0] into r3;
    sub r3 r2 into r4;
    set r4 into account[r0];
    // Increments `account[r1]` by `r2`.
    // If `account[r1]` does not exist, 0u64 is used.
    // If `account[r1] + r2` overflows, `transfer_public_as_signer` is reverted.
    get.or_use account[r1] 0u64 into r5;
    add r5 r2 into r6;
    set r6 into account[r1];
```

#### self.caller

`self.caller` オペランドはプログラムを直近で呼び出した相手のアドレスを返します。

### Mapping

Mapping は `mapping {name}:` で宣言します。キーと値のペアを保持し、プログラム内で定義する必要があります。  
Mapping はオンチェーンに公開状態で保存され、秘匿データを格納することはできません。

```aleo showLineNumbers
// On-chain storage of an `account` map, with `owner` as the key,
// and `amount` as the value.
mapping account:
    // The token owner.
    key owner as address.public;
    // The token amount.
    value amount as u64.public;
```

#### Contains

キーの存在を確認する `contains` コマンド。例: `contains accounts[r0] into r1;`

#### Get

値を取得する `get` コマンド。例: `get accounts[r0] into r1;`

#### Get or Use

値が存在しない場合にデフォルト値を使用する `get.or_use` コマンド。例: `get.or_use account[r1] 0u64 into r5;`

```aleo showLineNumbers
// The `transfer_public` function sends the specified amount
// from the caller's `account` to the receiver's `account`.
function transfer_public:
    // Input the receiver.
    input r0 as address.public;
    // Input the amount.
    input r1 as u64.public;
    // Transfer the credits publicly.
    async transfer_public self.caller r0 r1 into r2;
    // Output the finalize future.
    output r2 as credits.aleo/transfer_public.future;

finalize transfer_public:
    // Input the caller.
    input r0 as address.public;
    // Input the receiver.
    input r1 as address.public;
    // Input the amount.
    input r2 as u64.public;
    // Decrements `account[r0]` by `r2`.
    // If `account[r0] - r2` underflows, `transfer_public` is reverted.
    get account[r0] into r3;
    sub r3 r2 into r4;
    set r4 into account[r0];
    // Increments `account[r1]` by `r2`.
    // If `account[r1]` does not exist, 0u64 is used.
    // If `account[r1] + r2` overflows, `transfer_public` is reverted.
    get.or_use account[r1] 0u64 into r5;
    add r5 r2 into r6;
    set r6 into account[r1];
```

#### Set

値を設定する `set` コマンド。例: `set r0 into accounts[r0];`

#### Remove

キーと値を削除する `remove` コマンド。例: `remove accounts[r0];`

### Finalize

Finalize は `finalize {name}:` で宣言します。  
[Function](#function) の直後に配置し、同じ名前を持たせる必要があります。

```aleo showLineNumbers
// The `transfer_public_to_private` function turns a specified amount
// from the mapping `account` into a record for the specified receiver.
//
// This function publicly reveals the sender, the receiver, and the specified amount.
// However, subsequent methods using the receiver's record can preserve the receiver's privacy.
function transfer_public_to_private:
    // Input the receiver.
    input r0 as address.private;
    // Input the amount.
    input r1 as u64.public;
    // Construct a record for the receiver.
    cast r0 r1 into r2 as credits.record;
    // Decrement the balance of the sender publicly.
    async transfer_public_to_private self.caller r1 into r3;
    // Output the record of the receiver.
    output r2 as credits.record;
    // Output the finalize future.
    output r3 as credits.aleo/transfer_public_to_private.future;

finalize transfer_public_to_private:
    // Input the sender.
    input r0 as address.public;
    // Input the amount.
    input r1 as u64.public;
    // Retrieve the balance of the sender.
    get account[r0] into r2;
    // Decrements `account[r0]` by `r1`.
    // If `r2 - r1` underflows, `transfer_public_to_private` is reverted.
    sub r2 r1 into r3;
    // Updates the balance of the sender.
    set r3 into account[r0];
```

:::note
`finalize` 関数は、関連付けられた関数のゼロ知識証明が検証された後にオンチェーンで実行されます。
Finalize が成功するとプログラムのロジックが適用され、失敗するとロジックはロールバックされます。  
::: 

### Futures

Future はオンチェーン実行の呼び出しグラフに相当し、実行の finalize 時に明示的に利用されます。
コードから呼び出しグラフを暗黙的に構築する代わりに、トランジション／回路が Future を出力し、
オンチェーンでどのコードブロックをどのように実行するかを指定します。

#### future type
`Locator` に `.future` を付けることで Future 型を宣言します。  
例: `credits.aleo/mint_public.future`。  
Function は Future を出力のみでき、Finalize ブロックは Future の入力のみ受け取ることができます。  
Closure は Future を出力したり入力したりできません。

#### async call
`async` キーワードを使うと finalize ブロックへの非同期呼び出しが可能です。
例: `async mint_public r0 r1 into r2;`。このとき対象となる関数を明示する必要があります。
`async` は `Future` を出力し、従来は関数の出力後の本文で使用できた `finalize` 命令に代わるものです。

#### await command
Finalize ブロック内では `await` 命令を使って Future を評価できます。  
例: `await r0;`。`await` は finalize ブロックでのみ使用でき、オペランドは Future を含むレジスタである必要があります。

#### Indexing a future.
Future を含むレジスタには通常のインデックス構文を使用できます。  
例: `r0[0u32]`。Future の指定位置の入力を取得します。  
Future の構造に合わせてネストしたアクセスも可能です。

#### Future example
```aleo showLineNumbers
program basic_math.aleo;

mapping uses:
    key user as address.public;
    value count as i64.public;

function add_and_count:
    input r0 as i64.private;
    input r1 as i64.private;
    add r0 r1 into r2;
    async add_and_count self.caller into r3;
    output r2 as i64.private;
    output r3 as basic_math.aleo/add_and_count.future;

finalize add_and_count:
    input r0 as address.public;
    get.or_use uses[r0] 0i64 into r1;
    add r1 1i64 into r2;
    set r2 into uses[r0];

function sub_and_count:
    input r0 as i64.private;
    input r1 as i64.private;
    sub r0 r1 into r2;
    async sub_and_count self.caller into r3;
    output r2 as i64.private;
    output r3 as basic_math.aleo/sub_and_count.future;

finalize sub_and_count:
    input r0 as address.public;
    get.or_use uses[r0] 0i64 into r1;
    add r1 1i64 into r2;
    set r2 into uses[r0];

/////////////////////////////////////////////////

import basic_math.aleo;

program count_usages.aleo;

function add_and_subtract:
    input r0 as i64.private;
    input r1 as i64.private;
    call basic_math.aleo/add_and_count r0 r1 into r2 r3;
    call basic_math.aleo/sub_and_count r2 r1 into r4 r5;
    assert.eq r0 r4;
    assert.eq r3[0u32] r5[0u32];
    async add_and_subtract r3 r5 into r6;
    output r0 as i64.private;
    output r6 as count_usages.aleo/add_and_subtract.future;

finalize add_and_subtract:
    input r0 as basic_math.aleo/add_and_count.future;
    input r1 as basic_math.aleo/sub_and_count.future;
    await r0;
    assert.eq r0[0u32] r1[0u32];
    await r1;
```

There are a number of rules associated with using these components.

これらの要素に関してはいくつかのルールがあります。

1. finalize ブロックを持つ関数には `async` 命令がちょうど 1 つ必要です。
2. finalize ブロックを持つ関数の最後の出力は Future でなければなりません。
3. finalize ブロックを持たない関数では `async` 命令を使用できません。
4. `call` によって生成された Future は、生成された順序で `async` 命令に入力する必要があります。
5. `async` 呼び出しは同じ関数を参照しなければなりません。
6. `async` を呼び出す前にすべての `call` を行う必要があります。
7. finalize ブロックの Future 入力型は、関数内で生成された順番と一致していなければなりません。
8. finalize 内のすべての Future は指定された順序で `await` する必要があります。
9. `call`、`async`、`await` の呼び出しの間に命令を挟むことができます。


### Finalize Commands

Aleo instructions では追加機能を提供するために次のコマンドがサポートされています。

#### block.height

`block.height` コマンドはプログラムが実行されるブロックの高さ（最新ブロック高さ + 1）を返します。  
時間に基づいたアクセス制御を行う際に役立ちます。  
`block.height` は finalize ブロック内でのみ呼び出せます。

```aleo
assert.eq block.height 100u64;
```

#### network.id

`network.id` コマンドはプログラムが実行されているネットワーク ID を返します。  
ネットワーク特有の挙動を制御する際に有用です。  
`network.id` も finalize ブロック内でのみ呼び出せます。

現在サポートされているネットワーク ID:
- 0: Mainnet
- 1: Testnet 
- 2: Canarynet

#### rand.chacha

`rand.chacha` コマンドは [ChaCha20 アルゴリズム](http://cr.yp.to/chacha.html) で生成された乱数を返します。  
ランダムな `address`、`boolean`、`field`、`group`、`i8`、`i16`、`i32`、`i64`、`i128`、`u8`、`u16`、`u32`、`u64`、`u128`、`scalar` をサンプリングできます。  
最大 2 つまで追加のシードを指定できます。現在サポートされている乱数生成器は ChaCha20 のみですが、将来的には他の生成器にも対応する可能性があります。

```aleo
rand.chacha into r0 as field;
rand.chacha r0 into r1 as field;
rand.chacha r0 r1 into r2 as field;
```

#### Hash

Aleo instructions は標準型へのハッシュを以下の構文でサポートしています。

```aleo
hash.bhp256 r0 into r1 as address;
hash.bhp256 r0 into r1 as field;
hash.bhp256 r0 into r1 as group;
hash.bhp256 r0 into r1 as i8;
hash.bhp256 r0 into r1 as i16;
hash.bhp256 r0 into r1 as i32;
hash.bhp256 r0 into r1 as i64;
hash.bhp256 r0 into r1 as i128;
hash.bhp256 r0 into r1 as u8;
hash.bhp256 r0 into r1 as u16;
hash.bhp256 r0 into r1 as u32;
hash.bhp256 r0 into r1 as u64;
hash.bhp256 r0 into r1 as u128;
hash.bhp256 r0 into r1 as scalar;
hash.bhp512 ...;
hash.bhp768 ...;
hash.bhp1024 ...;
hash.ped64 ...;
hash.ped128 ...;
hash.psd2 ...;
hash.psd4 ...;
hash.psd8 ...;
```

サポートされているハッシュアルゴリズムの一覧は [Aleo instructions opcode](./04_opcodes.md) を参照してください。

#### Commit

Aleo instructions は標準型へのコミットを以下の構文でサポートしています。  
`commit` コマンドの最初の引数は任意の型、2 番目の引数は `scalar` である必要があります。

```aleo
commit.bhp256 r0 r1 into r2 as address;
commit.bhp256 r0 r1 into r2 as field;
commit.bhp256 r0 r1 into r2 as group;
commit.bhp512 ...;
commit.bhp768 ...;
commit.bhp1024 ...;
commit.ped64 ...;
commit.ped128 ...;
```

サポートされるコミットメントアルゴリズムについても [Aleo instructions opcode](./04_opcodes.md) を参照してください。

#### position, branch.eq, branch.neq

`position` コマンド（例: `position exit`）は分岐先となる位置を指定します。  
`branch.eq` コマンド（例: `branch.eq r0 r1 to exit`）は `r0` と `r1` が等しい場合に `exit` で指定された位置に分岐します。  
`branch.neq` コマンドは `r0` と `r1` が等しくない場合に同様の分岐を行います。

**例**  
入力が `0u8` の場合に finalize ブロックが成功し、それ以外の場合は失敗します。

```aleo
program test_branch.aleo;

function run_test:
    input r0 as u8.public;
    finalize r0;

finalize run_test:
    input r0 as u8.public;
    branch.eq r0 0u8 to exit;
    assert.eq true false;
    position exit;
```

### Program Interoperability

このセクションの例では以下の環境を使用します。

```bash title=".env"
NETWORK=testnet
PRIVATE_KEY=APrivateKey1zkpE37QxQynZuEGg3XxYrTuvhzWbkVaN5NgzCdEGzS43Ms5 # user private key
ADDRESS=aleo1p2h0p8mr2pwrvd0llf2rz6gvtunya8alc49xldr8ajmk3p2c0sqs4fl5mm # user address
```


#### Child and Parent Program

次の例は `parent.aleo` が別プログラム `child.aleo` を呼び出す方法を示しています。  


```aleo showLineNumbers title="./imports/child.aleo"
program child.aleo;

function foo:
    output self.caller as address.public;
    output self.signer as address.public;
```
```aleo showLineNumbers title="./parent.aleo"
import child.aleo;

program parent.aleo;

// Make an external program call from `parent.aleo` to `function foo` in `child.aleo`.
function foo:
    call child.aleo/foo into r0 r1;
    output r0 as address.public;
    output r1 as address.public;
    output self.caller as address.public;
    output self.signer as address.public;
```

```bash
$ snarkvm execute foo

⛓  Constraints

 •  'test.aleo/foo' - 2,025 constraints (called 1 time)
 •  'child.aleo/foo' - 0 constraints (called 1 time)

➡️  Outputs

 # The address of the caller of `child.aleo/foo` => `program.aleo`
 • aleo18tpu6k9g6yvp7uudmee954vgsvffcegzez4y8v8pru0m6k6zdsqqw6mx3t 
 
 # The address that originated the sequence of calls leading up to `child.aleo/foo` => user address
 • aleo1p2h0p8mr2pwrvd0llf2rz6gvtunya8alc49xldr8ajmk3p2c0sqs4fl5mm
 
 # The address of the caller of `program.aleo/foo` => user address
 • aleo1p2h0p8mr2pwrvd0llf2rz6gvtunya8alc49xldr8ajmk3p2c0sqs4fl5mm
 
 # The address that originated the sequence of calls leading up to `program.aleo/foo` => user address
 • aleo1p2h0p8mr2pwrvd0llf2rz6gvtunya8alc49xldr8ajmk3p2c0sqs4fl5mm
```

#### User Callable Program

4 行目で `assert.eq self.caller self.signer;` を追加することで、その関数がユーザーからのみ呼び出せるよう制限できます。
```aleo showLineNumbers title="./imports/child.aleo"
program child.aleo;

function foo:
    assert.eq self.caller self.signer; // This check should fail if called by another program.
    output self.caller as address.public;
    output self.signer as address.public;
```
```aleo showLineNumbers title="./parent.aleo"
import child.aleo;

program parent.aleo;

// Make an external program call from `parent.aleo` to `function foo` in `child.aleo`.
function foo:
    call child.aleo/foo into r0 r1;
    output r0 as address.public;
    output r1 as address.public;
    output self.caller as address.public;
    output self.signer as address.public;

```
```bash
$ snarkvm execute foo

⚠️  Failed to evaluate instruction (call child.aleo/foo into r0 r1;):
Failed to evaluate instruction (assert.eq self.caller self.signer ;):
'assert.eq' failed: 
'aleo18tpu6k9g6yvp7uudmee954vgsvffcegzez4y8v8pru0m6k6zdsqqw6mx3t' 
is not equal to 
'aleo1p2h0p8mr2pwrvd0llf2rz6gvtunya8alc49xldr8ajmk3p2c0sqs4fl5mm' 
(should be equal)
```

#### Program Callable Program

4 行目で `assert.neq self.caller self.signer;` を追加すると、その関数は他のプログラムからのみ呼び出せるようになります。
```aleo showLineNumbers title="restrict.aleo"
program restrict.aleo;

function foo:
    assert.neq self.caller self.signer; 
    output self.caller as address.public;
    output self.signer as address.public;
```

```bash
$ snarkvm execute foo

⚠️  Failed to evaluate instruction (assert.neq self.caller self.signer ;):
'assert.neq' failed: 
'aleo1p2h0p8mr2pwrvd0llf2rz6gvtunya8alc49xldr8ajmk3p2c0sqs4fl5mm'
is equal to 
'aleo1p2h0p8mr2pwrvd0llf2rz6gvtunya8alc49xldr8ajmk3p2c0sqs4fl5mm'
(should not be equal)
```
