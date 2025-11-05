---
id: provers 
title: プローバー
sidebar_label: プローバー
---

# はじめに

Aleo ブロックチェーンでは、zkSNARK の高速化や Aleo 特有のプログラム最適化を促進するための計算パズルが導入されています。これまで Aleo のテストネットワークで用いられてきたパズルは、証明全体の生成や、マルチスカラ乗算（MSM）、数論変換（NTT）といった計算量の多い処理の最適化に重点が置かれていました。しかし、これらの分野での進歩により証明生成時間に占める割合が低下したため、次のバージョンでは新たな焦点が当てられています。

今回のパズルは、シンセシス（別名ウィットネス生成）の強化に的を絞っています。Aleo プログラムの証明生成時間の大きな割合を占める重要な工程であるためです。シンセシスに集中的に取り組むことで、Aleo エコシステム固有のボトルネックを解消し、開発者とユーザー双方にとって、よりスムーズで効率的なプロセスを実現することを目指しています。この戦略的な重点化は、Aleo プラットフォームの特性に合致するだけでなく、エコシステム全体でのイノベーションや最適化も後押しします。

:::info
パズルの詳細は [仕様書](https://github.com/ProvableHQ/snarkVM/blob/staging/ledger/puzzle/epoch/docs/spec.md) を参照してください。
:::

### Role and Incentives of Provers

プローバーは誰でも稼働させることができます。プローバーは Aleo のネットワークコンセンサスには参加しませんが、特定のアルゴリズムを実行して `Puzzle` を解き、`proof_target` を満たす `Solution` を得ます。得られた `Solution` はネットワークにブロードキャストされ、コンセンサスネットワークが検証してブロックに含めると、プローバーは `puzzle_reward` をインセンティブとして受け取ります。

プローバーへの経済的インセンティブは Bitcoin の PoW に近いものの、Aleo ネットワークは勝者総取りの方式を採用していません。`Solution` が `proof_target` を満たしていればネットワークに受け入れられ、各エポックにおいてネットワーク全体に対する計算リソースの割合に比例した `puzzle_reward` が与えられます。この仕組みにより、プローバーはより公平かつ安定した報酬を得られます。`puzzle_reward` は 10 年をかけて段階的に減少し、9 年目に最小値へ到達した後は一定となる点にも注意してください。

## Goals of the Puzzle
このパズルは以下の目標を念頭に設計されています。

**困難性**: ランダムな推測よりも速く解を計算できる敵対者が存在しないことを保証します。そのためにはシステムが無記憶（ノン・アモータイズ）であり、解を計算する時間に勝率が左右されない必要があります。

**システム安全性**: 設計および実装は、攻撃者が制御する入力によってサービス妨害（DoS）、クラッシュ、任意コード実行、その他の予期せぬシステム変更が起こらないようにしなければなりません。

**一意に決定される回路**: ゼロ知識証明における opcode 回路の健全性と一意性を保ち、格安なパズル試行を許す複数の有効割り当てが存在しないようにします。

**リソース消費の一貫性**: パズルの実行時間とリソース消費を分散させ、分散の大きさや極端な振る舞いのリスクを最小化します。べき乗則よりもガウス分布に近い形を目指します。

**有用性の最大化**: 計算資源の大半が「有用な」アルゴリズムに費やされるべきです。

## Puzzle Design
### Overview
Below is a high-level description of the puzzle:

1.  プローバーがパズルのソリューションを構築し、ネットワークにブロードキャストする。

2.  バリデータはコンセンサスメカニズムを通じてソリューションとトランザクションを集約し、次のブロック用の集合を作成する。
    -   1 ブロックに含められるソリューション集合は `MAX_SOLUTIONS` を超えてはならない。
    -   バリデータは事前にソリューションを検証する必要はない。

3.  ブロック生成時、バリデータはソリューションを順番に処理し、有効なものを最大 `MAX_SOLUTIONS` 件まで受理し、それ以外は中断する。台帳状態もそれに応じて更新される。
    -   バリデータは台帳に以下を保持する。
        - `latest_epoch_hash`: 最新のエポックハッシュ。
        - `latest_proof_target`: ソリューションが受け入れられるために満たすべき最小ターゲット。
        - `cumulative_proof_target`: 前ブロック時点までに同一エポックで受理されたソリューションの proof target の累積値。
        - `coinbase_target`: proof target の期待総和であり、難易度調整の閾値として機能する。
    -   ソリューションが有効となる条件:
        -  `epoch_hash` が台帳の `latest_epoch_hash` と一致している。
        -  各ソリューションで計算される `proof_target` が `latest_proof_target` を満たしている。
        -  当該ブロックで既に受理されたソリューションが `MAX_SOLUTIONS` 未満である。
    -   有効なソリューションは、受理されたソリューション集合における `proof_target` の総和に対する自身の割合に応じて報酬を受け取る。
    -   各 `proof_target` は `cumulative_proof_target` に加算される。
    -   `next_coinbase_target` と `next_proof_target` は各ブロックで [ASERT リターゲットアルゴリズム](https://reference.cash/protocol/blockchain/proof-of-work/difficulty-adjustment-algorithm) に従って更新される。現在の `coinbase_timestamp` と `last_coinbase_timestamp` の間隔が `anchor_time` より長い場合は値を下げ、短い（または同じ）場合は維持する。
    -   更新後の `cumulative_proof_target` が `coinbase_target` の半分を超えた場合、`cumulative_proof_target` をリセットし、最新の `coinbase_target` と `coinbase_timestamp` を新たなリターゲット計算パラメータとして利用する。
    -   ブロック高が次のエポックに進んだ場合、`latest_epoch_hash` を更新する。

### Solution

`Solution` は以下の要素で構成されます。

-   `solution_id: SolutionID<N>` パズルソリューションの一意識別子。ネットワークに提出された全ソリューションを通じてユニークである必要があります。台帳に既存の solution ID が記録されている場合、そのソリューションは拒否されるため、一意性が保証されます。solution ID は `(address, epoch_hash, counter)` の 3 つ組から構成され、試行ごとの `nonce` を形成します。このノンスで RNG をシードすることで、各試行が決定的かつランダムな内部値を生成します。
-   `address: Address<N>` 現行の proof target に対してソリューションが有効だった場合に報酬を受け取るアドレス。
-   `epoch_hash: N::Blockhash` 現在のエポックのブロックハッシュ。現在のエポックに対する有効なソリューションは必ずこのハッシュを使用しなければなりません。異なるエポックハッシュを用いた場合、そのソリューションは常に無効となります。
-   `counter: u64` 同一アドレス・エポックハッシュで複数回の試行を行う際に変化させるカウンタ。
-   `target: u64`  ソリューションが満たしていると主張する proof target の値。`target` がネットワークで要求される現在の `proof_target` 以上である場合にのみソリューションは有効です。`target` が大きいほど、得られる報酬の割合も大きくなります。

### K-ary Merkle Tree

- パズルは `DEPTH` 8、`ARITY` 8 の K 分岐 Merkle 木を使用します。
- 葉およびパスのハッシュ関数は SHA-256 です。
- パズルは Merkle ルートを生成し、それをソリューション用の `proof_target` に変換します。このターゲットと `latest_proof_target` を比較し、ソリューションの有効性を判定します。

### Synthesis Puzzle

シンセシスパズルは、有効な R1CS 割り当ての合成を主要な計算要素として重視します。

シンセシスパズルにおけるソリューション構築手順は以下のとおりです。

1.  `address`、`epoch_hash`、`counter` から試行固有の `nonce`（`SolutionID`）を構築する。
2.  `epoch_hash` を用いて `EpochProgram` をサンプリングする。
3.  ノンス（`SolutionID`）をシードとする RNG で試行固有の入力セットをサンプリングする。
4.  `EpochProgram` とパズル入力に対する R1CS を合成する。
5.  R1CS の割り当てを Merkle リーフ列へ変換する。
6.  Merkle ルートを計算し、それを `proof_target` に変換する。
7.  `proof_target` が `latest_proof_target` を満たしていれば、`address`、`epoch_hash`、`counter` をソリューションとして提出し、満たさない場合は手順を繰り返す。

### プログラムのサンプリング 

各エポックで `epoch_hash` を用いて `EpochProgram` をサンプリングします。`epoch_hash` を RNG のシードとし、定められた分布に従って抽象命令の列を選択します。抽象命令は `Register Table` に基づいて具体化され、アクティブなレジスタ集合を正しく追跡しながら有効なプログラムへと変換されます。

命令は事前に定義された命令セットから重み付きでサンプリングされます。重みは出力エントロピーに基づいて設定されます。

命令セット内の各エントリは最大 `NUM_SEQUENCE_INSTRUCTIONS` 個の命令列で構成され、それぞれが以下のタプルから成ります。

-   [こちら](../../guides/aleo/04_opcodes.md)で定義されている命令
-   オペランド（以下のいずれか）
    -   `Ephemeral`
    -   `Input`
    -   `Literal`
    -   `Register`
    -   `RegisterOffset`
-   出力先
    -   `Ephemeral`
    -   `Register`

#### 出力先
`Ephemeral` 出力先はレジスタテーブルに追加されないローカルなレジスタです。同一シーケンス内で後続の命令から参照できますが、その後は利用できません。

`Register` 出力先はレジスタテーブルに保存されるレジスタです。

#### オペランド
`Register` オペランドは、レジスタテーブル内の直近の要素を使用することを意味します。

`Ephemeral` オペランドはシーケンス内でローカルに利用できるレジスタであり、同じシーケンス内の前の命令で `Ephemeral` 出力として生成されている必要があります。

`Input` オペランドはプログラムへの元の入力を参照します。

`Literal` オペランドはオペランドとして使用する定数を指定します。

`Register offsets` は、使用するレジスタが `RegisterTable` の指定されたオフセット位置（0 が最新、1 が次、その後も同様）であることを示します。

### Register Table

レジスタテーブルは、エポックプログラムの構築中にアクティブなレジスタを初期化して保持します。各 `LiteralType` に対して 2 段のスタックを用意し、以下の前文（Preamble）に従って初期化されます。

**Preamble**

```aleo
input r0 as boolean.public;
input r1 as boolean.public;
input r2 as i8.public;
input r3 as i8.public;
input r4 as i16.public;
input r5 as i16.public;
input r6 as i32.public;
input r7 as i32.public;
input r8 as i64.public;
input r9 as i64.public;
input r10 as i128.public;
input r11 as i128.public;
input r12 as field.public;
input r13 as field.public;

is.eq r1 r0 into r14;
is.eq r3 r2 into r15;
is.eq r5 r4 into r16;
is.eq r7 r6 into r17;
is.eq r9 r8 into r18;
is.eq r11 r10 into r19;

hash.psd2 r12 into r20 as u8;
hash.psd2 r13 into r21 as u8;
hash.psd2 r12 into r22 as u16;
hash.psd2 r13 into r23 as u16;
hash.psd2 r12 into r24 as u32;
hash.psd2 r13 into r25 as u32;
hash.psd2 r12 into r26 as u64;
hash.psd2 r13 into r27 as u64;
hash.psd2 r12 into r28 as u128;
hash.psd2 r13 into r29 as u128;

mul.w r3 r2 into r30;
mul.w r5 r4 into r31;
mul.w r7 r6 into r32;
mul.w r9 r8 into r33;
mul.w r11 r10 into r34;

ternary r15 r30 r2 into r35;
ternary r16 r31 r4 into r36;
ternary r17 r32 r6 into r37;
ternary r18 r33 r8 into r38;
ternary r19 r34 r10 into r39;
```

#### Instruction Variants

以下はパズルで使用される命令バリアントと、それぞれがサンプリング対象かどうかを示します。

-   `Abs`: No
-   `AbsWrapped`: Yes
-   `Add`: Yes
-   `AddWrapped`: Yes
-   `And`: Yes
-   `AssertEq`: No
-   `AssertNeq`: No
-   `BranchEq`: No
-   `BranchNeq`: No
-   `Cast`: No
-   `CastLossy`: Yes
-   `CommitBhp256`: No
-   `CommitBhp512`: No
-   `CommitBhp768`: No
-   `CommitBhp1024`: No
-   `CommitPed64`: No
-   `CommitPed128`: No
-   `Div`: Yes
-   `DivWrapped`: Yes
-   `Double`: No
-   `Gt`: Yes
-   `Gte`: Yes
-   `HashBhp256`: Yes
-   `HashBhp512`: No
-   `HashBhp768`: No
-   `HashBhp1024`: No
-   `HashKeccak256`: No
-   `HashKeccak384`: No
-   `HashKeccak512`: No
-   `HashPed64`: Yes
-   `HashPed128`: No
-   `HashPsd2`: No
-   `HashPsd4`: No
-   `HashPsd8`: No
-   `HashSha3256`: No
-   `HashSha3384`: No
-   `HashSha3512`: No
-   `Inv`: Yes
-   `IsEq`: Yes
-   `IsNeq`: Yes
-   `Lt`: Yes
-   `Lte`: Yes
-   `Mod`: Yes
-   `Mul`: Yes
-   `MulWrapped`: Yes
-   `Nand`: Yes
-   `Neg`: Yes
-   `Nor`: Yes
-   `Not`: Yes
-   `Or`: Yes
-   `Pow`: Yes
-   `PowWrapped`: Yes
-   `Rem`: No
-   `RemWrapped`: Yes
-   `Shl`: No
-   `ShlWrapped`: Yes
-   `Shr`: No
-   `ShrWrapped`: Yes
-   `Sqrt`: No
-   `Square`: Yes
-   `Sub`: No
-   `SubWrapped`: Yes
-   `Ternary`: Yes
-   `Xor`: Yes

### エポック

エポックは 360 ブロックの期間です。各エポックの開始時に、前ブロックのハッシュから新しいパズルプログラムが生成されます。このプログラムはエポック期間中すべてのプローバーで共通であり、事前計算を防ぎ公正さを保つためにエポックごとに更新されます。

ポイント:
- `epoch_hash` はエポック開始時の直前ブロック `block_hash` から決定的に生成される。
- `epoch_hash` を RNG のシードとして、新しい `EpochProgram` の命令をサンプリングする。
- エポック内のすべての `Solution` は現在の `epoch_hash` と `EpochProgram` を使用する必要がある。
- `EpochProgram` はキャッシュされ、エポック期間中は同じものが使用される。
- ターゲットの更新はエポックとは独立しており、各ブロックで `Solution` から得られる `cumulative_proof_target` に基づいて行われる。

## パズル報酬

有効なパズルソリューションが提出されると、Aleo はコインベース報酬として新しい ALEO トークンを発行します。コインベース報酬は固定比率でプローバーとバリデータに分配され、総額はネットワークパラメータと proof target に基づいて算出されます。

コインベース報酬の分配は以下のとおりです。
- **2/3 をプローバーへ**: 有効なソリューションを提出したパズル解決者に支払われます。
- **1/3 をバリデータへ**: ブロック報酬に含められ、アクティブなステーカーへ分配されます。

この分配は `puzzle_reward()` 関数で実装されています。

```rust
pub const fn puzzle_reward(coinbase_reward: u64) -> u64 {
    coinbase_reward.saturating_mul(2).saturating_div(3)
}
```

### コインベース報酬

コインベース報酬は次の式で計算されます。

```
R_coinbase = R_anchor * min(P, C_R) / C
```

ここで:
- **R_anchor**: アンカーブロック報酬（実際の proof target に基づく調整前における、そのブロックの最大コインベース報酬）
- **P**: 現在のエポックで提出されたソリューションの proof target 合計
- **C_R**: 残りのコインベースターゲット（コインベースターゲットから累積 proof target を差し引いたもの）
- **C**: 現在のコインベースターゲット

:::note
残りの proof target は以下の最小値として定義されます。
- 現在のソリューションによる proof target の合計
- 同一エポックにおけるコインベースターゲットから累積 proof target を差し引いた値

これにより、エポックのコインベースターゲットを超えて報酬が支払われることがないよう保証されます。
:::

### アンカーブロック報酬

アンカーブロック報酬は、そのブロックで得られるコインベース報酬の上限です。ブロック時間の変動を抑え、人間の時間感覚に近づけるためにタイムスタンプを用いて次の式で計算されます。

```
R_anchor = max(floor((2 * S * T_A * T_R) / (T_Y10 * (T_Y10 + 1))), R_Y9)
```

ここで:
- **S**: 初期供給量（15 億 ALEO）
- **T_A**: アンカー時間（25 秒）
- **T_R**: 10 年目までの残り秒数
- **T_Y10**: 10 年間に相当する秒数
- **R_Y9**: 9 年目の最小報酬

アンカー報酬は 9 年目までは時間とともに減少し、9 年目以降はその時点の基準値で固定されます。

### コインベースターゲット

コインベースターゲットは [ASERT](https://reference.cash/protocol/blockchain/proof-of-work/difficulty-adjustment-algorithm) リターゲットアルゴリズムを用いて計算されます。

```
T_{i+1} = T_i * 2^(INV * (D - A) / TAU)
```

ここで:
- **T_i**: 現在のターゲット
- **D**: ドリフト（実際に経過した時間）
- **A**: アンカー時間（期待される経過時間）
- **TAU**: 半減期（秒）
- **INV**: 反転フラグ（難易度を上げるときは -1、下げるときは 1）

このアルゴリズムは、現在のエポックの進行速度が期待値（半エポック時間）と比べてどれほど速いかを基にターゲットを調整します。

### ターゲットの更新

パズルの公平性とネットワーク状況への適応性を保つため、コインベースターゲットと proof target は毎ブロック更新されます。

- **コインベースターゲット:**  
  コインベースターゲットは ASERT アルゴリズムを用いて毎ブロック再計算されます。直前のコインベースターゲットやタイムスタンプ、アンカー時間、ブロック数が考慮され、次の式で求められます。  
```
next_coinbase_target = ASERT(last_coinbase_target, last_timestamp, current_timestamp, anchor_time, blocks_per_epoch)
```

- **proof target:**  
  コインベースターゲット更新後、proof target は新たなコインベースターゲットの 1/4 を基準に次のように設定されます。  
```
proof_target = (coinbase_target >> 2) + 1
```

累積 proof target がコインベースターゲットの半分以上（`cumulative_proof_target >= coinbase_target / 2`）に達した場合、以下の処理が行われます。
1. 累積 proof target を 0 にリセットする。
2. 新しい `last_coinbase_target` と `last_timestamp` を用いてコインベースターゲットを更新する。
3. 新しいコインベースターゲットに基づいて proof target を再計算する。

### プローバー個別報酬

各プローバーは、自身の貢献度に比例したパズル報酬を受け取ります。

```
Individual Reward = Puzzle Reward * (Individual Proof Target / Combined Proof Target)
```

この方式により、個別の貢献割合に応じて報酬が配分され、勝者総取りとは異なる公平な分配が実現します。

## ARC-46: パズルソリューション提出におけるステーキング
Aleo ネットワークが成長するにつれ、長期的なセキュリティ、安定性、公平な参加を確保することがエコシステム成功の鍵となります。ARC-46 は Aleo コミュニティによって[投票・可決](https://vote.aleo.org/p/46)された提案であり、プローバーのインセンティブをネットワーク全体の健全性と一致させ、ネットワークの成熟に合わせてプローバーに求められる経済的要件を段階的に引き上げることを目的としています。

本 ARC は、Aleo ネットワーク上でプローバーがエポックごとに提出できるソリューション数に応じて所定の Aleo クレジットをステークする仕組みを提案しています。ARC 発効後 2 年間にわたってステーキング要件を段階的に引き上げるプログラム的な仕組みです。

ARC-46 以前は、プローバーは参加・退出の要件なく Proof of Succinct Work に参加し、パズル報酬を得ることができました。本 ARC ではプローバーに参入要件を導入することを想定しており、退出要件も望ましいものの現時点での検討範囲には含まれていません。

Aleo ネットワークでプローバーとして活動するには、エポックごとに 1 つのソリューションを提出するために最低 `X` Aleo クレジットをステークする必要があると提案しています。つまり、エポックあたり 2 つのソリューションを提出したい場合は 2×`X` をステークしなければなりません。この仕組みにより、プールが独立したプローバーより優位に立つことがなく、ソリューション提出者全員に公平性が担保されます。また、プローバーがエポックごとの割当数を提出し終えた後は、それ以降のソリューションが拒否される想定です。

プローバーが特定のバリデータにステークしなければならないという要件はありません。コンセンサスにおいて、ソリューションを提出するプローバーが Aleo ネットワーク上のいずれかのバリデータに十分なステークを結び付けていることをプロトコルが強制します。

### 主要目的
- **Sybil 耐性** — エポックごとの提出数とステーク量を連動させることで、プローバーがオンチェーンで新しいアイデンティティを作成してこの新しい暗号経済的仕組みを迂回することを防ぎます。さらに、この仕組みにより、不正なソリューションでネットワークを氾濫させようとする悪意ある攻撃者（シビル攻撃）に高いコストを課します。
- **BFT セキュリティ** — 提案されたスケジュールに従ってプローバーが段階的にステーク参加を増やすことで、2 年以内に Aleo ネットワークの可用性閾値を達成するよう促します。これにより、プローバーが基盤となるネットワークセキュリティへ貢献することが保証されます。
- **経済成長** — ステーキング要件の増加を透明なスケジュールで進めることで、突発的な経済的影響やショックを招くことなく、ネットワークの価値とセキュリティ需要の成長に対応できます。プローバーがステーキングに貢献することで、獲得した報酬がネットワークそのものに再投資される仕組みを整えます。

### 仕様
ステーキング要件は 2 年間にわたり四半期ごとに段階的に引き上げられます。すなわち、エポックごとに 1 件のソリューションを提出するために必要なステーク量が四半期ごとに増加します。

以下は、プローバーが Aleo ネットワークで活動を続けるための段階的ステーキング要件のスケジュールです。

| Effective Date         | Quarter | Stake Required Per Solution Per Epoch |
|-----------------------|---------|---------------------------------------|
| Activation (Month 0)  | Q0      | 100,000                               |
| Month 3               | Q1      | 250,000                               |
| Month 6               | Q2      | 500,000                               |
| Month 9               | Q3      | 750,000                               |
| Month 12              | Q4      | 1,000,000                             |
| Month 15              | Q5      | 1,250,000                             |
| Month 18              | Q6      | 1,500,000                             |
| Month 21              | Q7      | 2,000,000                             |
| Month 24              | Q8      | 2,500,000                             |

### 利点

この ARC は主に **バリデータ**、**プローバー**、そして Aleo クレジットの**長期保有者**の 3 者に恩恵をもたらします。

**バリデータ**は今後 2 年間でステーキング要件が実施されるにつれ、プローバーからの委任が増え、参加度と報酬が向上する可能性があります。**プローバー**は、ステーキングを通じて獲得トークンに追加利回りを得られ、ネットワークのセキュリティと長期的成長とインセンティブが一層整合します。**長期保有者**は、Aleo クレジットがネットワーク保護のために積極的に活用され適切に委任されていることを確認でき、ネットワークの健全性に対する信頼が高まります。

## 今後の計画
### ARC-43: パズルを完全な SNARK へ拡張

ARC-43 は、現在のシンセシス中心のパズルを完全な SNARK（Succinct Non-Interactive Argument of Knowledge）へ拡張する提案です。この拡張は現行のボトルネックに対処し、最新ハードウェアの進歩を活用することを目指しています。提案全文は[こちら](https://github.com/ProvableHQ/ARCs/discussions/77)から確認できます。

**主な変更点:**
- **命令数の増加**: 現在のコンセンサス検証の制限を大幅に超える規模へ拡張
- **命令セットの拡張**: より複雑な処理が可能な命令を追加し、オペランドも大型化
- **zkSNARK 検証**: パズル証明の簡潔な検証を導入し、ブロック検証時間を短縮

**利点:**
- 完全 SNARK の高速化に向けた専用ハードウェア開発へのインセンティブを付与
- ブロック検証性能を大幅に向上
- 命令セット拡張によりパズルの複雑性とセキュリティを強化
- 最新の GPU / FPGA による高速化技術を活用

**技術的アプローチ:**
- 既存の証明システムと楕円曲線に基づき、技術的リスクを最小化
- 変更不可性の維持とグラインド攻撃の防止のため zkSNARK ではなく SNARK へ拡張
- 段階的な実装でハードウェアのアップグレードを徐々に進められるよう設計
