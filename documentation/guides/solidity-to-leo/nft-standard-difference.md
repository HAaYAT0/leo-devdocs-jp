---
id: nft-standard-difference
title: NFT 標準の違い
sidebar_label: NFT 標準の違い
---

## はじめに

Ethereum で NFT の標準として用いられるのは ERC-721 ですが、所有者・メタデータ・価格といったあらゆる状態が公開情報です。  
一方、Leo で実装される Aleo 版の ARC-721 は、同じ使い勝手を保ちながら、どの情報を秘匿しどの情報をオンチェーンに保存するかを選択できます。この標準は [ARC-721 提案](https://github.com/ProvableHQ/ARCs/discussions/79) を起源とし、[Aleo Governance](https://vote.aleo.org/p/721) によるコミュニティ投票で正式に承認されました。Aleo のプライバシー機能を活用することで、ERC-721 よりも拡張された機能を提供します。例えば ARC-721 の各 NFT には、所有権と NFT データそれぞれについて個別のプライバシー設定があり、どちらも柔軟に切り替えられます。NFT 標準や実装の詳細は [NFT Standards ドキュメント](../standards/01_nft_standards.md) を参照してください。

Aleo におけるプログラムの合成可能性を高めるため、[NFT Registry Program (ARC-722)](https://github.com/ProvableHQ/ARCs/discussions/80) が提案されています。これは ERC-721 のような NFT コレクションを一元的に管理するハブとして機能し、[トークンレジストリ](../standards/00_token_registry.md) がファンジブルトークンを管理するのと同じ役割を担います。異なるデータ構造の実装を、`(registry_program_id, collection_id)` の組み合わせで識別できるように設計されています。なお、ARC-722 は現在提案段階であり、まだコミュニティによる投票・承認は行われていません。

## クイック比較

| 機能                         | **ERC-721 (Ethereum)**             | **ARC-721 (Aleo)**                                                                                            |
|------------------------------|------------------------------------|----------------------------------------------------------------------------------------------------------------|
| **所有者の可視性**           | 常に公開                           | 選択式（秘匿レコードまたは公開マッピング）                                                                     |
| **メタデータの可視性**       | 公開されたものはすべて参照可能     | 秘匿・公開・ハイブリッド（オンチェーン/オフチェーンを組み合わせ）から選択可能                                   |
| **一意識別子**               | 連番 `tokenId uint256`             | コミットメント `field = hash(data) ⊕ edition`（外部からは判別不能）                                           |
| **転送関数**                 | `transferFrom`、`safeTransferFrom` | `transfer_private`、`transfer_private_to_public`、`transfer_public_as_signer`、`transfer_public_to_private` 等 |
| **承認機能**                 | `approve`、`setApprovalForAll`     | `approve_public`、`set_for_all_approval`                                                                       |
| **秘匿状態の再生成**         | トレースなしでは困難               | `update_edition_private` で再度難読化可能                                                                      |

## アーキテクチャ上の違い

### 状態管理

**ERC-721**
```solidity
contract ERC721 {
    string private _name;   // トークン名
    string private _symbol; // シンボル

    mapping(uint256 => address) private _owners;
    mapping(address => uint256) private _balances;
    mapping(uint256 => address) private _tokenApprovals;
}
```

**ARC-721**

以下は ARC-721 の例で、秘匿ストレージにレコード、公開ストレージにマッピングを利用しています。構造体名は `data` や `attribute` に合わせる必要はなく、複数コレクションをインポートしても衝突しないように設計できます。

```leo
record NFT {
    private owner: address,   // 公開しない限り所有者は秘匿
    private data: data,       // オンチェーンの構造体（オフチェーン JSON と同じ構造を持たせられる）
    private edition: scalar,  // コミットメントを難読化するための値
}

// 所有権が公開されるケースでも NFT データは NFTView で秘匿される
record NFTView {
    private owner: address,
    private data: data,
    private edition: scalar,
    public is_view: bool
}

struct attribute {
    trait_type: [field; 4],
    _value: [field; 4],
}

struct data {
    metadata: [field; 4], // オフチェーンメタデータ JSON の URI
    // （任意）name: [field; 4],
    // （任意）image: [field; 16],
    // （任意）attributes: [attribute; 4],
}

// 公開用ストレージ（公開に切り替えた際に利用）
struct nft_content {
    data: data,
    edition: scalar
}
mapping nft_contents: field => nft_content;

// 承認関連のデータ構造
struct Approval {
    collection_id: field,
    approver: address,
    spender: address,
}
mapping for_all_approvals: field => bool;
mapping nft_approvals:     field => field;
```

### 文字列の扱い

Leo にはネイティブな文字列型がないため、`field` 型を要素とする配列で文字列を表現します。

```leo
struct attribute {
    trait_type: [field; 4],
    _value: [field; 4],
}

struct data {
    metadata: [field; 4],
    // ほかのプロパティも同様に field 配列で表現
}
```

ポイント:
- 必要な最大文字数に応じて配列長を調整します。
- `field` 型を使うと `u128` よりも多くのデータを同じ制約で格納できます。
- JavaScript / TypeScript との変換には、ARC-721 実装の [ユーティリティ](https://github.com/zsociety-io/aleo-standard-programs/blob/main/arc721/utils/strings.js) が利用できます。

### NFT の識別子

**ERC-721** では `uint256` の `tokenId` を連番で利用します。

**ARC-721** では NFT のコミットメントを識別子として利用します。

```leo
mapping nft_commits: field => bool;

inline commit_nft(
    nft_data: data,
    nft_edition: scalar
) -> field {
    let data_hash: field = BHP256::hash_to_field(nft_data);
    let commitment: field = BHP256::commit_to_field(data_hash, nft_edition);
    return commitment;
}
```

### NFT の生成と構造

**ERC-721**
```solidity
contract MyNFT is ERC721 {
    constructor(string memory name, string memory symbol) ERC721(name, symbol) {}
    
    function mint(address to, uint256 tokenId) public {
        _mint(to, tokenId);
    }
}
```

**ARC-721**

ARC-721 では、NFT を作成するロジックを開発者が自由に設計できます。標準実装には、秘匿・公開それぞれに対応した mint 関数が含まれています。

```leo
// 秘匿 NFT を mint
async transition mint_private(...) -> (nft_records.aleo/NFT, Future)

// 秘匿 NFT を mint（finalize 中に管理者権限を公開検証）
async transition mint_private_as_public(...) -> (nft_records.aleo/NFT, Future)

// 秘匿管理者が公開 NFT を mint
async transition mint_public_as_private(...) -> (nft_records.aleo/NFTView, Future)

// 公開 NFT を mint
async transition mint_public(...) -> (nft_records.aleo/NFTView, Future)

// NFT データを公開
async transition publish_nft_content(...) -> Future
```

### 転送機構

**ERC-721**
```solidity
function transferFrom(address from, address to, uint256 tokenId) public
function safeTransferFrom(address from, address to, uint256 tokenId) public
```

**ARC-721**
```leo
transition transfer_private(...)
async transition transfer_public(...)
async transition transfer_public_as_signer(...)
async transition transfer_from_public(...)
async transition transfer_private_to_public(...)
async transition transfer_public_to_private(...)
async transition transfer_from_public_to_private(...)
```

#### 転送フローの比較

| 転送パターン              | **ERC-721**                       | **ARC-721**                                                                                     | プライバシーレベル                               |
|---------------------------|-----------------------------------|--------------------------------------------------------------------------------------------------|--------------------------------------------------|
| 秘匿 → 秘匿              | ❌ 非対応                          | `transfer_private`                                                                               | 完全秘匿                                         |
| 秘匿 → 公開              | ❌ 非対応                          | `transfer_private_to_public`                                                                     | 所有者のみ公開、データは秘匿                     |
| 公開 → 公開              | `transferFrom` / `safeTransferFrom` | `transfer_public` / `transfer_public_as_signer`                                                  | ERC-721 と同等 + 追加オプション                  |
| 公開 → 秘匿              | ❌ 非対応                          | `transfer_public_to_private` / `transfer_from_public_to_private`                                 | 所有者を秘匿化（公開状態から視認できなくなる） |
| 公開（承認経由）         | `transferFrom`（要 approve）       | `transfer_from_public` / `transfer_from_public_to_private`                                       | 承認済み委任者による公開・秘匿転送               |

### 承認システム

**ERC-721**
```solidity
function approve(address to, uint256 tokenId) public
function setApprovalForAll(address operator, bool approved) public
```

**ARC-721**
```leo
async transition set_for_all_approval(...)
async transition approve_public(...)
async transition unapprove_public(...)
```

## 設定

ARC-721 ではコレクション用の設定値を標準化することが推奨されています。

```leo
mapping general_settings: u8 => field;
```

- `0u8`: mint 可能な NFT（全エディション）の総数
- `1u8`: mint 可能な初回エディション（ユニーク NFT）の総数
- `2u8`: NFT のシンボル
- `3u8`〜`6u8`: ベース URI（複数パートに分割）
- `7u8`: 管理者アドレスのハッシュ

## エディション

ARC-721 では、各 NFT レコードに `edition` フィールド（scalar 型）が必須です。理由は次のとおりです。

1. **プライバシーのソルト**  
   `nft_commit = BHP256::commit_to_field(BHP256::hash_to_field(data), edition)` のように、NFT データのハッシュと edition を組み合わせてコミットメントを作ります。同じデータでも edition が異なればコミットメントが変わり、総当たり攻撃を防ぎます。

2. **一意性の保証**  
   edition が変わるとコミットメントも変わるため、同じデータでも別の NFT として扱えます。

3. **再難読化（リフレッシュ）**  
   所有者は新しいランダムな scalar を選んで `update_edition_private` を呼び出すことで、過去のトランザクション履歴との関連性を断ち切れます。

## コンテンツの公開と再秘匿

NFT のデータを公開する場合は `publish_nft_content` を呼び出し、以下のマッピングに平文データを書き込みます。

```leo
mapping nft_contents: field => nft_content;
```

再び秘匿化する場合は、`transfer_public_to_private` で秘匿状態に戻し、`update_edition_private` でコミットメントを更新します。

## プライバシー機能

ARC-721 は次のプライバシー機能を提供します。

1. **秘匿所有権**  
   レコードを使って所有権を秘匿できます。所有者を明かさずに所有証明を行うことが可能です。

2. **秘匿データ**  
   NFT のデータはデフォルトで秘匿され、必要に応じて `publish_nft_content` で公開できます。

3. **エディションベースの秘匿性**  
   edition によってユニーク性と秘匿性が両立され、再難読化も可能です。

4. **柔軟な可視化**  
   - `NFTView` レコード: 所有権を公開しつつデータを秘匿
   - `NFT` レコード: 所有権とデータを完全に秘匿
   - 秘匿・公開の状態を双方向に変換する関数が用意されています。
