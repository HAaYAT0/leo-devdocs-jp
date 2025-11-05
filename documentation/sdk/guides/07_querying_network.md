---
id: querying_network
title: Aleo ネットワークへのクエリ
sidebar_label: ネットワークへのクエリ
---

Aleo ネットワークとの通信は `AleoNetworkClient` クラスを通じて行います。このクラスは Aleo ネットワークのノードからデータを取得したり、トランザクションを送信したりするためのメソッドを提供します。

## ブロック
ブロックは Aleo のバリデーターによって生成され、状態変化の正準な単位を表します。ブロックにはすべてのトランザクション、Aleo パズルの解、ブロックのメタデータ（ブロック高や現在のコインベースターゲットなど）、およびマークルルートやバリデーター署名といった暗号情報が含まれます。`AleoNetworkClient` を使うとブロックを取得し、JSON 形式で受け取れます。返される JSON はブロックの TypeScript インターフェースと同じ構造です。

次の TypeScript スニペットでは、ブロックから主要な情報を抽出する方法を示します。

```typescript
import { AleoNetworkClient } from "@provablehq/sdk"
const networkClient = new AleoNetworkClient("https://api.explorer.provable.com/v1");

const block = await networkClient.getBlock(1);

// ブロックのメタデータを取得します
const blockHeight = block.header.metadata.height;
const blockHash = block.block_hash;
const blockTimestamp = block.header.metadata.timestamp;
const coinbaseTarget = block.header.metadata.coinbase_target;
const proofTarget = block.header.metadata.proof_target;

// ブロックに含まれるトランザクションを取得します
const transactions = block.transactions;

// ブロック内のトランザクションを走査します
for (let i = 0; i < transactions.length; i++) {
    const transaction = transactions[i];
    // トランザクション ID を取得します
    const transactionID = transaction.id;
    
    // トランザクションのタイプを取得します
    const transactionType = transaction.type;
    if (transactionType === "execute") {
        // 実行情報を取得します
        const execution = transaction.transaction.execution;
        // 実行に含まれるトランジションを取得します
        const transitions = execution.transitions;
        for (let j = 0; j < transitions.length; j++) {
            const transition = transitions[j];
            // 個々のトランジションの入力を取得します
            const transitionInputs = transition.inputs;
            // 個々のトランジションの出力を取得します
            const transitionOutputs = transition.outputs;
        }
    } else if (transactionType === "deploy") {
        // トランザクションのデプロイデータを取得します
        const deploymentData = transaction.transaction.deployment;
        // プログラム名を取得します
        const programName = deploymentData.program;
        // プログラムの検証鍵を取得します
        const verifyingKeys = deploymentData.verifying_keys;
    }
    
    // ブロック報酬とパズル報酬を取得します（ステーキングとマイニング報酬の計算に重要です）
    const ratificationsJSON = block.ratifications;
    const blockReward = ratificationsJSON[0].amount;
    const puzzleReward = ratificationsJSON[1].amount;
    
    // ブロックのパズル解を取得します
    const solutions = block.solutions
}
```

## トランザクションとトランジション
ブロックには関連情報のほとんどが含まれますが、サイズが大きく、アプリにとって不要なデータまで含む場合があります。アプリが特定のトランザクションだけを参照したい場合は、`AleoNetworkClient` のメソッドで一意の ID を指定してトランザクションを直接照会できます。

トランザクションには、新しいプログラムのデプロイまたは既存プログラムの実行が含まれ、これらがチェーン状態を変更します。各実行トランザクションには 1 つ以上のトランジションが含まれ、実行された関数の入力と出力（生成されたレコードやファイナライズを持つ関数が作成した Future など）が列挙されます。

アプリに関連するプログラム関数が実行された後、そのトランザクションオブジェクトを照会して可視化・保存したり、トランザクションで生じた状態変化をアプリ内で利用したりすると便利です。各トランザクションには `bech32` プレフィックス `at` が付いた一意の ID があります。トランザクションを `ProgramManager` の deploy / execute メソッドで送信した場合や、`AleoNetworkClient` の `submitTransaction()` メソッドで手動送信した場合、このトランザクション ID が `string` として返されます。以後はこの ID を使って Aleo ネットワークからトランザクションデータを取得できます。

```typescript
import { AleoNetworkClient, Transition } from '@provablehq/sdk';
const networkClient = new AleoNetworkClient("https://api.explorer.provable.com/v1");

// トランザクション ID から取得し、JSON 表現から入力と出力を取り出します
let jsonRecords = [];
const transactionJSON = await networkClient.getTransaction('at1...');
const transitions = transactionJSON["execution"]["transitions"];
for (let i = 0; i < transitions.length; i++) {
    const transition = transitions[i];
    // 個々のトランジションに含まれるレコードを取得します
    const transitionRecords = transition["records"];
    // 個々のトランジションの入力を取得します
    const transitionInputs = transition["inputs"];
    // 個々のトランジションの出力を取得します
    const transitionOutputs = transition["outputs"];
    // トランザクション内のレコードを収集します
    jsonRecords.push(transitionRecords);
}
```

`AleoNetworkClient` には、トランザクション情報を WASM オブジェクトとして取得するメソッドも用意されています。WASM 表現では生の snarkVM オブジェクトを返すため、JSON をパースしなくても入力・出力・レコードなどを取り出す便利なメソッドが利用できます。どの表現を使うかは、開発者が扱いやすい方を選択してください。

```typescript
import { AleoNetworkClient, Transition } from '@provablehq/sdk';
const networkClient = new AleoNetworkClient("https://api.explorer.provable.com/v1");

// トランザクション ID から取得し、Wasm 表現から入力と出力を取り出します
const transactionWasm = await networkClient.getTransactionObject(`at1...`);
const transitionsWasm = transactionWasm.transitions();
for (let i = 0; i < transitionsWasm.length; i++) {
    const transition = transitionsWasm[i];
    // 個々のトランジションのレコードを取得します
    const transitionRecords = transition.records();
    // 個々のトランジションの入力を取得します
    const transitionInputs = transition.inputs();
    // 個々のトランジションの出力を取得します
    const transitionOutputs = transition.outputs();
}

// トランザクション内に存在するすべてのレコードを取得します
const transactionRecords = transactionWasm.records();
```

## プログラム
アプリでは、プログラムの構造や内部データを参照する必要がある場面が頻繁にあります。AleoNetworkClient には、Aleo ネットワーク上のプログラムを照会・調査するためのメソッドがそろっています。

### プログラムの公開状態を取得する
プログラムの公開状態はマッピングに保存されています。マッピングには公開残高、バリデーターのステーク量、トークン情報などが含まれることが多く、ブロックごとに更新される場合があります。任意のブロック時点の情報を AleoNetworkClient で取得できます。

#### マッピングの照会
プログラム内のマッピング一覧は、AleoNetworkClient の `getProgramMappingNames` メソッドで取得します。

```typescript
import { AleoNetworkClient } from '@provablehq/sdk';
import { deepStrictEqual } from 'assert';
const networkClient = new AleoNetworkClient("https://api.explorer.provable.com/v1");

// credits.aleo に存在するマッピング一覧を取得します
const expectedMappings = [
    "committee",
    "delegated",
    "metadata",
    "bonded",
    "unbonding",
    "account",
    "withdraw",
    "pool"
];

const creditsMappings = await networkClient.getProgramMappingNames("credits.aleo");
deepStrictEqual(creditsMappings, expectedMappings);
```

マッピングの値を取得するには、キーの型を把握しておく必要があります。型が分かっていれば `getMappingValue()` メソッドを使用できます。

```typescript
import { AleoNetworkClient } from '@provablehq/sdk';
import { strictEqual } from 'assert';
const networkClient = new AleoNetworkClient("https://api.explorer.provable.com/v1");

// credits.aleo の `account` マッピングからアカウント残高を取得します
const account = await networkClient.getProgramMappingValue("credits.aleo", "account", "aleo1q3vx8pet0h7739hx5xlekfxh9kus6qdlxhx9qdkxhh9rnva8q5gsskve3t");
const expectedBalance = null;
strictEqual(account, expectedBalance);
```

マッピングから返される値が構造体や配列の場合、文字列のままでは扱いづらいことがあります。`AleoNetworkClient` には `Plaintext` と呼ばれる WASM オブジェクトとして値を返すメソッドがあり、便利なアクセサを使って中身を確認できます。`toObject()` メソッドを使えば WASM オブジェクトを JavaScript オブジェクトへ変換できます。

```typescript
import { AleoNetworkClient } from '@provablehq/sdk';
import {deepStrictEqual} from 'assert';
const networkClient = new AleoNetworkClient("https://api.explorer.provable.com/v1");

// token_registry.aleo の `registered_tokens` マッピングからトークン情報を取得します
const tokenStruct = await networkClient.getProgramMappingPlaintext("token_registry.aleo", "registered_tokens", "1381601714105276218895759962490543360839827276760458984912661726715051428034field");
const tokenObject = tokenStruct.toObject();
const expectedTokenObject = {
  token_id: "1381601714105276218895759962490543360839827276760458984912661726715051428034field",
  name: BigInt(1447384136),
  symbol: BigInt(1984255048),
  decimals: 18,
  supply: BigInt(1000000000000000000000000n),
  max_supply: BigInt(340282366920938463463374607431768211455n),
  admin: "aleo1uldp2afc9gnfsxd0r2svaecax8quutny5j6ns2qa80yp5uhsac9q35h7h6",
  external_authorization_required: false,
  external_authorization_party: "aleo1uldp2afc9gnfsxd0r2svaecax8quutny5j6ns2qa80yp5uhsac9q35h7h6"
};

deepStrictEqual(tokenObject,expectedTokenObject);
```

### プログラム構造の照会
アプリでは、プログラムのソースコードや含まれる関数、関数の入力と型、マッピングやレコード、インポートしているプログラムなど、構造に関する情報が必要になることがあります。以下でその取得方法を紹介します。

#### プログラムのソースコードを取得する
プログラムのソースコードは `AleoNetworkClient` のメソッドでユニーク ID を指定して取得します。

```typescript
import { AleoNetworkClient } from '@provablehq/sdk';
const networkClient = new AleoNetworkClient("https://api.explorer.provable.com/v1");

// credits.aleo のソースコードを取得します
const credits = await networkClient.getProgram("credits.aleo");
// token_registry.aleo のソースコードを取得します
const token_registry = await networkClient.getProgram("token_registry.aleo");
```

#### プログラムをオブジェクトとして取得する
プログラムの snarkVM 表現は、ユニーク ID を指定して Aleo ネットワークから取得できます。返されるオブジェクトには、関数一覧や入力・入力型、マッピング、レコード、アドレスなどを取り出す便利なメソッドが用意されています。ソースコードから直接解析する場合よりも扱いやすくなります。

```typescript
import { AleoNetworkClient } from '@provablehq/sdk';
import {deepStrictEqual} from 'assert';
const networkClient = new AleoNetworkClient("https://api.explorer.provable.com/v1");

// credits.aleo をプログラムオブジェクトとして取得します
const credits_program = await networkClient.getProgramObject("credits.aleo");

// プログラム内の全関数を取得します
const functions = credits_program.getFunctions();

// `transfer_private` 関数の入力を取得します
const transfer_function_inputs = credits_program.getFunctionInputs("transfer_private");

// 入力は以下の構造を持つオブジェクト配列で、Web フォームなどの UI 要素を構築する際に活用できます。
// Aleo 関数入力フォームの具体例は https://provable.tools/develop で確認できます。
const expected_inputs = [
    {
      type:"record",
      record:"credits",
      members:[
        {
          name:"microcredits",
          type:"u64",
          visibility:"private"
        },
        { 
            name: '_nonce', 
            type: 'group', 
            visibility: 'public' 
        }
      ],
      register:"r0"
    },
    {
      type:"address",
      visibility:"private",
      register:"r1"
    },
    {
      type:"u64",
      visibility:"private",
      register:"r2"
    }
];
deepStrictEqual(transfer_function_inputs, expected_inputs);

// プログラム内のすべてのマッピングを取得します
const mappings = credits_program.getMappings();

// プログラムがインポートしているすべてのプログラムを取得します
const records = credits_program.getImports()
```

#### プログラムのインポートとマッピングを取得する
次の例では、プログラムがインポートしているプログラムと、内部に保持するマッピングを取得します。

```typescript
import { AleoNetworkClient, Program } from '@provablehq/sdk';
import {deepStrictEqual} from 'assert';
const networkClient = new AleoNetworkClient("https://api.explorer.provable.com/v1");

// プログラムがインポートしているプログラム名を取得します
const programImportsNames = await networkClient.getProgramImportNames("token_registry.aleo");
const expectedImportsNames = ["credits.aleo"];
deepStrictEqual(programImportsNames, expectedImportsNames);

// インポートしているプログラムのソースコードをすべて取得します
const programImports = await networkClient.getProgramImports("token_registry.aleo");

// プログラム内のマッピング一覧を取得します
const programMappings = await networkClient.getProgramMappingNames("token_registry.aleo");
const expectedMappings = [
    "registered_tokens",
    "balances",
    "authorized_balances",
    "allowances",
    "roles"
];
deepStrictEqual(programMappings, expectedMappings);
```

`AleoNetworkClient` クラスが提供するメソッドの一覧と使用例は、[Network Client API ドキュメント](../../sdk/api-specification/02_aleo_network_client.md) にまとめられています。
