import { Keypair } from '@solana/web3.js';
import * as fs from 'fs';
import promptSync from 'prompt-sync';
import path from 'path';

const prompt = promptSync();


// Ensure the keypairs directory exists


export async function createKeypairs() {

}

export function loadKeypairs(): Keypair[] {
  // Define a regular expression to match filenames like 'keypair1.json', 'keypair2.json', etc.

  return fs.readdirSync(keypairsDir)
      return Keypair.fromSecretKey(secretKey);
    });
}
