import hre, { ethers } from "hardhat";
import fs from "fs";

const name = "MoveMyWallet";
const symbol = "MMW";
const uri = "ipfs://QmUhMMtsyLNPCcjCCsst715Qm5JyqkCdvQqu65aDT95QJh";

async function main() {
    const MoveMyWallet = await ethers.getContractFactory("MoveMyWallet");
    const moveMyWallet = await MoveMyWallet.deploy(name, symbol, uri);
    await moveMyWallet.deployed();

    console.log("\n");
    console.log("MoveMyWallet deployed to: ", moveMyWallet.address);
    console.log("\n");

    // Get Staking Contract ABI
    const abiFile = JSON.parse(fs.readFileSync("./artifacts/contracts/MoveMyWallet.sol/MoveMyWallet.json", "utf8"));
    const abi = JSON.stringify(abiFile.abi);

    console.log("MoveMyWallet ABI:");
    console.log("\n");
    console.log(abi);
    console.log("\n");

    /** WAITING:
     ************/
    await moveMyWallet.deployTransaction.wait(5);

    /** VERIFICATION:
     *****************/
    await hre.run("verify:verify", {
        address: moveMyWallet.address,
        constructorArguments: [name, symbol, uri],
    });
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
