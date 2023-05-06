import * as anchor from "@coral-xyz/anchor";
import { Assigment, IDL } from "../target/types/assigment";
import { config } from "./config";

const initInputOne = async () => {
  const { connection, wallet, program } = config();

  const key = anchor.web3.Keypair.generate();
  const [address, bump] = anchor.web3.PublicKey.findProgramAddressSync([
    Buffer.from("inout"),
    key.publicKey.toBuffer()
  ],
    program.programId);

  const operator = {
    add: {}
  }

  const tx = await program.methods.inout({
    inputOne: new anchor.BN(8),
    inputTwo: new anchor.BN(2),
    operator,
  }).accounts({
    key: key.publicKey,
    inout: address,
    signer: wallet.publicKey,
  }).transaction();

  tx.recentBlockhash = (await connection.getLatestBlockhash()).blockhash;
  tx.feePayer = wallet.publicKey;

  const txid = await program.provider.sendAndConfirm(tx, [], {
    commitment: 'confirmed',
  })

  console.log("txid: ", txid);

  const account = await program.account.inOut.fetch(address, 'processed');
  console.log("output: ", account.output.toNumber());

};


initInputOne();