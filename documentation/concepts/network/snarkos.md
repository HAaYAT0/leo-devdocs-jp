---
id: snarkos 
title: SnarkOS
sidebar_label: SnarkOS
---

SnarkOS はゼロ知識アプリケーション向けの分散型オペレーティングシステムです。このコードが Aleo ネットワークの中核を成し、トランザクションを検証しつつ、アプリケーションの暗号化された状態を公開検証可能な形で保存します。

ネットワーククライアントは SnarkVM によってオフチェーンで計算されたトランザクションを検証し、すべての SnarkOS ノードがコンセンサスに到達できるようにするとともに、Aleo の分散型台帳に秘匿データと公開データの両方を保存します。

## Aleo ノードのオプション
Aleo ノードは 3 つのモードで稼働させることができます。

<!-- ### [Client](../network/) -->


- [Client](../network/client.md)
- [Prover](../network/provers.md)
- [Validator](../network/validators.md)


### JWT 認証
SnarkOS は JWT 認証のために実行時パラメータを受け付けます。

- `--jwt-secret`: トークンの生成と検証に使用するオプションの Base64 エンコード済み JWT シークレット
- `--jwt-timestamp`: トークンの有効性を判断するためのオプションの UNIX タイムスタンプ

#### 保護されたエンドポイント
以下のエンドポイントにアクセスするには有効な JWT 認証が必要です。

- `/{network}/node/address` - ノードアドレス情報を取得
- `/{network}/program/{id}/mapping/{name}` - プログラムのマッピングデータへアクセス
- `/{network}/db_backup?path={path}` - データベースのバックアップ操作

## SnarkOS を使うのは誰か
Aleo に関わるすべてのユーザーが、トランザクションの送信やデータ取得のために SnarkOS を利用します。
