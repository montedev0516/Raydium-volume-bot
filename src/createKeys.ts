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
  const keypairRegex = /^keypair\d+\.json$/;

  return fs.readdirSync(keypairsDir)
    .filter(file => keypairRegex.test(file)) // Use the regex to test each filename
    .map(file => {
      const filePath = path.join(keypairsDir, file);
      const secretKeyString = fs.readFileSync(filePath, { encoding: 'utf8' });
      const secretKey = Uint8Array.from(JSON.parse(secretKeyString));
      return Keypair.fromSecretKey(secretKey);
    });
}
