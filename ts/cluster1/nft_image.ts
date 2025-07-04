import wallet from "/Users/ajeeshrs/.config/solana/id.json";
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import {
  createGenericFile,
  createSignerFromKeypair,
  signerIdentity,
} from "@metaplex-foundation/umi";
import { irysUploader } from "@metaplex-foundation/umi-uploader-irys";
import { readFile } from "fs/promises";

// Create a devnet connection
const umi = createUmi("https://api.devnet.solana.com");

let keypair = umi.eddsa.createKeypairFromSecretKey(new Uint8Array(wallet));
const signer = createSignerFromKeypair(umi, keypair);

umi.use(irysUploader());
umi.use(signerIdentity(signer));

(async () => {
  try {
    //1. Load image
    //2. Convert image to generic file.
    //3. Upload image

    const imagePath = await readFile(
      "/Users/ajeeshrs/Desktop/turbin3/Q3_25_Builder_AjeeshRS/solana-starter/ts/cluster1/1D0C7045-BE13-42DC-BCE3-E4EF1C8F301A.png"
    );

    const image = createGenericFile(imagePath, "rug.png", {
      contentType: "image/png",
    });

    const [myUri] = await umi.uploader.upload([image]);
    console.log("Your image URI: ", myUri);
  } catch (error) {
    console.log("Oops.. Something went wrong", error);
  }
})();
