import { AnchorProvider, BN, Program } from "@coral-xyz/anchor";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { Keypair, PublicKey } from "@solana/web3.js";
import { useCallback, useMemo, useState, useEffect } from "react";
import { Assigment, IDL } from "./assigment";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { toast } from "react-toastify";

type operator = "add" | "sub" | "mul" | "div";
interface tx {
  wallet: string;
  one: number;
  two: number;
  operation: operator;
  output: string;
}

export default function Page() {
  const connection = useConnection();
  const wallet = useWallet();

  const [transactions, setTransactions] = useState<tx[]>([]);
  const [loading, setLoading] = useState(false);
  const [inputs, setInputs] = useState({
    one: 0,
    two: 0,
  });

  // CONFIGRATION
  const provider = useMemo(
    () =>
      new AnchorProvider(connection.connection, wallet as any, {
        preflightCommitment: "finalized",
      }),
    [connection.connection, wallet.publicKey] // eslint-disable-line
  );

  const program = useMemo(
    () =>
      new Program<Assigment>(
        IDL,
        new PublicKey("HFKLK8ZBCDA8xp4YCsxyshaQQXwM8DQijmkhP3e3Jf7E"),
        provider
      ),
    [provider]
  );

  // Effects

  const fetchTransaction = useCallback(async () => {
    if (!program || !provider || !wallet.publicKey) return [];

    const transactions = (
      await program.account.inOut.all([
        {
          memcmp: {
            bytes: wallet.publicKey.toBase58(),
            offset: 8 + 32,
          },
        },
      ])
    ).map((tx) => ({
      wallet: tx.account.wallet.toBase58(),
      one: +tx.account.inputOne,
      two: +tx.account.inputTwo,
      operation: tx.account.operator.add
        ? "add"
        : tx.account.operator.sub
        ? "sub"
        : tx.account.operator.mul
        ? "mul"
        : "div",
      output: (+tx.account.output).toFixed(2),
    }));
    if (transactions.length === 0) return [];
    return transactions;
  }, [program, provider, wallet.publicKey]);
  useEffect(() => {
    (async () => {
      const txns = await fetchTransaction();
      setTransactions(txns as tx[]);
    })();
    fetchTransaction();
  }, [fetchTransaction]);

  const calculate = useCallback(
    async (one: number, two: number, operation: operator) => {
      if (!program || !provider) return;

      if (one === 0 || two === 0) {
        toast.warn("Please enter a valid number");
        return;
      }

      try {
        const key = Keypair.generate();
        const [address] = PublicKey.findProgramAddressSync(
          [Buffer.from("inout"), key.publicKey.toBuffer()],
          program.programId
        );

        let operator;

        switch (operation) {
          case "add":
            operator = {
              add: {},
            };
            break;

          case "sub":
            operator = {
              sub: {},
            };
            break;

          case "mul":
            operator = {
              mul: {},
            };
            break;

          case "div":
            operator = {
              div: {},
            };
            break;
        }

        const tx = await program.methods
          .inout({
            inputOne: new BN(one),
            inputTwo: new BN(two),
            operator,
          })
          .accounts({
            key: key.publicKey,
            inout: address,
            signer: provider.wallet.publicKey,
          })
          .transaction();

        tx.recentBlockhash = (
          await provider.connection.getLatestBlockhash()
        ).blockhash;
        tx.feePayer = provider.wallet.publicKey;

        const signTransaction = await provider.wallet.signTransaction(tx);
        const txid = await provider.connection.sendRawTransaction(
          signTransaction.serialize()
        );

        // const output = await program.account.inOut.fetch(address, "processed");
        return {
          txid,
          output: {
            wallet: provider.wallet.publicKey.toBase58(),
            one,
            two,
            operation,
            output: (operation === "div"
              ? one / two
              : operation === "mul"
              ? one * two
              : operation === "add"
              ? one + two
              : one - two
            ).toFixed(2),
          },
        };
      } catch (e) {
        console.error(e);
        return undefined;
      }
    },
    [program, provider]
  );

  const submit = useCallback(
    async (operator: operator) => {
      setLoading(true);
      // SENDING TRANSACTION
      const data = await calculate(inputs.one, inputs.two, operator);
      if (data) {
        console.log(data.txid, "txid");
        // SETTING NEW TRANSACTION
        setTransactions((prev) => [data.output, ...prev] as tx[]);

        // RESETING INPUTS
        setInputs((prev) => ({
          ...prev,
          one: 0,
          two: 0,
        }));

        toast.success("Transaction submitted successfully");
        setLoading(false);
        return;
      }

      toast.error("Transaction failed");
      setLoading(false);
      return;
    },
    [inputs, calculate]
  );

  return (
    <div className="main">
      <WalletMultiButton />

      <form>
        <h1>Calculator</h1>
        <input
          type="number"
          placeholder="First Input"
          onChange={(e) =>
            setInputs((prev) => ({
              ...prev,
              one: Number(e.target.value),
            }))
          }
          value={inputs.one}
        />
        <input
          type="number"
          onChange={(e) =>
            setInputs((prev) => ({
              ...prev,
              two: Number(e.target.value),
            }))
          }
          value={inputs.two}
          placeholder="Second Input"
        />
        <div className="buttons">
          <button
            type="button"
            className={loading ? "loading button" : "button"}
            disabled={loading}
            onClick={() => submit("add")}
          >
            ADD
          </button>
          <button
            type="button"
            className={loading ? "loading button" : "button"}
            disabled={loading}
            onClick={() => submit("sub")}
          >
            SUB
          </button>
          <button
            type="button"
            className={loading ? "loading button" : "button"}
            disabled={loading}
            onClick={() => submit("mul")}
          >
            MUL
          </button>
          <button
            type="button"
            className={loading ? "loading button" : "button"}
            disabled={loading}
            onClick={() => submit("div")}
          >
            DIV
          </button>
        </div>
      </form>

      <h1>Previous Transaction</h1>
      <table id="my-table">
        <thead>
          <tr className="text-sm font-semibold">
            <th>Wallet</th>
            <th>One</th>
            <th>Two</th>
            <th>Operation</th>
            <th>Output</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((tx: tx, index: number) => (
            <tr key={index}>
              <td>
                {tx.wallet.slice(0, 5)}....
                {tx.wallet.slice(tx.wallet.length - 5, tx.wallet.length)}
              </td>
              <td>{tx.one}</td>
              <td>{tx.two}</td>
              <td>{tx.operation}</td>
              <td>{tx.output}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
