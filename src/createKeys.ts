import { Keypair } from '@solana/web3.js';
import * as fs from 'fs';
import promptSync from 'prompt-sync';
import path from 'path';

const prompt = promptSync();


// Ensure the keypairs directory exists


export async function createKeypairs() {

  if (action === 'c') {
    wallets = generateWallets(numOfWallets);
    wallets.forEach((wallet, index) => {
      saveKeypairToFile(wallet, index);
      console.log(`Wallet ${index + 1} Public Key: ${wallet.publicKey.toString()}`);
    });
  } else if (action === 'u') {
    wallets = readKeypairs();
    wallets.forEach((wallet, index) => {
      console.log(`Read Wallet ${index + 1} Public Key: ${wallet.publicKey.toString()}`);
    });
  } else {
    console.log('Invalid option. Please enter "c" for create or "u" for use existing.');
    return;
  }

  updatePoolInfo(wallets);
  console.log(`${wallets.length} wallets have been processed.`);
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
