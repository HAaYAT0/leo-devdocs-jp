---
id: overview
title: Provable SDK
sidebar_label: 概要
---
Aleo はゼロ知識を活用したプログラムを通じて、ユーザーが秘匿性の高いトランザクションを行えるようにします。[Provable SDK](https://github.com/provablehq/sdk) は、ブラウザからウェブスタック全体に至るまで、これらのプログラムを活用したプライバシー保護アプリケーションを構築できる JavaScript/TypeScript ライブラリ群です。  

パッケージをインストールせずに SDK を試したい場合は、[provable.tools](https://www.provable.tools/) をご覧ください。

SDK は主に次の 3 つのライブラリで構成されています。

## [`sdk`](https://github.com/provablehq/sdk/tree/mainnet/sdk)

<a href="https://www.npmjs.com/package/@provablehq/sdk"> <img alt="Provable SDK" src="https://img.shields.io/npm/l/%40provablehq%2Fsdk?label=NPM%20-%20Aleo%20SDK&labelColor=green&color=blue" /></a>


このコア SDK ライブラリは、Aleo ネットワーク上で開発・対話するための JavaScript/TypeScript ツールを提供します。

[インストールガイド](./guides/01_getting_started.md) から始めて、最初のゼロ知識 Web アプリの構築に取り組みましょう。

## [`wasm`](https://github.com/provablehq/sdk/tree/mainnet/wasm)

<a href="https://www.npmjs.com/package/@provablehq/wasm"> <img alt="Create Leo App" src="https://img.shields.io/npm/l/%40provablehq%2Fwasm?label=NPM%20-%20Aleo%20Wasm&labelColor=green&color=blue" /></a>
<a href="https://crates.io/crates/aleo-wasm"> <img alt="Aleo-Wasm" src="https://img.shields.io/crates/v/aleo-wasm.svg?color=neon" /></a>

Aleo Wasm は、ゼロ知識プログラムの生成・実行を担う Aleo コードを WebAssembly へコンパイルする Rust クレートです。

`wasm-pack` でコンパイルすると、WebAssembly 向けに JavaScript バインディングが生成され、ブラウザや Node.js で Aleo のゼロ知識プログラムを利用できるようになります。このパッケージは上記リンク先の NPM から入手できます。


## [`create-leo-app`](https://github.com/ProvableHQ/sdk/tree/mainnet/create-leo-app )

<a href="https://www.npmjs.com/package/create-leo-app"> <img alt="Create Leo App" src="https://img.shields.io/npm/l/create-leo-app?label=NPM%20-%20Create-Leo-App&labelColor=green&color=blue" /></a>

`create-leo-app` は React など一般的な Web フレームワーク向けにゼロ知識 Web アプリのサンプルを提供します。サンプルコードから学びたい開発者はここから始めるのがおすすめです。


テンプレートを使ってプロジェクトを始めるには、次のコマンドを実行します。
```bash
npm create leo-app@latest
```



