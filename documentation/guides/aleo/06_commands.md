---
id: commands
title: snarkVM コマンドラインインターフェース
sidebar_label: コマンド
---

## コマンド一覧
:::tip
`snarkvm --help` を実行するとコマンド一覧を表示できます。
:::

* [snarkvm new](#aleo-new)
* [snarkvm build](#aleo-build)
* [snarkvm run](#aleo-run)
* [snarkvm execute](#aleo-execute)
* [snarkvm clean](#aleo-clean)
* [snarkvm update](#aleo-update)

[//]: # (5. [aleo node]&#40;#5-aleo-node&#41;)
[//]: # (5. [aleo deploy]&#40;#6-aleo-deploy&#41;)

Aleo のプライベートキー、ビューキー、アドレスがコンソールに出力されます。  
詳しくは [`concepts/accounts`](../../concepts/fundamentals/00_accounts.md) を参照してください。

## `snarkvm new` {#aleo-new}

新しいパッケージを作成するには次を実行します。
```bash
snarkvm new {$NAME}
```

有効なパッケージ名は snake_case で、英小文字と数字をアンダースコアで区切った形式です。  
このコマンドは指定したパッケージ名のディレクトリを作成し、以下のような構造を生成します。

```bash
package-name/
├── program.json # プログラムのマニフェスト
├── README.md # プログラムの説明
└── main.leo # プログラム本体
```

## `snarkvm build` {#aleo-build}
:::info
このコマンドは snarkVM `v0.14.5` で非推奨になりました。今後のリリースで削除される予定です。
:::
プログラムをコンパイルして正常にビルドできるか確認するには次を実行します。
```bash
snarkvm build
```

オフラインモードでコンパイルするには次を実行します。
```bash
snarkvm build --offline
```

## `snarkvm run` {#aleo-run}

Aleo プログラムの関数を実行するには次を実行します。
```bash
snarkvm run {$FUNCTION} {$INPUTS}

// 例
snarkvm run hello 2u32 3u32
```

オフラインモードで関数を実行するには次を実行します。
```bash
snarkvm run {$FUNCTION} {$INPUTS} --offline
```

特定のエンドポイントに対して関数を実行するには次を実行します。
```bash
snarkvm run {$FUNCTION} {$INPUTS} --endpoint {$ENDPOINT}
```

## `snarkvm execute` {#aleo-execute}

Aleo プログラムの関数を実行（execute）するには次を実行します。
```bash
snarkvm execute {$FUNCTION} {$INPUTS}

// 例
snarkvm run hello 2u32 3u32
```

オフラインモードで実行するには次を実行します。
```bash
snarkvm execute {$FUNCTION} {$INPUTS} --offline
```

特定のエンドポイントに対して実行するには次を実行します。
```bash
snarkvm execute {$FUNCTION} {$INPUTS} --endpoint {$ENDPOINT}
```

## `snarkvm clean` {#aleo-clean}

Aleo パッケージのビルドディレクトリをクリーンアップするには次を実行します。
```bash
snarkvm clean
```

## `snarkvm update` {#aleo-update}

snarkVM を最新バージョンに更新するには次を実行します。
```
snarkvm update
```

Aleo の利用可能なバージョンを一覧表示するには次を実行します。
```
snarkvm update --list
```

snarkVM を更新しつつターミナルへの出力を抑制するには次を実行します。
```
snarkvm update --quiet
```
