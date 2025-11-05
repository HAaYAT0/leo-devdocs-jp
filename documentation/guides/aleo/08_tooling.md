---
id: tooling
title: Aleo instructions のためのツール
sidebar_label: ツール
---

:::info
Leo 構文の[プラグイン](https://docs.leo-lang.org/getting_started/ide#plugins)を導入済みであれば、`.aleo` ファイルの構文ハイライトはすでに利用できるはずです。
:::

Aleo では複数プラットフォーム向けに構文ハイライトを提供しています。お使いのエディタがこの一覧にない場合は、[GitHub](https://github.com/ProvableHQ/leo) でお気軽にご連絡ください。

1. [Sublime Text](#sublime-text)
2. [Visual Studio Code](#vscode)
3. [IntelliJ](#intellij)

## Sublime Text

![](./images/sublime.png)  
エディタはこちらからダウンロードできます: https://www.sublimetext.com/download  
Aleo instructions のサポートは Sublime の LSP プラグイン経由で提供されます。

### インストール

1. Package Control から [LSP](https://packagecontrol.io/packages/LSP) と [LSP-leo](https://packagecontrol.io/packages/LSP-leo) をインストールします。
2. Sublime を再起動します。

### 使い方

次の手順で `Aleo instructions` のシンタックスハイライトを有効化できます。

1. `Sublime Text` を開きます。
2. Settings > Select Color Scheme... > LSP-leo を選択します。
3. これで Aleo instructions の構文ハイライトが表示されるようになります。

## VSCode

![](./images/vscode.png)  
エディタはこちらからダウンロードできます: https://code.visualstudio.com/download

### インストール

1. VSCode Marketplace から [Leo for VSCode](https://marketplace.visualstudio.com/items?itemName=aleohq.leo-extension) をインストールします。  
2. 正しい拡張 ID は `provablehq.leo-extension` で、説明には「the official VSCode extension for Leo」と記載されています。

### 使い方

1. `VSCode` を開きます。
2. 設定 > 拡張機能、または左側パネルの拡張機能ボタンから Leo プラグインを有効にします。
3. これで Aleo instructions の構文ハイライトが表示されるようになります。

## IntelliJ

![](./images/intellij.png)  
エディタはこちらからダウンロードできます: https://www.jetbrains.com/idea/download/

### インストール

1. JetBrains Marketplace から [Aleo Developer Plugin](https://plugins.jetbrains.com/plugin/19890-aleo-developer) をダウンロードします。
2. 右上のギアアイコン > Plugins > 上部のギアアイコン > Install Plugin from Disk を順に選択し、ダウンロードした zip ファイルを指定します。
3. これで Aleo instructions の構文ハイライトが表示されるようになります。
