---
id: ans
title: Aleo ネームサービス
sidebar_label: Aleo ネームサービス
---

## 概要

Aleo Name Service（ANS）は、Aleo ブロックチェーン上で人間が読みやすいドメイン名を管理するための標準プログラムです。この標準は [ARC-137 提案](https://github.com/ProvableHQ/ARCs/discussions/45) を起源とし、[Aleo Governance](https://vote.aleo.org/p/137) によるコミュニティ投票で正式に承認されました。

ANS は覚えやすく更新可能な人間可読の識別子を提供することで、Aleo 上での操作性を高めます。公開ドメイン名と秘匿ドメイン名の両方に対応し、それぞれ異なるユースケースやプライバシー要件に応じて利用できます。公開ドメイン名はネットワークリソースを指定するための安定した識別子として使え、秘匿ドメイン名は受取人アドレスを秘匿したまま Aleo Credits（AC）を送金する手段として機能します。

### ARC-0721 との互換性

ANS は [ARC-0721 標準](./01_nft_standards.md) と互換性を持たせることを目指していますが、ドメイン名登録という特性上、NFT 構造を一部拡張しています。動的にドメインの識別子を生成し、既存エコシステムとの統合を維持するための変更です。

#### NFT 構造における差異

ANS で扱う NFT は、ARC-0721 の標準構造をベースとしつつ `data` フィールドが動的である点が異なります。ユーザーがドメイン名を登録する際に `name_hash` が生成され、それが `data` に格納されるため、登録時まで内容が確定しません。

```leo
// ARC-0721 との違いは data フィールドが動的に生成される点です。
record NFT {
    owner: address,
    data: data,
    edition: scalar // ここは ARC-0721 と同様にエディション番号を保持
}
```

#### 機能性向上のための相違

こうした変更は ANS の機能を実現するために不可欠であり、Aleo エコシステム全体との互換性を保ちながら柔軟なドメイン登録を可能にします。開発者はこれらの違いを把握することで、ANS と他標準を円滑に組み合わせて利用できます。

本ドキュメントでは ANS プログラムの構成要素と利用方法を説明します。ソースコードは [GitHub リポジトリ](https://github.com/S-T-Soft/ans-programs) に公開されています。

## ANS を構成するコンポーネント

1. **レジストリプログラム**: ドメイン名とリゾルバの対応を管理し、名前の更新を可能にします。
2. **レジストラ**: ドメインの割り当てや TLD（トップレベルドメイン）の管理を担当します。
3. **リゾルバ**: リソースの問い合わせに応じてデータを返します。

## レジストリプログラム

レジストリプログラムは ANS の中核であり、ドメイン名システムを管理して名前と関連データのマッピングを保持します。

### データ構造

#### Name 構造体

```leo
struct Name {
    name: [u128; 4],
    parent: field // 親ドメインの name_hash。トップレベルドメインでは 0field。
}
```

#### NameStruct 構造体

```leo
struct NameStruct {
    name: [u128; 4],
    parent: field,
    resolver: field // リゾルバプログラムのアドレス
}
```

#### data 構造体

```leo
struct data {
    metadata: [field; 4], // 先頭要素にドメイン名の name_hash を格納
}
```

#### NFT レコード

```leo
record NFT {
    owner: address,
    data: data,
    edition: scalar
}
```

#### NFTView レコード

```leo
record NFTView {
    owner: address,
    data: data,
    edition: scalar,
    is_view: bool
}
```

### マッピング

```leo
mapping nft_owners: field => address;
mapping names: field => NameStruct;
mapping tlds: field => [u128; 4];
mapping primary_names: address => field;
mapping name_versions: field => u64;
mapping resolvers: ResolverIndex => [u128; 4];
mapping domain_credits: field => u64;
```

### 主要関数

- `register_tld()`: 新しいトップレベルドメインを登録
- `register()`: 新しいドメイン名を登録
- `register_private()`: 秘匿サブドメインを登録
- `register_public()`: 公開ドメインを登録
- `transfer_private()`: 秘匿ドメインを移転
- `transfer_public()`: 公開ドメインを移転
- `set_primary_name()`: アドレスのプライマリ名を設定
- `unset_primary_name()`: プライマリ設定を解除
- `set_resolver()`: ドメインのリゾルバを設定

## レジストラ

レジストラはドメイン割り当てとトップレベルドメインの運用を担当し、レジストリプログラムと連携します。

### レジストラの役割

- ドメイン名の検証
- TLD 管理
- 登録手数料の処理
- ドメイン更新の管理

## リゾルバ

リゾルバはリソースの問い合わせに応じてデータを返す専用プログラムです。

### リゾルバの役割

- リソース検索処理
- データ解決
- レコード管理
- バージョン管理

### ResolverIndex 構造体

```leo
struct ResolverIndex {
    name: field,     // ドメインの name_hash
    category: u128,  // リゾルバ種別
    version: u64     // リゾルバのバージョン
}
```

### リゾルバが提供する操作

- `set_resolver_record()`: 秘匿ドメインのリゾルバレコードを設定
- `unset_resolver_record()`: 秘匿ドメインのリゾルバレコードを削除
- `set_resolver_record_public()`: 公開ドメインのリゾルバレコードを設定
- `unset_resolver_record_public()`: 公開ドメインのリゾルバレコードを削除

## プライバシークレジット転送スキーム

ANS 上に構築されたプライバシークレジット転送スキームは、双方の Aleo アドレスを明かさずにクレジットを送金できる仕組みです。

### クレジット転送

この機能により、受取人の Aleo アドレスを公開せずにドメインへクレジットを送金できます。秘密情報（secret）を用いることで、ドメイン所有者のみがクレジットを受領できます。

#### 秘匿ドメインへのクレジット転送

```leo
transition transfer_credits(receiver: field, secret: [u128; 2], amount: u64, pay_record: credits.leo/credits)
```

#### 公開ドメインへのクレジット転送

```leo
transition transfer_credits_public(receiver: field, secret: [u128; 2], amount: u64)
```

### クレジットの受取

ドメイン所有者は、ドメインの公開・秘匿状態に応じて適切な関数を使用します。

#### 秘匿ドメインとして受け取る

```leo
transition claim_credits_private(receiver: address, nft: NFT, secret: [u128; 2], amount: u64)
```

#### 公開ドメインとして受け取る（呼び出し元が所有者）

```leo
transition claim_credits_public(receiver: address, name_hash: field, secret: [u128; 2], amount: u64)
```

#### 署名者として受け取る（署名者が所有者）

```leo
transition claim_credits_as_signer(receiver: address, name_hash: field, secret: [u128; 2], amount: u64)
```
