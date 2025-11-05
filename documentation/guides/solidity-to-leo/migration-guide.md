---
id: migration-guide
title: 移行ガイド
description: Solidity から Leo への移行ガイド
sidebar_label: 移行ガイド
---

このガイドでは、Solidity（Ethereum のスマートコントラクト言語）と Leo（Aleo のゼロ知識アプリケーション向け言語）の違いを網羅的に解説します。言語仕様の根本的な違いと、Ethereum 開発から Aleo 開発へ移行する際に役立つ実践的な例を紹介します。

## 実行モデル

Leo と Solidity は、実行モデルが本質的に異なります。

- **Ethereum / Solidity**: すべての計算がオンチェーンで実行されます。
- **Aleo / Leo**: 計算はオフチェーンで行われ、ゼロ知識証明だけがオンチェーンで検証されます。

この違いが、後述する多くの言語デザインの差異につながっています。

## 基本構造

### ヘッダー

プログラムの冒頭は、それぞれの言語で記述方法が異なります。

**Solidity のコントラクト:**
```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract MyToken {
    // Contract implementation
}
```

**Leo のプログラム:**
```leo
// ライセンス識別子は不要
// pragma も不要

program my_token.aleo {
    // Program implementation
}
```

**主な違い**
- Leo ではライセンス識別子や pragma 宣言は不要です。
- Leo の import はファイルパスではなくプログラム ID を用います。
- Leo のプログラム名は `.aleo` サフィックスが必須です。
- Solidity では `contract` キーワードを使いますが、Leo では `program` キーワードと波括弧 `{}` で定義します（スマートコントラクトに相当）。

### コンストラクタ

Solidity のコンストラクタは任意ですが、Leo には現時点でコンストラクタがありません。ただし [ARC-0006: Program Upgradability](https://github.com/ProvableHQ/ARCs/discussions/94) により、今後 Leo の新しいプログラムではコンストラクタが必須になる予定です。Solidity のコンストラクタは 1 度だけ実行されるのに対し、Leo のコンストラクタは不変な存在としてデプロイやアップグレード時に実行され、アップグレードロジックを定義する役割を持つようになります。

### コメント

両言語ともコメント構文は同じです。

```leo
// 単一行コメント（両言語共通）

/*
 * 複数行コメントも同じ書き方です
 */
```

### インポート

**Solidity の import:**
```solidity
// ファイル全体をインポート
import "./MyContract.sol";

// 特定のシンボルをインポート
import {Symbol1, Symbol2} from "./MyContract.sol";

// エイリアスを付けてインポート
import * as MyAlias from "./MyContract.sol";

// node_modules からインポート
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
```

**Leo の import:**
```leo
import credits.aleo;

program helloworld.aleo {
    // Program implementation
}
```

**重要: Leo の import は `program.json` にも宣言が必要です**
```json
{
  "program": "my_token.aleo",
  "version": "0.0.0",
  "description": "",
  "license": "MIT",
  "dependencies": [
    {
      "name": "credits.aleo",
      "location": "network",
      "network": "testnet"
    },
    {
      "name": "board.aleo",
      "location": "local",
      "path": "../board"
    }
  ]
}
```

**依存関係の種類**
- **ネットワーク依存**: Aleo ネットワーク（mainnet / testnet）にデプロイ済みのプログラムを参照します。
- **ローカル依存**: ローカルディレクトリ内に存在するプログラムを参照します。

**主な違い**
- Solidity はコンパイル時に import 先のコードを結合します。
- Leo はプログラム同士を独立した ID のまま扱い、コードを結合しません。各プログラムはチェーン上で唯一の Program ID を持ち続けます。

## データとステート

### 状態変数とストレージモデル

Solidity と Leo は、状態変数・ストレージ・プライバシーの扱いが根本的に異なります。

**Solidity の例:**
```solidity
contract Storage {
    // アクセス制御のみを表す可視性修飾子
    uint256 public constant FIXED_VALUE = 100;  // コンパイル時定数
    uint256 public immutable RUNTIME_VALUE;     // コンストラクタで設定
    uint256 public permanentData;               // 自動で getter が生成される
    uint256 internal shared;                    // 継承先から参照可能
    uint256 private local = 42;                 // 継承先から不可だがオンチェーンでは可視
    
    constructor(uint256 _value) {
        RUNTIME_VALUE = _value;
    }
    
    function processData(uint256 tempData) public {
        uint256 memoryVar = tempData * 2;   // メモリ（短期）
        permanentData = memoryVar;          // storage に保存
    }
}
```

**Leo の例:**
```leo
program storage.aleo {
    // コンパイル時定数のみ
    const FIXED_VALUE: u64 = 100u64;

    // 公開状態（全員が参照可能）
    mapping balances: address => u64;
    
    // 秘匿状態（暗号化されたレコードに保存）
    record Token {
        owner: address,
        amount: u64,
    }
    
    // transition の引数と戻り値はデフォルトで秘匿。公開するには public 指定が必要
    async transition process_data(public amount: u64) -> (Token, Future) {
        let amount_loc: u64 = amount * 2u64; // ローカル変数
        
        let token: Token = Token {
            owner: self.caller,
            amount: amount_loc,
        };
        
        return (token, finalize_process_data(self.caller, amount_loc));
    }
    
    // オンチェーン状態更新を行う async function
    async function finalize_process_data(caller: address, amount_loc: u64) {
        let current_balance: u64 = Mapping::get_or_use(balances, caller, 0u64);
        Mapping::set(balances, caller, current_balance + amount_loc);
    }
}
```

**主な違い**
- **Solidity の可視性修飾子**（`private` / `internal` / `public`）はアクセス制御のみで、データはすべてオンチェーンで公開されます。
- **Leo の `public` / `private`** は暗号学的なプライバシーに直結し、オンチェーンに保存するか（public）、レコードとして秘匿するか（private）を決定します。
- **定数**: Solidity は `constant` と `immutable` を提供しますが、Leo はコンパイル時定数 `const` のみです。
- **ローカル変数**: Leo では `let` キーワードを使います（Solidity の `memory` と似た扱い）。
- **Transient ストレージ**: Leo には Solidity の `transient` に相当する仕組みはありません。

### ゲッタ関数

Solidity では `public` な状態変数に自動でゲッタが生成されますが、Leo にはその機能がありません。Leo ではノードの API からマッピングの値を直接取得することができます。

```solidity
// Solidity: 自動的にゲッタが生成される
contract Example {
    uint256 public value;  // value() というゲッタが生成される
}
```

**主な違い**
- **Solidity**: `public` 状態変数や明示的なゲッタが必要。
- **Leo**: プログラムコード内でゲッタを作らなくても、REST API でマッピング値を取得可能。
  - エンドポイント例: `GET /{network}/program/{programID}/mapping/{mappingName}/{mappingKey}`
  - 例: `GET /testnet3/program/credits.aleo/mapping/account/aleo1abc...`
  - 参考: [Get Mapping Value API](../../apis/get-mapping-value.api.mdx)

### 状態変数の削除

**Solidity の削除:**
```solidity
contract DeleteExample {
    uint256 public value = 100;
    mapping(address => uint256) public balances;
    
    function resetValue() public {
        delete value;  // 初期値（uint256 は 0）にリセット
    }
    
    function removeBalance(address user) public {
        delete balances[user];  // マッピングエントリを削除（初期値 0 にリセット）
    }
}
```

**Leo のマッピング操作:**
```leo
program delete_example.aleo {
    mapping balances: address => u64;
    
    async transition remove_balance(user: address) -> Future {
        return finalize_remove_balance(user);
    }
    
    async function finalize_remove_balance(user: address) {
        // 削除前にキーの存在を確認
        let exists: bool = Mapping::contains(balances, user);
        if exists {
            Mapping::remove(balances, user);
        }
    }
}
```

**主な違い**
- **Solidity**: `delete` 演算子で初期値へリセット。
- **Leo**: `Mapping::remove()` によるマッピングエントリ削除のみ。その他の変数に対する `delete` 相当機能はありません。
- **キー存在チェック**: `Mapping::contains()` で事前確認が可能です。

### データ型

型システムにも大きな差があります。

**共通の型（似た挙動）**
```solidity
// Solidity
bool flag = true;
uint32 smallNumber = 100;
address userAddr = 0x742d35...;
```

```leo
// Leo
let flag: bool = true;
let small_number: u32 = 100u32;  // リテラル末尾に型サフィックスが必須
let user_addr: address = aleo1abc...;
```

**リテラルのサフィックス**
Leo ではすべてのリテラルに型サフィックスが必要です。

**Leo 固有の暗号型**
```leo
// Leo に特有の暗号系データ型
let field_element: field = 123field;
let group_element: group = group::GEN;
let scalar_value: scalar = 456scalar;
let user_signature: signature = sign1...;
```

Leo の `signature` 型は Schnorr 署名（Solidity の ECDSA とは異なる）を利用します。ノンスやチャレンジハッシュ、秘密鍵から署名を生成し、公開鍵に対してチャレンジを再構築して検証します。

**Leo の制限事項**

1. **整数の上限**
```solidity
// Solidity は 256 ビット整数をサポート
uint256 bigNumber = 115792089237316195423570985008687907853269984665640564039457584007913129639935;
```

```leo
// Leo は最大 128 ビット
let big_number: u128 = 340282366920938463463374607431768211455u128;
```

2. **Leo で未対応の型**
```solidity
// Leo がサポートしていない例
string memory text = "Hello World";
bytes memory data = hex"1234";
uint256[] memory dynamicArray;
mapping(string => uint256) stringMap;
enum Status { Active, Inactive }
```

```leo
// Leo の代替手段
let text_hash: field = 123456field;           // 文字列をハッシュなどに変換
let static_array: [u32; 5] = [1u32, 2u32, 3u32, 4u32, 5u32]; // 固定長配列のみ
mapping hash_map: field => u64;               // 複雑なキーは field などで代用
const ACTIVE: u8 = 0u8;
const INACTIVE: u8 = 1u8;
```

3. **固定長配列のみ**
```solidity
// Solidity: 動的・固定長どちらもサポート
uint256[5] public staticArray;
```

```leo
// Leo: 固定長配列のみ
transition simple_array() -> [u32; 3] {
    let numbers: [u32; 3] = [1u32, 2u32, 3u32];
    numbers[0u8] = 10u32;
    numbers[1u8] = 20u32;
    return numbers;
}
```

### 型変換

**Solidity の暗黙変換**
```solidity
uint8 small = 100;
uint256 big = small;  // 自動変換
```

**Leo の明示的変換**
```leo
let small: u8 = 100u8;
let big: u32 = small as u32;  // 明示的キャストが必要
```

**主な違い**
- Leo は `as` キーワードによる明示的キャストが必須です。
- **切り詰め挙動**: Solidity はキャスト時の切り詰めを許容しますが、Leo はデータ損失の可能性がある場合に失敗します。
- **自動型昇格**: Solidity は演算時に自動で型昇格しますが、Leo では明示的キャストが必要です。

### 参照型と値型

Solidity は参照型と値型を区別し、データ位置（storage / memory / calldata）の指定が必要です。一方 Leo は値型のみをサポートし、データは常にコピーされます。

## 関数

### 関数の種類

Leo は関数体系を大きく再設計しており、Solidity の可視性修飾子の代わりに関数種別で制御します。

- `transition`: 外部から呼び出し可能な関数（オフチェーン実行）
- `async transition`: オフチェーン計算とオンチェーン更新（Future）を組み合わせる関数
- `function`: 計算専用の内部関数（状態アクセス不可）
- `inline`: インライン展開される内部関数（状態アクセス不可）

Solidity の `public` / `private` / `internal` / `external` はアクセス範囲の違いを示しますが、Leo の `public` / `private` はデータが公開か秘匿かを示します。

### 戻り値

Leo では Rust に似た `-> 型` の記法を用います（識別子は不要）。複数戻り値の場合、Leo ではすべて受け取る必要があります。

### Modifiers

Solidity の modifier に相当する機能は Leo にはありませんが、`inline` 関数を使って同様のチェックを表現できます。

### Async 関数

Leo 独自の概念として async 関数があります。`async transition` から `async function` を呼び出すことで、マッピングなどのオンチェーン状態を更新できます。戻り値には `Future` を使います。

### 呼び出し制約

Leo では関数の呼び出し階層が厳密に定義されています。

- `transition` → `function` → `inline`
- `transition` → `inline`
- `transition` → `external_transition`

再帰呼び出し（直接・間接とも）は禁止されています。

### Fallback / Receive 関数

Leo には fallback や receive の概念はありません。すべての関数呼び出しはシグネチャが一致している必要があります。Aleo Credits を受け取るには `credits.aleo` の関数を経由します。

## 暗号・ビルトイン

### ハッシュ関数

Solidity には限定的なハッシュ関数しかありませんが、Leo には BHP、Poseidon、Keccak、SHA3 など多彩なハッシュ・コミットメント関数が標準搭載されています。

### 乱数

Solidity には乱数生成の組み込み機能がなく、外部オラクルに頼る必要があります。Leo は ChaCha を使った乱数生成をサポートしており、`async function` 内で利用できます。

### グローバル変数

Solidity の `block` / `msg` / `tx` といったグローバル変数に対し、Leo では `block.height`、`network.id`、`self.caller`、`self.signer`、`self.address` などが提供されます。ただし `block.height` や `network.id` は finalize スコープ内（async function 内）でのみ参照できます。現時点ではブロックタイムスタンプやガス情報は取得できません（ARC-0040 が実装されるまでは未対応）。

### 通貨単位

Solidity の Ether 単位（wei / gwei / ether）に対し、Leo は Aleo Credits の単位（microcredit / millicredit / credit）を用います。数値リテラルの単位表現はサポートされていないため、自分で計算を行う必要があります。

### アドレスの機能とネイティブトークン送金

Solidity のアドレスには `.balance` や `.code` などのメンバーが存在し、`transfer` / `send` / `call` 等で送金できます。Leo のアドレスにはメンバー関数はなく、ネイティブトークンである Aleo Credits の送受信は `credits.aleo` プログラムを通して行います。公開残高はマッピングで、秘匿残高はレコードで扱います。

### 算術演算とオーバーフロー

Solidity（0.8 以降）は既定でチェック付き算術、`unchecked` ブロックでラップアラウンド算術が利用できます。Leo ではラップアラウンド演算を `.add_wrap()` / `.sub_wrap()` / `.mul_wrap()` などのメソッドで明示的に指定します。`addmod` や `mulmod` といった組み込みは Leo には存在しません。

### 時刻関連

Solidity は時間単位（seconds / minutes / hours など）や `block.timestamp` を提供しますが、Leo は現状これらを提供していません（ARC-0040 が実装されるまでは未対応）。時間に基づくロジックが必要な場合は、外部で管理するかブロック高を用いた工夫が必要です。

## エラーハンドリング

Solidity は `require` / `revert` / `assert` に加え、`try/catch` やカスタムエラーをサポートします。Leo は `assert` / `assert_eq` / `assert_neq` のみで、文字列メッセージは扱えません。また try/catch 構文もなく、外部呼び出しが失敗するとそのまま停止します。

## ループと条件分岐

Solidity は `while` / `for` / `do-while` をサポートし、`break` / `continue` も利用できます。Leo では `for` ループのみが利用可能で、`break` / `continue` はサポートされません。また、Leo は分岐の両方の経路を実行してから結果を選択する仕様になっており、ゼロ除算などの停止命令があると予期せぬ停止が起きる可能性があります（ARC-0004 で改善予定）。

## クロスプログラム呼び出し

Solidity はインターフェースを通じた動的呼び出しや低レベル `call` をサポートします。Leo は静的な呼び出しのみが可能で、呼び出し先の Program ID をコンパイル時に指定する必要があります。公開状態の参照は finalize スコープ内で `mappings::get()` やマッピング参照を使って行います。

## 継承

Solidity は継承や抽象コントラクト、インターフェースをサポートしますが、Leo に継承機能はありません。代わりに構成（composition）やプログラム import を用いて機能を組み合わせます。インターフェースについては、将来的に動的ディスパッチが実装されれば対応が検討されています。

## ライブラリ

Solidity のライブラリのような仕組みは Leo にはありません。ただし、状態を持たないプログラムを別途用意して共通処理を提供することで、ライブラリに似た使い方が可能です。

## イベントとログ

Solidity はイベントを介してログを出力できますが、Leo はイベントおよびログ機能を持ちません。代替手段として、プログラムの戻り値や外部状態への書き込みで状況を表現する必要があります。

## ABI エンコード / デコード

Solidity は `abi.encode` / `abi.decode` を提供し、`bytes` 型を使った柔軟なシリアライズが可能です。Leo には `bytes` 型がなく、ABI エンコード・デコード機能も存在しません。複雑なデータ構造は固定長配列などで表現し、必要に応じて独自のシリアライズ処理を実装します。

## コントラクトの動的生成

Solidity は `new` や `CREATE2` によるコントラクト生成をサポートします。Leo のプログラムは他のプログラムを生成できず、すべてのプログラムは事前にデプロイしておく必要があります。プログラムのアドレスは人間が読みやすい形で定義されます。

## スコープ規則

両言語とも `{}` で囲まれたブロック内で変数が有効です。ブロックを抜けると変数は参照できなくなります。

## インラインアセンブリ

Solidity はインラインアセンブリ（Yul）を統合できます。一方 Leo にはインラインアセンブリの仕組みはなく、低レベルの制御が必要な場合は Aleo Instructions（`.aleo` ファイル）として別途記述します。詳細は [Aleo instructions の概要](../../guides/aleo/00_aleo_overview.md) を参照してください。
