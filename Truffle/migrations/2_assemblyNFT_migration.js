const Assembly = artifacts.require("./AssemblyNFT.sol");

module.exports = function(deployer) {
  deployer.deploy(Assembly, "Move My Wallet", "MMW", "https://ipfs.moralis.io:2053/ipfs/QmUhMMtsyLNPCcjCCsst715Qm5JyqkCdvQqu65aDT95QJh");
};
