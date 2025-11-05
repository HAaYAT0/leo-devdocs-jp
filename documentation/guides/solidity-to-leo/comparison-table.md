---
id: comparison-table
title: 比較表
description: Aleo の Leo 言語と Ethereum の Solidity の比較
sidebar_label: 比較表
---

**Leo**（Aleo）と **Solidity**（Ethereum/EVM）の主要な違いを並べて比較します。

| 機能                   | **Leo** | **Solidity** |
|------------------------|---------|--------------|
| **実行モデル**         | オフチェーン実行 + オンチェーンでの証明検証、および必要に応じてオンチェーン実行 | 完全オンチェーン実行 |
| **状態モデル**         | 公開マッピングと秘匿レコードによる[状態管理](../../concepts/fundamentals/06_public_private.md#aleo-state-storage) | コントラクトの `storage`（キー値）、一時的な `transient` ストレージ、`memory`（一時）、`calldata`（読み取り専用） |
| **プライバシー**       | 秘匿入力（メッセージ）、秘匿出力（状態変更）、秘匿ユーザーをサポート | プライバシーなし（状態・calldata はすべて公開） |
| **実行コスト**         | ストレージコスト + finalize コスト（命令に応じたオンチェーン計算） | opcode に基づくガスコスト |
| **対応する型**         | `bool`、`u8…u128`、`i8…i128`、`field`、`group`、`scalar` など。`bytes` や可変長配列、`string` は非対応 | `bool`、`(u)int8…256`、`bytes`、動的配列、`string` など |
| **ツールチェーン**     | [leo CLI](https://docs.leo-lang.org/cli/overview)、[Leo デバッガ](https://docs.leo-lang.org/testing/debugging)、[snarkVM CLI](../aleo/06_commands.md)、[IDE プラグイン](https://docs.leo-lang.org/getting_started/ide#plugins)、[DokoJS](https://github.com/venture23-aleo/doko-js)、[Amareleo](https://github.com/kaxxa123/amareleo-chain) | Hardhat、Foundry、Remix、Truffle など |
| **乱数**               | [ChaCha 乱数関数](https://docs.leo-lang.org/language/operators#random) | Chainlink VRF など外部オラクルに依存 |
| **エラー処理**         | `assert`、`assert_eq`、`assert_neq`（カスタムメッセージなし） | `assert`、`require`、`revert`（カスタムメッセージ可能） |
| **ディスパッチ方式**   | 静的ディスパッチ（[ロードマップ](https://aleo.org/roadmap/)で動的ディスパッチを予定） | 動的ディスパッチ |
| **ビルトイン関数**     | `block.height`、`self.signer`、`self.caller`、`self.address`、`network.id`、`signature::verify`、`group::GEN`、各種 BHP/Keccak/Pedersen/Poseidon/SHA3 ハッシュなど | `keccak256`、`sha256`、`ripemd160`、`ecrecover`、address.メンバー関数、`abi.encode` / `abi.decode`、block メタデータなど |
| **トークン標準**       | [ARC-21](../standards/00_token_registry.md) | ERC-20 |
| **NFT 標準**           | [ARC-721](../standards/01_nft_standards.md) | ERC-721 |
| **アップグレード性**   | [ARC-6](https://github.com/ProvableHQ/ARCs/discussions/94) によりネイティブアップグレードを予定 | プロキシパターン（Transparent、UUPS、Beacon） |
| **ブロックエクスプローラー** | [Provable Explorer (Beta)](https://beta.explorer.provable.com/)、[VXB.ai（旧 Aleo123.io）](https://vxb.ai/)、[Aleoscan](https://aleoscan.io/) など | Etherscan、Blockscout など |
