import { AnchorProvider, BN, Program } from "@coral-xyz/anchor";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { Keypair, PublicKey } from "@solana/web3.js";
import { useCallback, useMemo } from "react";
import { Assigment, IDL } from "./assigment";

export default function Page() {
  const connection = useConnection();
  const wallet = useWallet();

  const provider = useMemo(
    () =>
      new AnchorProvider(connection.connection, wallet as any, {
        preflightCommitment: "finalized",
      }),
    [connection, wallet.publicKey]
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

  const calculate = useCallback(
    async (
      one: number,
      two: number,
      operation: "add" | "sub" | "mul" | "div"
    ) => {
      if (!program || !provider || !wallet.publicKey) return;

      try {
        const key = Keypair.generate();
        const [address, bump] = PublicKey.findProgramAddressSync(
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
            signer: wallet.publicKey,
          })
          .transaction();

        tx.recentBlockhash = (
          await connection.connection.getLatestBlockhash()
        ).blockhash;
        tx.feePayer = wallet.publicKey;

        const txid = await provider.sendAndConfirm(tx, [], {
          commitment: "confirmed",
        });

        return txid;
      } catch (e) {
        console.error(e);
        return undefined;
      }
    },
    [program, wallet.publicKey, provider]
  );

  return (
    <div>
      <form>
        <h1>Calculator</h1>
        <input type="number" placeholder="First Input" />
        <input type="number" placeholder="Second Input" />
        <div className="buttons">
          <button type="submit">ADD</button>
          <button type="submit">SUB</button>
          <button type="submit">MUL</button>
          <button type="submit">DIV</button>
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
          <tr>
            <td>John Doe</td>
            <td>Marketing Manager</td>
            <td>New York City</td>
            <td>$80,000</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
