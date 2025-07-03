import {
  Commitment,
  Connection,
  Keypair,
  LAMPORTS_PER_SOL,
  PublicKey,
} from "@solana/web3.js";
import wallet from "/Users/ajeeshrs/.config/solana/id.json";
import { getOrCreateAssociatedTokenAccount, transfer } from "@solana/spl-token";

// We're going to import our keypair from the wallet file
const keypair = Keypair.fromSecretKey(new Uint8Array(wallet));

//Create a Solana devnet connection
const commitment: Commitment = "confirmed";
const connection = new Connection("https://api.devnet.solana.com", commitment);

// Mint address
const mint = new PublicKey("AitoLKrg12jYQfQgndZfMRdNu7ZH5Xvs7Ly7dJNqeoiF");

const token_decimals = 1_000_000;

// Recipient address
const to = new PublicKey("4BRrxuFBzrKnik1jqnkPDu3f9gBHyPBXKHvw66Dz8KPb");

(async () => {
  try {
    // Get the token account of the fromWallet address, and if it does not exist, create it
    const fromAta = await getOrCreateAssociatedTokenAccount(
      connection,
      keypair,
      mint,
      keypair.publicKey
    );

    // Get the token account of the toWallet address, and if it does not exist, create it
    const toAta = await getOrCreateAssociatedTokenAccount(
      connection,
      keypair,
      mint,
      to
    );

    // Transfer the new token to the "toTokenAccount" we just created

    const tx = await transfer(
      connection,
      keypair,
      fromAta.address,
      toAta.address,
      keypair,
      1 * token_decimals
    );

    console.log(`Here is your tx : ${tx}`);
  } catch (e) {
    console.error(`Oops, something went wrong: ${e}`);
  }
})();
