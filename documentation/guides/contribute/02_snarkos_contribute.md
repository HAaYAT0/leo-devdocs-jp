---
id: snarkos_contribute
title: SnarkOS への貢献
sidebar_label: SnarkOS への貢献
---
このチェックリストは、新機能を取り込んだ状態で Aleo ネットワークを再始動する手順をまとめたものです。円滑に進めるために、以下のステップを順番に実施してください。

## ブランチの概要
[**staging ブランチ**](https://github.com/AleoNet/snarkOS)  
- 本番ブランチへ昇格させる前の統合および初期テストを行うステージング領域です。

[**mainnet ブランチ**](https://github.com/AleoNet/snarkOS/tree/mainnet)  
- 安定性が確認された変更のみをマージする本番ブランチです。プロダクションリリースの作成に使用され、常に staging のコミットを直接ミラーします。

## ネットワークの概要
### DevNet
- 提案された変更はまず DevNet に実装され、テストされます。
- Snarkops は SnarkOS の管理や ANF の CanaryNet 参加に関するガイド・スクリプトを提供することを目的としています。

### CanaryNet（staging ブランチを運用）
- DevNet での検証を経た変更が CanaryNet にマージされ、追加のテストと検証が行われます。
- CanaryNet は、将来的に Testnet Beta や Mainnet に参加する可能性のあるバリデータをオンボーディングする場です。
- バリデータのボンディングは ANF が行います。
- snarkOS の GitHub タグ命名規則: `canary-v*`。 [タグ一覧はこちら](https://github.com/AleoNet/snarkOS/tags)。
- [CanaryNet のエクスプローラー](https://vision.snarkos.net/?blocks)

### Testnet Beta（mainnet ブランチを運用）
- 本番に近い環境でアプリケーションをテストできるオープンなネットワークで、コストは発生しません。
- バリデータのボンディングは Aleo Network Foundation が担当します。
- 当初は ANF と Provable がバリデータを運用します。
- Demox Labs と Puzzle が公開ファーセットを提供します。
- snarkOS の GitHub タグ命名規則: `testnet-beta-v*`。 [タグ一覧はこちら](https://github.com/AleoNet/snarkOS/tags)。
- [Testnet Beta のエクスプローラー](https://vision.snarkos.net/?blocks)

### Mainnet（mainnet ブランチを運用）
- 本番稼働前の最終テスト段階です。
- 新しいコードやバリデータのオンボーディングが行われる最終チェックポイントとして想定されています。
- 本番の Mainnet になる前は Testnet Beta と並行して稼働します。
- snarkOS の GitHub タグ命名規則: `mainnet-v*`。 [タグ一覧はこちら](https://github.com/AleoNet/snarkOS/tags)。
- [Mainnet のエクスプローラー](https://vision.snarkos.net/?blocks)

## SnarkOS への貢献ワークフロー

<p align="center" width="100%">
<img src={require("./images/snarkos_contribute_flow.png").default} alt="SnarkOS への貢献フロー図"></img>
</p>

**1. リポジトリをフォークする**
    - staging ブランチからリポジトリをフォークし、自分の GitHub アカウントにコピーします。
    - フォークしたリポジトリをローカルにクローンします。

```sh
git clone git@github.com:AleoNet/snarkOS.git
git remote add upstream git@github.com:AleoNet/snarkOS.git
```

**2. ベースブランチへ切り替える**
```sh
git switch staging
```

**3. 機能ブランチを作成する**
- フォークしたリポジトリの main ブランチから機能ブランチを作成します。
```sh
git checkout -b feat/my-branch
```

**4. 機能改善・修正を開発しテストする**
- フォークしたリポジトリで開発を進めます。
- `./snarkOS/devnet.sh` を実行します。
- 現在のローカルコードでテストするため、snarkOS バイナリの再インストールを許可してください。
- ネットワークが通常どおりブロックを生成すること、トランザクションを送信して安定性を確認します。
- 機能や修正に応じたテストを実行します。

**5. 修正ブランチへコードをプッシュする**
- 変更内容と目的がわかるコミットメッセージでコミットします。
- 変更をフォークへプッシュします。
```sh
git add .
git commit -m "Add detailed description of the changes"
git push
```

**6. フォークの main ブランチへ PR を送る**
- 機能ブランチからフォークの main ブランチに向けて Pull Request (PR) を作成します。
- これによりフォーク側の CI パイプラインが起動し、自動テストが実行されます。

**7. 社内コードレビュー**
- チーム内のレビュアーに PR のレビューを依頼します。
- チームメンバーがコードを確認し、必要に応じて修正を提案し、品質基準を満たせば承認します。
- レビュー時に新しい問題が発生していないか確認するため、CI パイプラインを再実行します。

**8. AleoNet/snarkOS リポジトリへ PR を送る**
- 社内レビューを通過したら、フォークの main ブランチから AleoNet/snarkOS の staging ブランチに向けて PR を作成します。
- これにより本家リポジトリの CI パイプラインが起動し、関連するテストやチェックがすべて実行されます。

**9. コアチームによるレビュー**
- AleoNet/snarkOS リポジトリでコアチームが PR をレビューします。
- CI が成功し、レビューも問題なければ PR が承認されます。
