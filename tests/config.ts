import * as anchor from "@coral-xyz/anchor";
import key from "../key.json";
import { Assigment, IDL } from "../target/types/assigment";


export const config = () => {
    const connection = new anchor.web3.Connection("https://api.devnet.solana.com");

    const wallet = new anchor.Wallet(anchor.web3.Keypair.fromSecretKey(new Uint8Array(key)));

    const provider = new anchor.AnchorProvider(connection, wallet, {
        preflightCommitment: "finalized",
    });

    const program = new anchor.Program<Assigment>(IDL,
        new anchor.web3.PublicKey('HFKLK8ZBCDA8xp4YCsxyshaQQXwM8DQijmkhP3e3Jf7E'),
        provider
    )

    return { connection, wallet, program }
}