---
id: installation
title: インストール
sidebar_label: インストール
---

ローカルでプログラムを開発・テストするために、以下のツールをインストールしてください。

## 1. Leo をインストールする 🦁

### 1.1 Git をインストールする

**[bit.ly/start-git](https://bit.ly/start-git)**

### 1.2 Rust をインストールする

**[bit.ly/start-rust](https://bit.ly/start-rust)**

### 1.3 Leo をインストールする

次の手順でソースコードから Leo をビルドしてインストールします。
```bash
# ソースコードをダウンロードし、サブモジュールを初期化します
git clone --recurse-submodules https://github.com/ProvableHQ/leo
cd leo

# 'leo' をインストールします
cargo install --path .
```

### 1.4 インストールを確認する

Leo がインストールされているか確認するには、ターミナルで `leo` と入力します。次のような出力が表示されるはずです。

![Leo CLI の出力例](images/leo-cli.png)

### 1.5 バージョン確認と更新

Leo のバージョンを確認するには、ターミナルで次を実行します。
```bash
leo --version
```

最新バージョンに更新するには、次のコマンドを使用します。
```bash
leo update
```

[Leo CLI ガイド](https://docs.leo-lang.org/cli/overview) では CLI コマンドの説明を確認できます。  
[Leo 言語ガイド](https://docs.leo-lang.org/language/overview) では Leo プログラミング言語の構文とセマンティクスを概観できます。

### 1.6 任意: IDE のシンタックスハイライト

Aleo では、主要なコードエディタ向けのシンタックスハイライトを提供しています。視覚的な補助が得られるため、Leo のコードが読みやすくなります。サポートされている代表的なエディタは次のとおりです。

1. Visual Studio Code
2. Sublime Text
3. IntelliJ

各エディタでシンタックスハイライトを設定する手順は、[Tooling for Leo](https://docs.leo-lang.org/getting_started/ide#plugins) を参照してください。

## 2. snarkOS をインストールする

### 2.1 前提条件

はじめに、マシンに Rust v1.79 以上がインストールされていることを確認してください。Rust のインストール手順は [こちら](https://www.rust-lang.org/tools/install) です。

**【Windows ユーザー向け】** 通常の手順でうまくいかない場合は、次の依存関係を追加してください。
1. Visual Studio Installer で C++ Clang tools for Windows をインストールします。
2. `libclang.dll` が置かれているディレクトリ（例:  
   `Program Files (x86)\Microsoft Visual Studio\2022\BuildTools\VC\Tools\Llvm\x64\bin`）を `LIBCLANG_PATH` 環境変数に設定します。

### 2.2 snarkOS リポジトリをクローンする

```bash
git clone --branch mainnet --single-branch https://github.com/ProvableHQ/snarkOS.git
```

**【Ubuntu ユーザー向け】** 依存関係をインストールする補助スクリプトがあります。snarkOS ディレクトリで次を実行してください。
```bash
./build_ubuntu.sh
```

### 2.3 snarkOS をインストールする

```bash
cd snarkOS
cargo install --locked --path .
```

### 2.4 インストールを確認する

snarkOS がインストールされているかを確認するには、ターミナルで `snarkos` と入力します。次のような出力が表示されるはずです。
![snarkOS CLI の出力例](images/snarkos-cli.png)

## 3. 次のステップ

:::tip
まずは [クイックスタートガイド](01_quick_start.md) から始めることをおすすめします。Aleo アプリケーションを作成し、ネットワークにデプロイして、プログラムの関数を実行する流れを通して、Aleo プラットフォームのコア機能とワークフローを実際に体験できます。
:::

これで Leo プログラムをローカルで構築・テストするためのツールが揃いました。テストネットにデプロイする前に、ローカルネットワークでプログラムを検証することをおすすめします。ローカルネットワークの初期化とデプロイ手順は、[こちらのガイド](https://docs.leo-lang.org/testing/devnet) を参照してください。
