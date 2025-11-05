---
id: aleo
title: Aleo instructions と snarkVM
sidebar_label: 概要
---
ようこそ Aleo instructions ガイドへ。Aleo instructions は Aleo プログラムの中間表現です。
すべての Leo プログラムは Aleo instructions にコンパイルされ、さらにバイトコードにコンパイルされます。
細かな回路設計が目的の場合や、Leo 以外の高級言語を読み込むコンパイラを実装し Aleo 上で動かしたい場合は、
Aleo instructions を学び使いこなすことを推奨します。

Aleo プログラムは `.aleo` 拡張子を持つファイルです。
プログラム内にはアセンブリライクなプログラミング言語である Aleo instructions が記述されます。
Aleo instructions は Aleo Virtual Machine が実行可能な AVM opcode へコンパイルされます。

Aleo instructions をコンパイル・実行するには snarkVM をインストールしてください。

:::info
snarkVM は現在活発に開発されています。破壊的変更がある可能性があるため、[**GitHub**](https://github.com/AleoNet/snarkVM) のリポジトリをウォッチすることをおすすめします。
:::

## snarkVM のインストール

[**Installation**](./01_installation.md) に進むと、snarkVM のインストール方法を確認できます。

## Hello Aleo Instructions

最初の Aleo instructions プログラム [**Hello Aleo**](./02_hello.md) を作成しましょう。

## Aleo instructions ガイド

[Aleo instructions](./03_language.md) の基本概念と文法を学びましょう。

サポートされる [AVM opcode](./04_opcodes.md) の一覧を参照してください。

## 形式文法ドキュメント

開発したプログラムやコンパイラの実装を [Aleo instructions の文法](./07_grammar.md) と照合しましょう。

Aleo instructions の完全な形式文法については、[ABNF 文法仕様](https://github.com/ProvableHQ/grammars) を参照してください。

## コマンドラインインターフェースのドキュメント

snarkVM CLI は Aleo instructions の開発を支援するさまざまなコマンドを提供しています。

* [snarkvm new](./06_commands.md#aleo-new)
* [snarkvm build (deprecated)](./06_commands.md#aleo-build)
* [snarkvm run](./06_commands.md#aleo-run)
* [snarkvm clean](./06_commands.md#aleo-clean)
* [snarkvm update](./06_commands.md#aleo-update)

[//]: # (5. [aleo node]&#40;./05_commands.md#5-aleo-node&#41;)
[//]: # (6. [aleo deploy]&#40;./05_commands.md#6-aleo-deploy&#41;)

## その他の資料

お気に入りのコード [**エディタ**](./08_tooling.md) に Aleo instructions 用の拡張機能を導入しましょう。
