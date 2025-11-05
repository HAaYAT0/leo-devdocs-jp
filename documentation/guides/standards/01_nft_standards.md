---
id: nft_standards
title: NFT 標準
sidebar_label: NFT 標準
---

## 概要

本ドキュメントでは、Aleo ブロックチェーン上で非代替性トークン（NFT）を実装するための仕様をまとめます。この標準は [ARC-0721 提案](https://github.com/ProvableHQ/ARCs/discussions/79) を起源とし、[Aleo Governance](https://vote.aleo.org/p/721) によるコミュニティ投票で正式に承認されました。

トークンレジストリプログラムと同様に、Aleo では動的なクロスプログラム呼び出しが未サポートであることから、プログラムの合成（composability）に課題があります。この問題を解決するため、NFT コレクションを一元管理し DeFi アプリとの連携を容易にする [NFT Registry Program (ARC-722)](https://github.com/ProvableHQ/ARCs/discussions/80) が提案されています。

## 主な特徴

この標準は Aleo 特有のプライバシー機能を活かし、以下を実現します。
- トークン所有者の公開・秘匿を選択可能
- トークンデータの公開・秘匿を選択可能
- オンチェーン / オフチェーン両方の柔軟なデータ保管

## データ保管の選択肢

### オンチェーン vs オフチェーン

標準では、NFT データを次の 3 通りで管理できます。

1. **オンチェーンデータ**
   - データをそのまま、またはハッシュとしてチェーン上に保存
2. **オフチェーンデータ**
   - チェーン上の保存コストを抑制
   - 外部メタデータへの URI として管理するケースが一般的
   - オンチェーンと組み合わせてハイブリッドにすることも可能
3. **ハイブリッド**
   - オンチェーンとオフチェーンを組み合わせた方式
   - 例: 所有者情報はオンチェーンで公開、データ本体はオフチェーンで秘匿

## データ構造

### NFT レコード

```leo
record NFT {
    private owner: address,
    private data: data,
    private edition: scalar,
}
```

#### NFT レコードのフィールド
- `owner`: NFT 所有者の秘匿アドレス
- `data`: NFT に紐づく秘匿データ
- `edition`: 一意性とプライバシーのためのスカラー値

### NFT View レコード

```leo
record NFTView {
    private owner: address,
    private data: data,
    private edition: scalar,
    private is_view: bool
}
```

#### NFT View レコードのフィールド
- `owner`: NFT 所有者の秘匿アドレス
- `data`: NFT に紐づく秘匿データ
- `edition`: 一意性とプライバシーのためのスカラー値
- `is_view`: NFTView と NFT を識別するためのブール値（常に true）

### Data 構造体

```leo
struct attribute {
    trait_type: [field; 4],
    _value: [field; 4],
}

struct data {
    metadata: [field; 4], // オフチェーンメタデータ JSON への URI
    // （任意）name: [field; 4],
    // （任意）image: [field; 16],
    // （任意）attributes: [attribute; 4],
}
```

#### Data 構造体のフィールド
- `metadata`: オフチェーンメタデータ JSON を指す URI
- `name`: 任意の NFT 名称
- `image`: 任意の画像データ
- `attributes`: 任意の属性配列

オフチェーンメタデータ JSON の例は [こちら](https://aleo-public.s3.us-west-2.amazonaws.com/testnet3/privacy-pride/1.json) にあります。

### NFT Content 構造体

```leo
struct nft_content {
    data: data,
    edition: scalar
}
```

#### NFT Content 構造体のフィールド
- `data`: NFT に紐づくデータ
- `edition`: NFT のエディション番号

## マッピング

`mapping nft_commits: field => bool;`  
NFT コミットメントの存在状態を保持します。

`mapping nft_owners: field => address;`  
NFT コミットメントと公開所有者を紐づけます。

`mapping nft_contents: field => nft_content;`  
NFT コミットメントと公開コンテンツを紐づけます。

## 関数

### `commit_nft()`
#### 説明
データとエディションから NFT のコミットメント（識別子）を生成します。

#### パラメータ
- `nft_data: data`
- `nft_edition: scalar`

#### 戻り値
- `field`: NFT コミットメント

### `transfer_private_to_public()`
#### 説明
秘匿所有 NFT を公開所有へ変換します。

#### パラメータ
- `private nft: NFT`
- `public to: address`

#### 戻り値
- `NFTView`
- `Future`

### `publish_nft_content()`
#### 説明
NFT コンテンツを公開状態にします。

#### パラメータ
- `public nft_data: data`
- `public nft_edition: scalar`

#### 戻り値
- `Future`

### `update_edition_private()`
#### 説明
秘匿 NFT のエディションを更新し、再難読化します。

#### パラメータ
- `private nft: NFT`
- `private new_edition: scalar`

#### 戻り値
- `NFT`
- `Future`

## 文字列のエンコード

NFT は URL や属性情報などで文字列を多用します。本標準では以下のエンコード方式を推奨しています。

```leo
// Leo での表現
string: [field; 4],

// Aleo instructions での表現
string as [field; 4u32];
```

配列長はコレクションで必要な最大文字数に応じて調整してください。`field` 型を用いることで `u128` の約 2 倍に相当するデータ量を扱える点が利点です。

JavaScript / TypeScript アプリケーション向けには、文字列と Aleo plaintext を相互変換するユーティリティが [ARC-721 実装](https://github.com/zsociety-io/aleo-standard-programs/blob/main/arc721/utils/strings.js) に用意されています。

## プライバシー機能

本標準ではプライバシーを以下の仕組みで実現します。

### 所有権のプライバシー
- Aleo のレコードによって秘匿所有が可能
- `nft_owners` マッピングを使えば公開所有に切り替え可能
- プログラムが NFT を保有する場合でも、データを公開する必要はありません

### データのプライバシー
- データはデフォルトでレコード内に秘匿
- `edition` スカラーにより公開情報を増やさず一意性を確保
- NFT コミットメントはデータを公開せずに識別子として機能します

### 再難読化

NFT は次の手順で再難読化できます。
1. 所有状態を秘匿に戻す
2. `update_edition_private()` でエディションを更新

```leo
async transition update_edition_private(
    private nft: NFT,
    private new_edition: scalar,
) -> (NFT, Future) {
    let out_nft: NFT = NFT {
        owner: nft.owner,
        data: nft.data,
        edition: new_edition,
    };
    let nft_commit: field = commit_nft(nft.data, new_edition);

    let update_edition_private_future: Future = finalize_update_edition_private(
        nft_commit
    );
    return (out_nft, update_edition_private_future);
}

async function finalize_update_edition_private(
    nft_commit: field,
) {
    assert(nft_commits.contains(nft_commit).not());
    nft_commits.set(nft_commit, true);
}
```

プライバシーに関する注意点:
- 以前の NFT コミットメントはマッピングに保持され、データの関連性を推測されないようにします。
- 新しいエディションは一意である必要があります。
- データを再度公開することなく新しい公開識別子を得られます。

## 承認機能

所有者が第三者に NFTs の転送を委任できる承認機構を備えています。コレクション全体と個別 NFT の両方をサポートします。

```leo
struct approval {
    approver: address,
    spender: address
}

mapping for_all_approvals: field => bool;
mapping nft_approvals: field => field;
```

主な関数:
1. `set_for_all_approval`: コレクション全体を対象に承認する
2. `approve_public`: 特定の NFT を承認する

承認後、承認されたアドレスは `transfer_from_public` を利用して転送できます。

## 設定

コレクション単位の設定は次のマッピングで管理します。

```leo
mapping general_settings: u8 => field;
```

設定インデックスの例:
- `0u8`: ミント可能な NFT 総数（全エディション）
- `1u8`: ミント可能な初期エディション数（ユニーク NFT）
- `2u8`: シンボル
- `3u8`〜`6u8`: ベース URI（最大 4 分割）
- `7u8`: 管理者アドレスのハッシュ

これにより、ミント上限やメタデータ URI、管理権限などを細かく制御できます。

## 実装上の注意点

1. 本標準は、ファンジブルトークンの名前・シンボルを定める ARC-21 と互換性があります。
2. データが公開され得るコレクション（publishable collections）では、公開・再難読化の両方に対応する仕組みを提供します。
3. [NFT Registry Program (ARC-722)](https://github.com/ProvableHQ/ARCs/discussions/80) は、[トークンレジストリ](./00_token_registry.md) と同様にプログラム合成の課題を解消するための提案です。`(registry_program_id, collection_id)` の組み合わせで複数実装を扱えるよう設計されています。
