---
id: token_registry
title: トークンレジストリプログラム
sidebar_label: トークンレジストリ
---

## 概要

トークンレジストリプログラムは、Aleo ブロックチェーン上で新しいトークンを発行・管理するための標準プログラムです。Aleo では、import するプログラムを事前に把握してデプロイしておく必要があり、また現状では動的なクロスプログラム呼び出しがサポートされていないため、1 つのプログラムが複数トークンを扱う構成になっています。つまり、ある DeFi プログラムが任意のトークンと連携するには、そのトークンをあらかじめ組み込んでコンパイルしておく必要があります。デプロイ後に新しいトークンプログラムが追加された場合、DeFi プログラム側も再コンパイル・再デプロイしないとそのトークンとやり取りできません。

近い将来に動的ディスパッチが実装されればこの制約は解消される予定ですが、現時点では [token registry](https://explorer.provable.com/program/token_registry.aleo) を利用することで回避しています。レジストリは複数の ARC-20 トークン残高を一元管理できる「ハブ」として機能します。各 ARC-20 トークンはレジストリに登録し、このプログラム経由でミントや転送を行います。トークンの価値移転は ARC-20 プログラム自身ではなくレジストリを直接呼び出す形で行われます。

この仕組みにより、DeFi プログラムは個別トークンについて特別な知識を持たなくてもレジストリさえ参照していれば動作します。つまり、新しいトークンをデプロイしても DeFi プログラム側の再デプロイは不要です。逆に ARC-20 トークンもレジストリに依存するだけで済み、個別の DeFi プログラムへの依存は不要です。レジストリがあることで新しいトークンと DeFi プログラムの相互運用性が確保され、プログラムを再デプロイする必要がありません。さらに副次的なメリットとして、レジストリ上での秘匿転送では転送対象のトークン種類が第三者からは分からなくなるため、匿名性セットが広がりプライバシーが向上します。

この標準は、さまざまな議論と [ARC-21 提案](https://vote.aleo.org/p/21) の承認を経て策定されました。複数アプリケーション間でトークンをシームレスに扱うことを目指しています。

<!-- markdown-link-check-disable -->
本ドキュメントではトークンレジストリプログラムの各機能と利用方法を説明します。原典のソースコードは [こちら](https://github.com/demox-labs/aleo-standard-programs/blob/main/token_registry/src/main.leo) を参照してください。
<!-- markdown-link-check-enable -->

## トークンレジストリプログラムの利用方法

誰でも `register_token` トランジションを呼び出し、ユニークなトークン ID と名前・シンボル・小数点桁数・最大供給量を指定することで `token_registry.aleo` プログラム上にトークンを作成できます。オプションの `external_authorization_required` ブール値を有効にすると、`external_authorization_party` が追加承認を与えた分だけ残高を使える仕組みを導入できます。`external_authorization_party` は `prehook_public` または `prehook_private` を使って特定アカウントの残高を期限付きでアンロックできます。必要に応じて `update_token_management` で後から別アドレスを承認主体に設定することも可能です。

トークン登録後は、管理者または `MINTER_ROLE` / `SUPPLY_MANAGER_ROLE` を付与されたアドレスが `mint_public`（公開）もしくは `mint_private`（秘匿）でミントできます。削除（バーン）は `burn_public` もしくは `burn_private` を利用し、こちらも管理者または `BURNER_ROLE` / `SUPPLY_MANAGER_ROLE` を持つアドレスが実行します。

トークン保有者は `transfer_public` を使って公開で転送したり、`transfer_private` を使って秘匿のまま別アドレスへ送信できます。`transfer_public_to_private` で公開残高からレコードへ変換したり、`transfer_private_to_public` でレコードから公開残高へ変換することも可能です。

## トークンレジストリプログラムのデータ構造

### Token レコード

```leo
record Token {
  owner: address,
  amount: u128,
  token_id: field,
  external_authorization_required: bool,
  authorized_until: u32
}
```

#### Token レコードのフィールド

- `owner`: トークン所有者のアドレス
- `amount`: 保有量
- `token_id`: トークン固有の識別子
- `external_authorization_required`: 外部承認が必要かどうか
- `authorized_until`: 承認が有効なブロック高

### TokenMetadata 構造体

```leo
struct TokenMetadata {
  token_id: field,
  name: u128, // ASCII をビット列で表現し、それを u128 に変換した値
  symbol: u128, // 同上
  decimals: u8,
  supply: u128,
  max_supply: u128,
  admin: address,
  external_authorization_required: bool, // 転送前に外部プログラムの承認が必要かどうか
  external_authorization_party: address
}
```

#### TokenMetadata 構造体のフィールド

- `token_id`: トークン固有の識別子
- `name`: トークン名
- `symbol`: シンボル
- `decimals`: 小数点桁数
- `supply`: 現在の総供給量
- `max_supply`: 最大供給量
- `admin`: 管理者のアドレス
- `external_authorization_required`: 外部承認の要否
- `external_authorization_party`: 外部承認を行うアドレス

### TokenOwner 構造体

```leo
struct TokenOwner {
  account: address,
  token_id: field
}
```

#### TokenOwner 構造体のフィールド

- `account`: トークン所有者のアドレス
- `token_id`: トークン固有の識別子

### Balance 構造体

```leo
struct Balance {
  token_id: field,
  account: address,
  balance: u128,
  authorized_until: u32
}
```

#### Balance 構造体のフィールド

- `token_id`: トークン固有の識別子
- `account`: アカウントアドレス
- `balance`: 残高
- `authorized_until`: 承認が有効なブロック高

### Allowance 構造体

```leo
struct Allowance {
  account: address,
  spender: address,
  token_id: field
}
```

#### Allowance 構造体のフィールド

- `account`: トークン所有者のアドレス
- `spender`: 使用許可を受けたアドレス
- `token_id`: トークン固有の識別子

## トークンレジストリプログラムのマッピング

`mapping registered_tokens: field => TokenMetadata;`  
トークン ID と TokenMetadata の対応表です。

`mapping balances: field => Balance;`  
トークン ID とアカウントアドレスのハッシュをキーに、Balance 構造体を保存します。

`mapping allowances: field => Allowance;`  
トークン ID・アカウントアドレス・使用者アドレスのハッシュをキーに、Allowance 構造体を保存します。

`mapping roles: field => u8;`  
トークン ID とアカウントアドレスのハッシュをキーに、ロール種別を保存します。

## トークンレジストリプログラムの定数

`const CREDITS_RESERVED_TOKEN_ID: field = 3443843282313283355522573239085696902919850365217539366784739393210722344986field;`  
ALEO Credits 用に予約されているトークン ID です。

`const MINTER_ROLE: u8 = 1u8;`  
ミンター用ロール。

`const BURNER_ROLE: u8 = 2u8;`  
バーン用ロール。

`const SUPPLY_MANAGER_ROLE: u8 = 3u8;`  
供給管理者用ロール。

## トークンレジストリプログラムの関数一覧

以下に主なトランジションおよび関数を紹介します。

### `initialize()`
#### 説明
トークンレジストリプログラムを初期化し、ALEO Credits を既定のメタデータで登録します。トークン ID・名前「credits」・シンボル「credits」・小数点 6 桁・最大供給量 10,000 兆を設定し、管理者は `wrapped_credits.aleo` に固定、外部承認は無効化します。これにより初期化後にメタデータが変更されないようにします。

#### パラメータ
すべてプログラム内でハードコードされており、フロントランニング対策になっています。

#### 戻り値
なし。

### `register_token()`
#### 説明
新しいトークンをレジストリに登録します。

#### パラメータ
- `public token_id: field`（トークン ID）
- `public name: u128`（トークン名）
- `public symbol: u128`（シンボル）
- `public decimals: u8`（小数点桁数）
- `public max_supply: u128`（最大供給量）
- `public external_authorization_required: bool`（外部承認の要否）
- `public external_authorization_party: address`（外部承認主体のアドレス）

#### 戻り値
- `Future`: 登録完了を finalize するための Future

### `update_token_management()`
#### 説明
トークンの管理設定を更新します。

#### パラメータ
- `public token_id: field`
- `public admin: address`
- `public external_authorization_party: address`

#### 戻り値
- `Future`

### `set_role()`
#### 説明
特定トークンのアカウントにロールを割り当てます。

#### パラメータ
- `public token_id: field`
- `public account: address`
- `public role: u8`

#### 戻り値
- `Future`

### `remove_role()`
#### 説明
特定トークンのアカウントからロールを削除します。

#### パラメータ
- `public token_id: field`
- `public account: address`

#### 戻り値
- `Future`

### `mint_public()`
#### 説明
管理者が公開でトークンをミントします。

#### パラメータ
- `public token_id: field`
- `public recipient: address`
- `public amount: u128`
- `public authorized_until: u32`

#### 戻り値
- `Future`

### `mint_private()`
#### 説明
管理者が秘匿でトークンをミントします。

#### パラメータ
- `public token_id: field`
- `recipient: address`（非公開の受取アドレス）
- `public amount: u128`
- `public external_authorization_required: bool`
- `public authorized_until: u32`

#### 戻り値
- `Token`: 新規レコード
- `Future`

### `burn_public()`
#### 説明
管理者が公開でトークンをバーンします。

#### パラメータ
- `public token_id: field`
- `public owner: address`
- `public amount: u128`

#### 戻り値
- `Future`

### `burn_private()`
#### 説明
管理者が秘匿でトークンをバーンします。

#### パラメータ
- `input_record: Token`
- `public amount: u128`

#### 戻り値
- `Token`: 残高を減らしたレコード
- `Future`

### `prehook_public()`
#### 説明
外部承認主体が公開で承認残高と期限を更新します。

#### パラメータ
- `public owner: address`
- `public amount: u128`
- `public authorized_until: u32`

#### 戻り値
- `Future`

### `prehook_private()`
#### 説明
外部承認主体が秘匿で承認残高と期限を更新します。

#### パラメータ
- `input_record: Token`
- `amount: u128`
- `authorized_until: u32`

#### 戻り値
- `Token`: 承認前レコード
- `Token`: 承認後レコード
- `Future`

### `transfer_public()`
#### 説明
所有者が公開でトークンを転送します。

#### パラメータ
- `public token_id: field`
- `public recipient: address`
- `public amount: u128`

#### 戻り値
- `Future`

### `transfer_public_as_signer()`
#### 説明
トランザクション署名者として任意のプログラム呼び出し内で公開転送を行います。

#### パラメータ
- `public token_id: field`
- `public recipient: address`
- `public amount: u128`

#### 戻り値
- `Future`

### `approve_public()`
#### 説明
第三者が所有者の代わりに転送できるよう承認します。

#### パラメータ
- `public token_id: field`
- `public spender: address`
- `public amount: u128`

#### 戻り値
- `Future`

### `unapprove_public()`
#### 説明
承認済みの使用量を減らす、または承認自体を取り消します。

#### パラメータ
- `public token_id: field`
- `public spender: address`
- `public amount: u128`

#### 戻り値
- `Future`

### `transfer_from_public()`
#### 説明
承認済みの第三者が所有者の残高を公開で転送します。

#### パラメータ
- `public token_id: field`
- `public owner: address`
- `public recipient: address`
- `public amount: u128`

#### 戻り値
- `Future`

### `transfer_public_to_private()`
#### 説明
公開残高を秘匿トークンに変換します。

#### パラメータ
- `public token_id: field`
- `recipient: address`（非公開の受取アドレス）
- `public amount: u128`
- `public external_authorization_required: bool`

#### 戻り値
- `Token`
- `Future`

### `transfer_from_public_to_private()`
#### 説明
承認済みの第三者が公開残高を秘匿トークンへ変換します。

#### パラメータ
- `public token_id: field`
- `public owner: address`
- `recipient: address`（非公開の受取アドレス）
- `public amount: u128`
- `public external_authorization_required: bool`

#### 戻り値
- `Token`
- `Future`

### `transfer_private()`
#### 説明
所有者が秘匿トークンを転送します。

#### パラメータ
- `recipient: address`
- `amount: u128`
- `input_record: Token`

#### 戻り値
- `Token`: 送信後のレコード
- `Token`: 受取り側のレコード
- `Future`

### `transfer_private_to_public()`
#### 説明
秘匿トークンを公開残高へ変換します。

#### パラメータ
- `public recipient: address`
- `public amount: u128`
- `input_record: Token`

#### 戻り値
- `Token`: 残高を減らしたレコード
- `Future`

### `join()`
#### 説明
2 つの秘匿トークンレコードを 1 つにまとめます。合計量は変わりません。

#### パラメータ
- `private token_1: Token`
- `private token_2: Token`

#### 戻り値
- `Token`: 結合後のレコード

### `split()`
#### 説明
秘匿トークンレコードを 2 つに分割します。合計量は変わりません。

#### パラメータ
- `private token: Token`
- `private amount: u128`

#### 戻り値
- `Token`: 分割して取り出したレコード
- `Token`: 残りのレコード
