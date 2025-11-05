---
id: installation
title: インストール
sidebar_label: インストール
---
## 1. 前提条件のインストール

### 1.1 Git をインストール

**[bit.ly/start-git](https://bit.ly/start-git)**

### 1.2 Rust をインストール

**[bit.ly/start-rust](https://bit.ly/start-rust)**

### 1.3 前提条件の確認

```bash
git --version
cargo --version
```

### 2. ソースコードのビルド

以下の手順でソースコードから snarkVM をビルドし、インストールできます。

```bash
# Download the source code
git clone https://github.com/AleoNet/snarkVM
cd snarkvm

# Build in release mode
$ cargo install --path .
```

これで `~/.cargo/bin/snarkvm` に実行ファイルが生成されます。

snarkVM CLI を利用するには、ターミナルで次のコマンドを実行します。
```bash
snarkvm
```

:::info

[**Hello Aleo**](02_hello.md) からコードを書き始めてみましょう。

:::

