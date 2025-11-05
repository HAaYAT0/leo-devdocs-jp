---
id: hello
title: Hello Aleo Instructions
sidebar_label: Hello Aleo
---
## 1. 新しいプロジェクトを作成してビルドする

新しいプロジェクトを作成するには `new` コマンドを使用します。今回は次のように進めます。

``` bash
snarkvm new foo
```

これで **foo** というディレクトリと、基本的なプロジェクト構成を持つファイルが生成されます。

- **README.md** — コンパイル手順などを記した README のテンプレート
- **main.aleo** — ソースコードのメインファイル
- **program.json** — プロジェクトを識別する JSON ファイル。特に開発用アドレスとプログラム用秘密鍵を含みます。

`main.aleo` ファイルには次のような内容が記述されています。

```aleo showLineNumbers
// The 'foo.aleo' program.
program foo.aleo;

function hello:
    input r0 as u32.public;
    input r1 as u32.private;
    add r0 r1 into r2;
    output r2 as u32.private;
```

プログラムは `snarkvm run` コマンドに続けて実行したい関数名と入力パラメータを渡すことで実行できます。

``` bash
snarkvm run hello 2u32 3u32
```

次のような出力が表示されます。

```bash
 • Loaded universal setup (in 1478 ms)

⛓  Constraints

 •  'foo.aleo/hello' - 33 constraints (called 1 time)

➡️  Output

 • 5u32

✅ Finished 'foo.aleo/hello' (in "/Users/collin/code/snarkVM/foo")
```

見てのとおり、出力には入力の合計である `5u32` が表示されます。

## 2. プログラムを実行する

`snarkvm execute` コマンドでも、関数名と入力パラメータを指定してプログラムを実行できます。

``` bash
snarkvm execute hello 2u32 3u32
```

実行が完了すると、次のような出力が表示されます。

```bash
 • Loaded universal setup (in 1478 ms)

⛓  Constraints

 •  'foo.aleo/hello' - 33 constraints (called 1 time)

➡️  Output

 • 5u32
 
  {"type":"execute","id":"at1 ... (transaction object truncated for brevity)

✅ Executed 'foo.aleo/hello' (in "/Users/collin/code/snarkVM/foo")
```

こちらも入力の合計である `5u32` が出力されています。

実行時には「ユニバーサルセットアップ」が読み込まれます。詳細は [Marlin 論文](https://eprint.iacr.org/2019/1047.pdf) を参照してください。

ユニバーサルセットアップが準備できると `main.aleo` 内のすべての関数がビルドされ、出力フォルダに以下のファイルが生成されます。

- **hello.prover** — `hello` 関数のプローバー
- **hello.verifier** — `hello` 関数のベリファイア
- **main.avm** — Aleo プログラムを実行する VM 用のバイトコード

推測できるとおり、プログラム全体に対して `.avm` ファイルは 1 つですが、各関数ごとにプローバーとベリファイアが生成されます。

## 3. プログラムの概要

`main.aleo` にある foo プログラムを見ていきましょう。

```aleo showLineNumbers
// The 'foo.aleo' program.
program foo.aleo;

function hello:
    input r0 as u32.public;
    input r1 as u32.private;
    add r0 r1 into r2;
    output r2 as u32.private;
```

まず次のようにプログラムを宣言します。

```aleo
program foo.aleo;
```

その後、関数（後述する struct、record、closure などの Aleo 構造体も含む）を記述できます。

関数は次のように記述します。

```aleo
function [function_name]:
```

関数は主に 3 つの部分で構成されています。

- **入力セクション**

  入力パラメータを宣言します。
  ```aleo
      input r0 as u32.public;
      input r1 as u32.private;
  ```
  Aleo instructions ではすべての値がレジスタに格納され、型（`i8`、`field`、`bool` など）と可視性（`public` または `private`）を持ちます。レジスタは `r0`, `r1`, ..., `rn` のように命名されます。

  この例では 32 ビットの符号なし整数である `u32` の値を、順番に `r0` と `r1` に格納して加算処理を行います。

- **命令セクション**

  関数の中心となる部分で、ここで必要な Aleo instruction を呼び出します。例えば加算を行うには次のように記述します。
  ```aleo
      add r0 r1 into r2;
  ```
  各命令は特定の型を持つ入力パラメータを取り、`into` の後に指定したレジスタに結果を格納します。

  利用可能な Aleo instruction opcode は [こちら](./04_opcodes.md) で確認できます。

- **出力セクション**

  入力セクションと同様に、関数の戻り値を宣言します。
  ```aleo
      output r2 as u32.private;
  ```

## 4. 型

Aleo は強い型付けの文法を採用しており、16 個のプリミティブ型に加えてユーザー定義型も利用できます。

Aleo のプリミティブ型は次のとおりです。
```aleo
address
boolean
field
group
i8
i16
i32
i64
i128
u8
u16
u32
u64
u128
scalar
```

`struct` や `record` キーワードを使うとユーザー定義型を作成できます。次のセクションで詳しく見ていきます。

### 4.1 レジスタ

レジスタはデータを格納し、後で操作するための領域です。

### 4.2 Struct

Struct はユーザー定義のデータ構造で、他のプログラミング言語における構造体とほぼ同じです。Struct も他の Aleo データ型と同様にレジスタに格納できます。

例として、3 要素の固定長配列を表す struct を `main.aleo` の末尾に追加してみましょう。

```aleo showLineNumbers
struct array3:
    a0 as u32;
    a1 as u32;
    a2 as u32;
```

例として、`array3` 型のレジスタに格納された各要素に 1 を加算する関数を実装します。

```aleo showLineNumbers
function sum_one_to_array3:
    input r0 as array3.private;
    add r0.a0 1u32 into r1;
    add r0.a1 1u32 into r2;
    add r0.a2 1u32 into r3;
    cast r1 r2 r3 into r4 as array3;
    output r4 as array3.private;
```

このように、struct を `r0` に入力し、`.` 構文で要素にアクセスできます。各要素に `add` 命令を適用し、`r1`, `r2`, `r3` に結果を格納した後、`cast` 命令で新しい `array3` struct を `r4` に生成します。

それでは実行してみましょう。今回新しく覚えておく必要があるのは、CLI で struct を渡す際のフォーマットです。

```bash
"{a0: 1u32, a1: 2u32, a2: 3u32}"
```

`snarkvm run` コマンドを実行します。新しいコードを反映させるため、まずクリーンしてから実行しましょう。

```bash
snarkvm clean && snarkvm run sum_one_to_array3 "{a0: 0u32, a1: 1u32, a2: 2u32}"
```

すると次のように新しい `array3` が出力されます。

```bash
➡️  Output
 • {
  a0: 1u32,
  a1: 2u32,
  a2: 3u32
}
✅ Executed 'foo.aleo/sum_one_to_array3' (in "[...]/foo")
```

### 4.3 Record

Record はユーザー資産やアプリケーションステートを表現する基本的なデータ構造です。Struct と非常によく似ていますが、必須の要素が 1 つあります。

```aleo showLineNumbers
record token:
    owner as address.private
```

`owner` はその Record を所有する Aleo アドレスを表します。

Record はアプリケーション内でステートを扱うための基本的な構造であるため重要です。

Aleo の関数を実行する際、アプリケーションアドレスに属するレジスタのみが入力として渡せます。そうでない場合はエラーが発生し、アプリケーションは実行されません。

開発用アプリケーションアドレスは `.env` ファイルに記載されています。

```json
{
    NETWORK=testnet
    PRIVATE_KEY=APrivateKey1zkpFsQNXJwdvjKs9bRsM91KcwJW1gW4CDtF3FJbgVBAvPds
}
```

### 4.4 Aleo のステート

Aleo ではアプリケーションのステートは Record を通じて管理されます。Aleo アカウントはトランザクションを作成し、既存の Record を消費して新しい Record を生成できます。Record は所有者アドレスに対して暗号化されているため、Aleo の Record はすべて完全にプライベートです。


## 5. 初めての Aleo プログラム: トークンの送金


次のプログラムを見てみましょう。
```aleo showLineNumbers
// The 'foo.aleo' program.
program foo.aleo;

record token:
    owner as address.private;
    amount as u64.private;

function mint:
    input r0 as u64.private;
    cast self.signer r0 into r1 as token.record;
    output r1 as token.record;

function transfer_amount:
    //  sender token record
    input r0 as token.record;
    // receiver address
    input r1 as address.private;
    // amount to transfer
    input r2 as u64.private;
    // final balance of sender
    sub r0.amount r2 into r3;
    // final balance of receiver
    add 0u64 r2 into r4;
    // sender token record after the transfer
    cast r0.owner r3 into r5 as token.record;
    // receiver token record after the transfer
    cast r1 r4 into r6 as token.record;
    // sender new token record
    output r5 as token.record;
    // receiver new token record
    output r6 as token.record;
```
まず必須フィールド `owner` と、保有トークン量を表す `amount` を持つ独自の Record 型 `token` を定義します。

`transfer_amount` 関数は 3 つの入力パラメータ（送信者レコード、受信者アドレス、送金額）を受け取り、それぞれを `r0`, `r1`, `r2` に格納します。その後、送信者と受信者それぞれの最終残高を計算して `r3`, `r4` に格納します（**sub** と **add** 命令で減算・加算を計算）。その結果を元に送信者・受信者の新しい Record を `r5`, `r6` に生成し、**output** 命令で関数の戻り値として出力します。

この関数を実行する際、最初のパラメータにはプログラムの入力 Record を渡します。フォーマットは struct と同様です。

```json
{
  owner: aleo1x5nz5u4j50w482t5xtqc3jdwly9s8saaxlgjz0wvmuzmxv2l5q9qmypx09.private,
  amount: 50u64.private
}
```

ここで:

- owner: `.env` の `PRIVATE_KEY` に対応するプログラムの公開アドレス
- その他のパラメータ: プログラムに応じて指定（この例では `amount` に 50 を指定）

それでは `transfer_amount` 関数を実行しましょう（実際に試す場合は `owner` に `program.json` にあるアドレスを使用してください）。

``` bash
snarkvm clean && snarkvm run transfer_amount "{
owner: aleo1x5nz5u4j50w482t5xtqc3jdwly9s8saaxlgjz0wvmuzmxv2l5q9qmypx09.private,
amount: 50u64.private,
_nonce: 0group.public
}" aleo1h3gu7fky36y8r7v2x9phc434fgf20g8qd7c7u45v269jfw6vmugqjegcvp 10u64
```

次のような出力レコードが得られます。

```bash

⛓  Constraints

 •  'foo.aleo/transfer_amount' - 4,172 constraints (called 1 time)
 
➡️  Outputs
 • {
  owner: aleo1x5nz5u4j50w482t5xtqc3jdwly9s8saaxlgjz0wvmuzmxv2l5q9qmypx09.private,
  amount: 40u64.private
  _nonce: 2293253577170800572742339369209137467208538700597121244293392265726446806023group.public
}
 • {
  owner: aleo1h3gu7fky36y8r7v2x9phc434fgf20g8qd7c7u45v269jfw6vmugqjegcvp.private,
  amount: 10u64.private
  _nonce: 2323253577170856894742339369235137467208538700597121244293392765726742543235group.public
}
✅ Finished 'foo.aleo/transfer_amount' (in "[...]/foo")
```

これで Aleo 上で独自トークンの送金が完了しました。

注意: `_nonce` は Aleo instructions には記述されません。コンパイラがレコード出力に `_nonce` を含めるため、レコードを入力として使用する際はユーザーが `_nonce` を指定する必要があります。
