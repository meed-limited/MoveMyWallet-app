# Move My Wallet - Quick Start

```
💿 Install all dependencies:
```sh
cd MoveMyWallet-App
yarn install 
```
✏ Create a `.env` file in the main folder and provide your `appId` and `serverUrl` from Moralis ([How to start Moralis Server](https://docs.moralis.io/moralis-server/getting-started/create-a-moralis-server)) 
Example:
```jsx
REACT_APP_MORALIS_APPLICATION_ID = xxxxxxxxxxxx
REACT_APP_MORALIS_SERVER_URL = https://xxxxxx.grandmoralis.com:2053/server
```

🔎 Locate the file constant.js in `src/helpers/constant.js` and paste your smart-contracts addresses and ABI;
```jsx
const ASSEMBLY_NFT_MUMBAI = "your Contract Address here";
const ABI = "your Contract ABI here";
```


🚴‍♂️ Run your App:
```sh
yarn start
```

