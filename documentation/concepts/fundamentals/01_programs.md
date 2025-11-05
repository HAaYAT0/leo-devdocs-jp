---
id: programs
title: プログラム
sidebar_label: プログラム
---

**プログラム**は、アプリケーションのロジックと状態を表現するための基本的なデータ構造です。

Aleo では、開発者がプライベートな Web アプリケーションを記述できる新しいプログラミング言語 **Aleo instructions** を導入しています。Aleo instructions は静的型付け言語であり、プライバシー保護とセキュリティを備えたプログラムを Aleo 上で記述するために設計されています。ゼロ知識証明を活用することで、実世界のアプリケーションに求められる計算の完全性を提供します。

## プログラムロジック

Aleo instructions は、開発者がプログラムを記述しやすい環境を提供します。開発者に馴染みのある構文と機能の組み合わせやすさを備えたアセンブリ言語として設計されているため、既存の開発フレームワークと統合しやすく、Web アプリにプライバシーと完全性を付与できます。

```aleo showLineNumbers
program token.aleo;

record token:
    // The token owner.
    owner as address.private;
    // The token balance.
    amount as u64.private;

// The `mint` function initializes a new record with the
// specified number of tokens in `r1` for the receiver in `r0`.
function mint:
    input r0 as address.private;
    input r1 as u64.private;
    cast r0 r1 into r2 as token.record;
    output r2 as token.record;

// The `transfer` function sends the specified number of tokens
// to the receiver from the provided token record.
function transfer:
    // Input the sender's record.
    input r0 as token.record;
    // Input the token receiver.
    input r1 as address.private;
    // Input the token amount.
    input r2 as u64.private;

    // Checks the given token record has sufficient balance.
    // This `sub` operation is safe, and the proof will fail
    // if an underflow occurs. The output register `r3` holds
    // the change amount to be returned to the sender.
    sub r0.amount r2 into r3;

    // Produces a token record for the specified receiver.
    cast r1 r2 into r4 as token.record;

    // Produces a token record with the change amount for the sender.
    cast r0.owner r3 into r5 as token.record;

    // Output the receiver's record.
    output r4 as token.record;
    // Output the sender's change record.
    output r5 as token.record;
```

## プログラムデータ

### プログラム ID

各プログラムには `program.json` のマニフェストに保存された一意の**プログラム ID** が存在します。このプログラム ID は、[レコード](02_records.md)を消費または生成した際にどのプログラムが実行されたのかを示すために使用されます。

### プログラム入力

プログラムを実行するには、ユーザーが定義した**プログラム入力**を与えます。ユーザーが意図的に公開しない限り、この入力は完全に秘匿され、公開ネットワークには明かされません。

### プログラムステート

Aleo では、各プログラムはユーザーが提供する**プログラムステート**に基づいて実行されます。Aleo 上で正当な状態遷移を生成するために、ユーザーは[レコード](02_records.md)にエンコードされた複数のプログラムを満たし、それらが[トランザクション](03_transactions.md)を構成します。

### プログラム出力

プログラムの評価が完了すると、**プログラム出力**が生成され、その出力が正しいことを示すゼロ知識証明が付随します。
