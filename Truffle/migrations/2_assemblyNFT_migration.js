const Assembly = artifacts.require("./AssemblyNFT.sol");

module.exports = function(deployer) {
  deployer.deploy(Assembly, "Wallet-Mover-NFT", "WMNFT", "https://ipfs.moralis.io:2053/ipfs/QmTCWp11fGK9ehaESkyMDrA1q8s5ntbxvz5cePza5dJbvh");
};
