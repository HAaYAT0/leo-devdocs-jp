---
id: staking 
title: ステーキング
sidebar_label: ステーキング
---
## ステーキングとは？

**ステーキング**は、コンセンサスメカニズムとして **Proof of Stake (PoS)** を採用する分散型ネットワークを保護する経済的なセキュリティ手段です。**Proof of Work (PoW)** が新しいブロックを追加するため暗号パズルの解法競争を行うのに対し、PoS では各ブロックごとにバリデータをランダムに選出してトランザクションの確認とブロックデータの検証を行います。これにより競争的なマイニングの代わりに、ステーク量に基づくランダムな選出プロセスが導入され、バリデータは計算能力ではなく参加度に応じて報酬を得ます。

バリデータとしてコンセンサスに参加するには、**最低 10,000,000 AC のステークが必要**です。これにより、大きな投資を行うバリデータがネットワークの経済的安全性を担保します。ただし、誰もがこの閾値を単独で満たせるわけではありません。ステーキングではユーザーが自分の AC を委任してバリデータを支援できるため、コンセンサスプロセスに積極的に関与しつつ報酬を分配してもらえます。

## ステーカーになるには？

ステーカーは、Aleo クレジット（AC）をロックまたは委任して、バリデータがネットワークのコンセンサスに参加できるよう支援する個人または組織です。その対価として、自身がステークした AC の量に応じた報酬を受け取り、ネットワークセキュリティへの貢献が評価されます。バリデータノードを自分で運用しなくてもコンセンサスプロセスに参加し、ステーキング報酬を得られる仕組みです。ステークをバリデータに委任することから、ステーカーは「デリゲーター」と呼ばれることもあります。

AC を保有している人であれば誰でもステーカーになれます。**[ネイティブステーキング](#native-staking) は 10,000 AC から利用可能**で、10,000 AC 未満の保有者向けに [リキッドステーキング](#liquid-staking) の選択肢も提供されています。ステーキングを始めるには、Aleo エコシステムが開発したステーキングプラットフォームや対応ウォレットなどの各種ツールを利用できます。

:::warning[disclaimer]
コミュニティツールは Aleo エコシステムに属する第三者によって開発されています。Aleo はこれらのツールを推奨・審査・監査しておらず、利用はユーザー自身の責任において行ってください。
:::

## Native Staking

ネイティブステーキングでは、トークン保有者がサードパーティのプログラムやカストディサービスに頼ることなく、オンチェーンで Aleo クレジット（AC）を直接ステークできます。ネイティブステーキングの機能は、Aleo クレジットを管理する `credits.aleo` プログラムに実装されています。`credits.aleo` プログラムでは次のステーキングルールが適用されます。

- **バリデータの自己ボンド最低額**（100 クレジット以上）
- **ステーカーの委任最低額**（10,000 クレジット以上）
- **総ステークが 1,000 万クレジット未満になったバリデータの自動除外**
- **アンボンド後、再度引き出せるまで 360 ブロックのタイムロック**

Aleo Instructions によるソースコードは[こちら](https://github.com/ProvableHQ/snarkVM/blob/staging/synthesizer/program/src/resources/credits.aleo)で確認できます。

### 関数一覧

| 関数 | 呼び出し元 | 目的 |
|----------|---------------|---------|
| `bond_validator` | バリデータ（自己ボンド） | バリデータを作成または自己ボンド額を増資し、手数料率と出金先アドレスを設定する |
| `bond_public` | ステーカー | 新規ステークを受け付けている既存バリデータにステーク（委任）する |
| `unbond_public` | バリデータまたはステーカー | ボンド済みの一部または全額についてアンボンドタイマーを開始する |
| `claim_unbond_public` | 誰でも | タイマー満了後、アンボンドされた額をステーカーの出金先アドレスへ送金する |

### ステーキング関連マッピング

Aleo のステーキングシステムでは、バリデータとデリゲーターの状態を追跡するために複数のマッピングを利用します。

#### `committee`
アクティブなバリデータ集合とその状態を保持します。
- バリデータが新規ステーカーを受け付けているか (`is_open`)
- バリデータが報酬から控除する手数料率（0〜100）

```aleo
/// The `committee` mapping contains the active validator set and their corresponding stake.
mapping committee:
    // The key represents the address of the validator.
    key as address.public;
    // The value represents the committee state of the validator.
    value as committee_state.public;

// The `committee_state` struct tracks the total stake of the validator, and whether they are open to new stakers.
struct committee_state:
    // The boolean flag indicating if the validator is open to new stakers.
    is_open as boolean;
    // The percentage amount (from 0 to 100, inclusive) of rewards that retained by the validator.
    commission as u8;
```

#### `delegated`
各バリデータアドレスにボンドされた microcredit の総額（自己ボンドと委任分の両方）を追跡します。このマッピングによって、バリデータが委員会に参加するための最低条件である 1,000 万クレジットを満たしているかどうかを判断します。

```aleo
// The `delegated` mapping tracks the total amount of microcredits that are prebonded and bonded to validator addresses.
// Note: The mapping includes both prebonded and bonded microcredits. However, it does not contain unbonding microcredits.
mapping delegated:
    // The key represents the address of the validator.
    key as address.public;
    // The value represents the amount of microcredits bonded to the validator, by the validator and its delegators.
    value as u64.public;
```

#### `metadata`
Stores global staking statistics:
- `metadata[aleo1qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq3ljyzc]` - Number of active committee members
- `metadata[aleo1qgqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqanmpl0]` - Number of delegators (capped at 100,000)

```aleo
/// The `metadata` mapping stores:
///   - The number of members in the committee.
///   - The number of delegators.
mapping metadata:
    // The key represents the index at which the count is stored.
    //    - This address (aleo1qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq3ljyzc) stores the number of **members** in the committee.
    //    - This address (aleo1qgqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqanmpl0) stores the number of **delegators**.
    key as address.public;
    // The value represents the count.
    value as u32.public;
```

#### `bonded`
Maps each staker's address to their bond state, which includes:
- The validator address they're bonded to
- The amount of microcredits currently bonded

```aleo
// The `bonded` mapping represents the amount of microcredits that are currently bonded.
mapping bonded:
    // The key represents the address of the staker, which includes the validators and their delegators.
    key as address.public;
    // The value represents the bond state.
    value as bond_state.public;

// The `bond_state` struct tracks the amount of microcredits that are currently bonded to the specified validator.
struct bond_state:
    // The address of the validator.
    validator as address;
    // The amount of microcredits that are currently bonded to the specified validator.
    microcredits as u64;
```

#### `unbonding`
アンボンド処理を開始したステーカーを管理します。
- 現在アンボンド中の microcredit の数量
- アンボンド完了予定のブロック高（開始から 360 ブロック）

```aleo
// The `unbonding` mapping contains a set of stakers with their unbonding microcredits and unlock height.
mapping unbonding:
    // The key represents the address of the staker, which includes the validators and their delegators.
    key as address.public;
    // The value represents the unbond state.
    value as unbond_state.public;

// The `unbond_state` struct tracks the microcredits that are currently unbonding, along with the unlock height.
struct unbond_state:
    // The amount of microcredits that are currently unbonding.
    microcredits as u64;
    // The block height at which the unbonding will be complete, and can be claimed.
    height as u32;
```

#### `withdraw`
各ステーカーのアドレスを出金先アドレスに関連付け、報酬やアンボンド済みの資金が送られる先を管理します。

```aleo
// The `withdraw` mapping contains the staking address and their corresponding withdrawal address.
mapping withdraw:
    // The key represents the staking address of the owner.
    key as address.public;
    // The value represents the withdrawal address of the owner.
    value as address.public;
```

### バリデータになる／自己ボンドを増資する

バリデータとして参加する、または自己ボンド額を追加する場合は `bond_validator` 関数をバリデータアドレスで実行します。
```bash
leo execute credits.aleo/bond_validator <withdrawal_address> <amount> <commission_percentage> --network mainnet --endpoint https://api.explorer.provable.com/v1 --broadcast 
```

```aleo
function bond_validator:
    // Input the withdrawal address.
    input r0 as address.public;
    // Input the amount of microcredits to bond.
    input r1 as u64.public;
    // Input the commission percentage.
    input r2 as u8.public;
```

* **withdrawal_address** – 報酬とアンボンド額を受け取るための別アドレス。バリデータアドレスとは異なる必要があります。
* **amount_in_microcredits** – 最低 1 AC。委員会入りには自己ボンドと委任を合わせて 1,000 万 AC 以上が必要です。
* **commission_percentage** – バリデータが報酬から控除する割合を表す 0〜100 の整数。

オンチェーンで行われる処理:

1. 指定額がバリデータの公開 `account` 残高から差し引かれます。
2. `bonded[validator]` に自己ボンド額が書き込まれ（または更新され）ます。
3. `delegated[validator]` が更新されます（自己ボンドも総委任額に含まれます）。
4. 総委任額が 1,000 万 AC 以上で、まだ `committee` に属していなければ委員会へ追加され、`metadata[committee_size]` が増加します（ネットワークの最大委員会サイズにより制限され、プロトコルアップグレードで変更される可能性があります）。

### バリデータへの委任

バリデータを運用していなくても、Aleo クレジットをバリデータに委任することでネットワークに参加し、そのパフォーマンスに応じた報酬を得られます。

#### バリデータの選び方

委任する前に、候補となるバリデータのオンチェーン統計を確認しましょう。[API エンドポイント](https://docs.explorer.provable.com/docs/api-reference/vz155069d5xy3-introduction) やブロックエクスプローラを利用して `committee`、`delegated`、`bonded` マッピングを照会し、以下を把握できます。

* **総ステーク** – バリデータにどれだけの AC が委任されているか。
* **自己ボンド** – バリデータ自身のステーク（最低 100 AC が必要）。
* **手数料** – バリデータが保持する報酬の割合（0〜100%）。
* **受付状態** – `is_open = true` のバリデータのみが新しいステークを受け付けます。

健全なバリデータの目安:

* 総ステークが 1,000 万 AC 以上（そうでなければ委員会に参加できず、ブロック報酬も得られません）。
* 安定した稼働率・パフォーマンス（エクスプローラで確認しましょう）。

#### 委任の手順

1. 委任したい金額を決める（10,000 AC 以上）。
:::warning[important]
Must keep minimum bonded balance of ≥ 10 000 ALEO bonded at all times.
:::
2. 公開アカウント残高に十分な額があることを確認する。
3. 出金先アドレスを選ぶ（現在の署名者アドレスを再利用しても別アドレスを指定しても構いません）。
4. [Leo CLI](https://docs.leo-lang.org/cli/execute) を使って `credits.aleo` の `bond_public` 関数を実行する。

```bash
leo execute credits.aleo/bond_public <validator_address> <withdrawal_address> <amount> --network mainnet --endpoint https://api.explorer.provable.com/v1 --broadcast 
```

```aleo
function bond_public:
    // Input the validator's address.
    input r0 as address.public;
    // Input the withdrawal address.
    input r1 as address.public;
    // Input the amount of microcredits to bond.
    input r2 as u64.public;
```

:::tip
[Staking.xyz](https://www.staking.xyz/stake?network=aleo&currency=ALEO&stakingType=native) also provides an interface to `bond_public`. 
:::

トランザクションが確定すると、ステーク量に応じてバリデータのブロック報酬が分配され始めます。ボンドはいつでも、任意の金額で追加できます。

オンチェーンでの影響:

1. 指定額がステーカーの `account` から控除されます。
2. `bonded[delegator]`（ステーカー → バリデータのマッピング）が更新されます。
3. `delegated[validator]` に金額が加算されます。
4. グローバルなステーカー数（`metadata[delegator_count]`、上限 100,000）が増加します。

:::warning[important]
The validator must be open (`committee_state.is_open = true`) and not in the unbonding (exiting) process.
:::
:::info
1 つのアドレスが同時にボンドできるバリデータは 1 つだけです。既存のボンドが完全にアンボンドされ、AC を回収した後でなければ別のバリデータにボンドし直せません。あるいは新しいアドレスを使用してください。
:::

### ステークの引き出し

ステーカーは、残りのボンド残高が常に 10,000 AC 以上である限り、いつでもボンド済みの AC を引き出せます。引き出し後の残高が 10,000 AC を下回ると、即座に全額アンボンドが発動します。

ステークを引き出すには、まず `unbond_public` 関数を呼び出してアンボンド処理を開始する必要があります。この関数でステーカーアドレスとアンボンドする microcredit の量を指定すると、部分的あるいは全額のアンボンドが可能になります。[Leo CLI](https://docs.leo-lang.org/cli/execute) から次のように実行できます。
```bash
leo execute credits.aleo/unbond_public <staker_address> <amount> --network mainnet --endpoint https://api.explorer.provable.com/v1 --broadcast 
```

```aleo
function unbond_public:
    // Input the staker's address.
    input r0 as address.public;
    // Input the amount of microcredits to unbond.
    input r1 as u64.public;
```

この関数はステーカーの出金先アドレス、またはバリデータの出金先アドレスから実行できます。

* ステーカーは部分的なアンボンドと全額アンボンドのどちらも可能です。残高が 10,000 AC を下回る場合、全額がアンボンドされ、ステーカーのエントリは削除されます。
* バリデータは自身をアンボンドしたり、ステーカーを強制的にアンボンドさせたりできます。
* アンボンドによってバリデータの総ステークが 1,000 万 AC 未満、または自己ボンドが 100 AC 未満になると、バリデータは委員会から外されます。
* 指定額は `unbonding[staker]` に格納され、360 ブロックのクールダウンが開始されます。

#### アンボンド完了分の請求

アンボンド済みのステークを引き出すには、360 ブロックのクールダウンが経過していることを確認し、[Leo CLI](https://docs.leo-lang.org/cli/execute) で以下のコマンドを実行します。

```bash
leo execute credits.aleo/claim_unbond_public <staker_address> --network mainnet --endpoint https://api.explorer.provable.com/v1 --broadcast
```

```aleo
function claim_unbond_public:
    // Input the staker's address.
    input r0 as address.public;
```

* `block.height ≥ unbonding[staker].height` を満たせば誰でも実行できます。
* アンボンドされた額はステーカーの出金先アドレス（`account[withdrawal]`）へ送金されます。
* 対応する `unbonding` エントリは削除されます。残りのボンドがない場合は出金先アドレスも削除されます。


## リキッドステーキング

リキッドステーキングは、Aleo クレジット（AC）をステークしながら流動性を維持できる手法です。AC をロックする代わりに、ステークポジションを表すリキッドステーキングトークン（stToken）を受け取ります。これにより、ステーキングに参加しつつ、トークンを他の DeFi 活動に活用することができます。リキッドステーキングプラットフォームを利用すれば 10,000 AC 未満でもステーキングが可能になり、より多くのユーザーが参加しやすくなります。

現在利用可能なリキッドステーキングプラットフォーム:
- [Beta Staking](https://betastaking.com/)
- [Staking.xyz](https://www.staking.xyz/)
- [PONDO](https://www.pondo.xyz/)
- [LSP Finance](https://www.lsp.finance/)
