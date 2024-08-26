import { Keypair } from '@solana/web3.js';
import * as fs from 'fs';
import promptSync from 'prompt-sync';
import path from 'path';

const prompt = promptSync();


// Ensure the keypairs directory exists


function updatePoolInfo(wallets: Keypair[]) {
  let poolInfo: IPoolInfo = {}; // Use the defined type here


  // Update wallet-related information
  poolInfo.numOfWallets = wallets.length;
  wallets.forEach((wallet, index) => {
    poolInfo[`pubkey${index + 1}`] = wallet.publicKey.toString();
  });

  // Write updated data back to poolInfo.json
  fs.writeFileSync(keyInfoPath, JSON.stringify(poolInfo, null, 2));
}

export async function createKeypairs() {
  console.log('WARNING: If you create new ones, ensure you don\'t have SOL, OR ELSE IT WILL BE GONE.');
  const action = prompt('Do you want to (c)reate new wallets or (u)se existing ones? (c/u): ');
  let wallets: Keypair[] = [];

  if (action === 'c') {
    const numOfWallets = 5; // Hardcode 5 buyer keypairs here.
    if (isNaN(numOfWallets) || numOfWallets <= 0) {
      console.log('Invalid number. Please enter a positive integer.');
      return;
    }

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
