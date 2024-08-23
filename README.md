
# Online Multiplayer Web 3 NFT Card Battle Game
Create your characters, create and join live battles, choose your battleground, and battle other players in real-time!

# Web 3

## Hardhat Project

1. cd web3
2. npx hardhat -> y → typescript → enter → enter

# Install Core Wallet
1. Install Core: https://chromewebstore.google.com/detail/core-crypto-wallet-nft-ex/agoakfejjabomempkjlepdflaleeobhb
2. Turn on the testnet mode by: opening up the Core extension -> click the hamburger menu on the top left -> go to advanced -> turn on the testnet mode
3. Fund your wallet from the https://core.app/tools/testnet-faucet/?subnet=c&token=c

## Get the coupon code for the Avax Fuji faucet
1. Go to https://guild.xyz/avalanche
2. Click "Join Guild" button and join with all social media it ask:
![join avalanche](./img/join_avalanche.png)
4. Go to Developers page https://guild.xyz/avalanche/developers
5. Click "Reveal secret" to your Faucer Coupon
![Reveal secret](./img/avalanche_reveal_secret.png)
6. Open Core web, and click “Tools” and select the Test Faucet and fill it the form: https://test.core.app/tools/testnet-faucet/?subnet=c&token=c
![avalanche test faucet](./img/avalanche_test_faucet.png)

### Link
- https://www.youtube.com/watch?v=oaOWldSSc6A
- https://support.avax.network/en/articles/6639882-core-web-how-do-i-use-the-test-faucet

## How to get avalanche Private Key:
https://support.avax.network/en/articles/8832783-core-extension-how-do-i-export-my-private-key
Save contract address to .env file (`PRIVATE_KEY  = "YOUR_PRIVATE_KEY"`)

## Deploy Smart Contract
1. Compile the contract by running the `npx hardhat compile` command
```Bsh
$ npx hardhat compile
Downloading compiler 0.8.16
Compiled 11 Solidity files successfully (evm target: london).
```
2. Deploy the smart contract on the Fuji test network by running the `npx hardhat run scripts/deploy.ts --network fuji` command
```Bash
$ npx hardhat run scripts/deploy.ts --network fuji
Deploying a smart contract...
{ AVAXGods: '0x665b3f627F1720736b45d2E98aCda7dF84C2FF3C' }
```
Save contract address to .env file (`CONTRACT_ADDRESS  = "YOUR_CONTRACT_ADDRESS"`)

3. Move the `/artifacts/contracts/AVAXGods.json` file to the `/contract` folder on the frontend Copy the address of the deployed contract from the terminal and paste it into the `/contract/index.js` file of the frontend application

# Frontend
1. cd to `client` foler and run `npm run dev` to start application on `http://localhost:5173`