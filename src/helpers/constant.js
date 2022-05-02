// Insert your smart-contract addresses here:
export const ASSEMBLY_NFT_ETHEREUM = "";
export const ASSEMBLY_NFT_BSC = "0x283f4b27508F8757C5a8200a57Bea0C0F6f59FFE"; // OK & verified
export const ASSEMBLY_NFT_POLYGON = "0x3FcB9a9E4FC3f3B1bd24DC61350dA55C6448188D"; // OK & verified

// Kept in case for testing puposes:
// export const ASSEMBLY_NFT_MUMBAI = "0x8dB7B52f6Ad95dbC44Cb37fdAa84918462EDd3eC";
// export const ASSEMBLY_NFT_BSC_TESTNET = "0x1c9ab1642d36304B540a62e66DEfe0F4Bf21E256";

export const CHAINS_WITH_L3P_SUPPORT = ["0x1", "0x38"];
export const L3P_TOKEN_ADDRESS = "0xdeF1da03061DDd2A5Ef6c59220C135dec623116d";

export const getContractAddress = (chainId) => {
  if (chainId === "0x1") {
    return ASSEMBLY_NFT_ETHEREUM;
  } else if (chainId === "0x89") {
    return ASSEMBLY_NFT_POLYGON;
  } else if (chainId === "0x38") {
    return ASSEMBLY_NFT_BSC;
  }
  // else if (chainId === "0x13881") {
  //   return ASSEMBLY_NFT_MUMBAI;
  // } else if (chainId === "0x61") {
  //   return ASSEMBLY_NFT_BSC_TESTNET;
  // }
};

export const ABI = {
  contractName: "AssemblyNFT",
  abi: [
    {
      inputs: [
        {
          internalType: "string",
          name: "_name",
          type: "string"
        },
        {
          internalType: "string",
          name: "_symbol",
          type: "string"
        },
        {
          internalType: "string",
          name: "baseURIextended",
          type: "string"
        }
      ],
      stateMutability: "nonpayable",
      type: "constructor"
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "owner",
          type: "address"
        },
        {
          indexed: true,
          internalType: "address",
          name: "approved",
          type: "address"
        },
        {
          indexed: true,
          internalType: "uint256",
          name: "tokenId",
          type: "uint256"
        }
      ],
      name: "Approval",
      type: "event"
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "owner",
          type: "address"
        },
        {
          indexed: true,
          internalType: "address",
          name: "operator",
          type: "address"
        },
        {
          indexed: false,
          internalType: "bool",
          name: "approved",
          type: "bool"
        }
      ],
      name: "ApprovalForAll",
      type: "event"
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "firstHolder",
          type: "address"
        },
        {
          indexed: true,
          internalType: "uint256",
          name: "tokenId",
          type: "uint256"
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "salt",
          type: "uint256"
        },
        {
          indexed: false,
          internalType: "address[]",
          name: "addresses",
          type: "address[]"
        },
        {
          indexed: false,
          internalType: "uint256[]",
          name: "numbers",
          type: "uint256[]"
        }
      ],
      name: "AssemblyAsset",
      type: "event"
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "uint256",
          name: "tokenId",
          type: "uint256"
        },
        {
          indexed: true,
          internalType: "address",
          name: "owner",
          type: "address"
        },
        {
          indexed: false,
          internalType: "address[]",
          name: "addresses",
          type: "address[]"
        },
        {
          indexed: false,
          internalType: "uint256[]",
          name: "numbers",
          type: "uint256[]"
        }
      ],
      name: "AssemblyAssetClaimed",
      type: "event"
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "previousOwner",
          type: "address"
        },
        {
          indexed: true,
          internalType: "address",
          name: "newOwner",
          type: "address"
        }
      ],
      name: "OwnershipTransferred",
      type: "event"
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "from",
          type: "address"
        },
        {
          indexed: true,
          internalType: "address",
          name: "to",
          type: "address"
        },
        {
          indexed: true,
          internalType: "uint256",
          name: "tokenId",
          type: "uint256"
        }
      ],
      name: "Transfer",
      type: "event"
    },
    {
      inputs: [],
      name: "_baseURIextended",
      outputs: [
        {
          internalType: "string",
          name: "",
          type: "string"
        }
      ],
      stateMutability: "view",
      type: "function",
      constant: true
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "to",
          type: "address"
        },
        {
          internalType: "uint256",
          name: "tokenId",
          type: "uint256"
        }
      ],
      name: "approve",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "owner",
          type: "address"
        }
      ],
      name: "balanceOf",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256"
        }
      ],
      stateMutability: "view",
      type: "function",
      constant: true
    },
    {
      inputs: [],
      name: "feeETH",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256"
        }
      ],
      stateMutability: "view",
      type: "function",
      constant: true
    },
    {
      inputs: [],
      name: "feeL3P",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256"
        }
      ],
      stateMutability: "view",
      type: "function",
      constant: true
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "tokenId",
          type: "uint256"
        }
      ],
      name: "getApproved",
      outputs: [
        {
          internalType: "address",
          name: "",
          type: "address"
        }
      ],
      stateMutability: "view",
      type: "function",
      constant: true
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "owner",
          type: "address"
        },
        {
          internalType: "address",
          name: "operator",
          type: "address"
        }
      ],
      name: "isApprovedForAll",
      outputs: [
        {
          internalType: "bool",
          name: "",
          type: "bool"
        }
      ],
      stateMutability: "view",
      type: "function",
      constant: true
    },
    {
      inputs: [],
      name: "name",
      outputs: [
        {
          internalType: "string",
          name: "",
          type: "string"
        }
      ],
      stateMutability: "view",
      type: "function",
      constant: true
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "",
          type: "address"
        },
        {
          internalType: "address",
          name: "",
          type: "address"
        },
        {
          internalType: "uint256[]",
          name: "",
          type: "uint256[]"
        },
        {
          internalType: "uint256[]",
          name: "",
          type: "uint256[]"
        },
        {
          internalType: "bytes",
          name: "",
          type: "bytes"
        }
      ],
      name: "onERC1155BatchReceived",
      outputs: [
        {
          internalType: "bytes4",
          name: "",
          type: "bytes4"
        }
      ],
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "",
          type: "address"
        },
        {
          internalType: "address",
          name: "",
          type: "address"
        },
        {
          internalType: "uint256",
          name: "",
          type: "uint256"
        },
        {
          internalType: "uint256",
          name: "",
          type: "uint256"
        },
        {
          internalType: "bytes",
          name: "",
          type: "bytes"
        }
      ],
      name: "onERC1155Received",
      outputs: [
        {
          internalType: "bytes4",
          name: "",
          type: "bytes4"
        }
      ],
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "",
          type: "address"
        },
        {
          internalType: "address",
          name: "",
          type: "address"
        },
        {
          internalType: "uint256",
          name: "",
          type: "uint256"
        },
        {
          internalType: "bytes",
          name: "",
          type: "bytes"
        }
      ],
      name: "onERC721Received",
      outputs: [
        {
          internalType: "bytes4",
          name: "",
          type: "bytes4"
        }
      ],
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      inputs: [],
      name: "owner",
      outputs: [
        {
          internalType: "address",
          name: "",
          type: "address"
        }
      ],
      stateMutability: "view",
      type: "function",
      constant: true
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "tokenId",
          type: "uint256"
        }
      ],
      name: "ownerOf",
      outputs: [
        {
          internalType: "address",
          name: "",
          type: "address"
        }
      ],
      stateMutability: "view",
      type: "function",
      constant: true
    },
    {
      inputs: [],
      name: "renounceOwnership",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "from",
          type: "address"
        },
        {
          internalType: "address",
          name: "to",
          type: "address"
        },
        {
          internalType: "uint256",
          name: "tokenId",
          type: "uint256"
        }
      ],
      name: "safeTransferFrom",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "from",
          type: "address"
        },
        {
          internalType: "address",
          name: "to",
          type: "address"
        },
        {
          internalType: "uint256",
          name: "tokenId",
          type: "uint256"
        },
        {
          internalType: "bytes",
          name: "_data",
          type: "bytes"
        }
      ],
      name: "safeTransferFrom",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "operator",
          type: "address"
        },
        {
          internalType: "bool",
          name: "approved",
          type: "bool"
        }
      ],
      name: "setApprovalForAll",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      inputs: [],
      name: "symbol",
      outputs: [
        {
          internalType: "string",
          name: "",
          type: "string"
        }
      ],
      stateMutability: "view",
      type: "function",
      constant: true
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "from",
          type: "address"
        },
        {
          internalType: "address",
          name: "to",
          type: "address"
        },
        {
          internalType: "uint256",
          name: "tokenId",
          type: "uint256"
        }
      ],
      name: "transferFrom",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "newOwner",
          type: "address"
        }
      ],
      name: "transferOwnership",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      inputs: [
        {
          internalType: "bytes4",
          name: "interfaceId",
          type: "bytes4"
        }
      ],
      name: "supportsInterface",
      outputs: [
        {
          internalType: "bool",
          name: "",
          type: "bool"
        }
      ],
      stateMutability: "view",
      type: "function",
      constant: true
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "tokenId",
          type: "uint256"
        }
      ],
      name: "tokenURI",
      outputs: [
        {
          internalType: "string",
          name: "",
          type: "string"
        }
      ],
      stateMutability: "view",
      type: "function",
      constant: true
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "_salt",
          type: "uint256"
        },
        {
          internalType: "address[]",
          name: "_addresses",
          type: "address[]"
        },
        {
          internalType: "uint256[]",
          name: "_numbers",
          type: "uint256[]"
        }
      ],
      name: "hash",
      outputs: [
        {
          internalType: "uint256",
          name: "tokenId",
          type: "uint256"
        }
      ],
      stateMutability: "pure",
      type: "function",
      constant: true
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "_to",
          type: "address"
        },
        {
          internalType: "address[]",
          name: "_addresses",
          type: "address[]"
        },
        {
          internalType: "uint256[]",
          name: "_numbers",
          type: "uint256[]"
        }
      ],
      name: "safeMint",
      outputs: [
        {
          internalType: "uint256",
          name: "tokenId",
          type: "uint256"
        }
      ],
      stateMutability: "payable",
      type: "function",
      payable: true
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "_to",
          type: "address"
        },
        {
          internalType: "uint256",
          name: "_tokenId",
          type: "uint256"
        },
        {
          internalType: "uint256",
          name: "_salt",
          type: "uint256"
        },
        {
          internalType: "address[]",
          name: "_addresses",
          type: "address[]"
        },
        {
          internalType: "uint256[]",
          name: "_numbers",
          type: "uint256[]"
        }
      ],
      name: "burn",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "_newEthFee",
          type: "uint256"
        }
      ],
      name: "setFeeETH",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "_newL3PFee",
          type: "uint256"
        }
      ],
      name: "setFeeL3P",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      inputs: [
        {
          internalType: "address payable",
          name: "_newFeeReceiver",
          type: "address"
        }
      ],
      name: "setFeeReceiver",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      inputs: [
        {
          internalType: "string",
          name: "_newTokenURI",
          type: "string"
        }
      ],
      name: "setTokenURI",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function"
    }
  ]
};
