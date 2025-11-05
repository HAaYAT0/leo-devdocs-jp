---
id: token-standard-difference
title: トークン標準の違い
sidebar_label: トークン標準の違い
---

## はじめに

[トークンレジストリプログラム (ARC-21)](../standards/00_token_registry.md) は、Aleo ネットワーク上でトークンや DeFi プログラムが相互運用するための標準的なハブです。新しいトークンと DeFi プログラムを再デプロイせずに連携させられるように設計されています。Aleo では、import するプログラムを事前にデプロイしておく必要があり、動的なクロスプログラム呼び出しも現時点ではサポートされていません。そのため、構成可能性を確保する仕組みとしてトークンレジストリが採用されました。なお、動的ディスパッチ機能は現在開発中であり、将来はより柔軟なプログラム間連携が可能になる予定です。

## クイック比較

| 項目                 | ERC-20                         | ARC-21 Token Registry                     |
|----------------------|--------------------------------|-------------------------------------------|
| トークンの作成       | コントラクトをデプロイ         | レジストリに登録                          |
| 状態管理             | 各コントラクトごとに管理       | レジストリで一元管理                      |
| 転送方法             | コントラクトに直接呼び出し     | レジストリの関数を呼び出し                |
| プライバシー         | なし                            | 秘匿転送を標準サポート                    |
| 承認フロー           | 必須                            | 任意（必要な場合のみ利用）                |
| トークンメタデータ   | 各コントラクトに格納           | レジストリに格納                          |
| 供給管理             | 各コントラクトで個別に管理     | レジストリで集中管理                      |

## アーキテクチャの違い

### プログラム構造

**ERC-20**
- トークンごとに個別のスマートコントラクトをデプロイ。
- トークン転送には承認フローが必要。
- 新しいトークンを発行するたびにコントラクトを作成する必要がある。

**ARC-21 トークンレジストリ**
- 単一のレジストリプログラムがすべてのトークンを管理。
- 基本的な転送では承認フローが不要。
- 新しいトークンは登録のみで利用でき、再デプロイは不要。

### 状態管理

**ERC-20**
- 状態は各トークンコントラクト内部に保存。
- 状態アクセスもコントラクト内で完結。
- すべての状態が公開情報。

**ARC-21 トークンレジストリ**
- 状態はレジストリプログラムで一元管理。
- API 経由、または async 関数内の `mappings::get()` で状態を取得。
- 公開マッピングと秘匿レコードの両方を利用可能。

## 機能面の違い

### トークン作成

**ERC-20**
```solidity
contract MyToken is ERC20 {
    constructor(string memory name, string memory symbol) ERC20(name, symbol) {
        _mint(msg.sender, 1000000 * 10 ** decimals());
    }
}
```

**ARC-21 トークンレジストリ**
```leo
register_token(
    token_id: field,
    name: u128,
    symbol: u128,
    decimals: u8,
    max_supply: u128,
    external_authorization_required: bool,
    external_authorization_party: address
)
```

#### 外部承認

ARC-21 では任意で外部承認機構を設定できます。指定された主体（多くの場合プログラム）が、一定時間のみ有効な承認を付与してトークン使用を管理する仕組みです。ベスティングや支払い上限、コンプライアンス要件など追加条件を課す際に利用できます。承認主体は `update_token_management` で後から変更できます。

`prehook_public` と `prehook_private` は、`external_authorization_party` が条件達成を検証したうえでトークン転送を許可するために利用する関数です。

### トークン転送

**ERC-20**
```solidity
function transfer(address to, uint256 amount) public returns (bool)
function transferFrom(address from, address to, uint256 amount) public returns (bool)
```

**ARC-21 トークンレジストリ**
```leo
async transition transfer_public(...)
async transition transfer_public_as_signer(...)
async transition transfer_private(...)
async transition transfer_from_public(...)
async transition transfer_public_to_private(...)
async transition transfer_from_public_to_private(...)
async transition transfer_private_to_public(...)
```

#### プライバシー機能

ARC-21 トークンレジストリには、以下のようなプライバシー機能があります。

1. **秘匿転送**: `transfer_private` を利用することで、トークンを秘匿したまま送付できます。
2. **公開 → 秘匿の変換**: `transfer_public_to_private` で公開残高を秘匿トークンに変換。
3. **秘匿 → 公開の変換**: `transfer_private_to_public` で秘匿トークンを公開残高に戻す。

### トークンのミント

**ERC-20**
```solidity
function mint(address to, uint256 amount) public onlyOwner {
    _mint(to, amount);
}
```

**ARC-21 トークンレジストリ**
```leo
async transition mint_public(...)
async transition mint_private(...)
```

ARC-21 では公開・秘匿いずれのミントも可能です。`set_role` や `remove_role` でロールを管理し、`MINTER_ROLE` や `SUPPLY_MANAGER_ROLE` を持つアドレスのみがミントできます（管理者以外の場合）。

### トークンのバーン

**ERC-20**
```solidity
function burn(uint256 amount) public {
    _burn(msg.sender, amount);
}
```

**ARC-21 トークンレジストリ**
```leo
async transition burn_public(...)
async transition burn_private(...)
```

バーン権限もロールで制御され、`BURNER_ROLE` または `SUPPLY_MANAGER_ROLE` が必要です。

### トークンの承認

**ERC-20**
```solidity
function approve(address spender, uint256 amount) public returns (bool)
function allowance(address owner, address spender) public view returns (uint256)
```

**ARC-21 トークンレジストリ**
```leo
async transition approve_public(...)
async transition unapprove_public(...)
```

### 残高・供給量の取得

**ERC-20**
```solidity
function balanceOf(address account) public view returns (uint256)
function totalSupply() public view returns (uint256)
```

**ARC-21 トークンレジストリ**
```bash
# RPC エンドポイントで取得
GET /{network}/program/token_registry.aleo/mapping/balances/{token_id}_{account}
GET /{network}/program/token_registry.aleo/mapping/registered_tokens/{token_id}
```

ARC-21 では、マッピングを参照する RPC エンドポイントから残高や供給量を取得します。残高は `balances` マッピングに `token_id` と `account` の複合キーで保存され、供給量は `registered_tokens` マッピングに保存されます。

## まとめと今後

ARC-21 トークンレジストリは、ERC-20 と比べて集中管理された機能とプライバシー機能を提供します。ERC-20 のようにトークンごとにコントラクトを用意する必要はなく、レジストリへの登録だけでトークンが利用できます。これにより DeFi アプリケーションの開発が容易になり、Aleo 上のトークン同士で高い互換性を確保できます。

将来的に動的ディスパッチが実装されれば、ARC-20 標準が導入され、Ethereum 開発者にとってより馴染みのある形で、個別のトークンプログラムを実行時に呼び出せるようになる見込みです。
