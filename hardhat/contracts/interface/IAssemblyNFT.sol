// SPDX-License-Identifier: MIT
pragma solidity 0.8.18;

interface IAssemblyNFT {
    event AssemblyAsset(
        address indexed firstHolder,
        uint256 indexed tokenId,
        uint256 salt,
        address[] addresses,
        uint256[] numbers
    );

    event AssemblyAssetClaimed(uint256 indexed tokenId, address indexed owner, address[] addresses, uint256[] numbers);

    /**
     * @dev Transfers assets to the escrow contract and mints an ERC721 NFT with a hash of the assets as token id.
     * @param to Address to receive the ERC721 token.
     * @param addresses Array containing the contract addresses of the assets to be sent to the escrow contract.
     * @param numbers Array containing the numbers, amounts, and IDs of the assets to be sent to the escrow contract.
     * @return tokenId The token ID of the newly minted ERC721 token.
     */
    function safeMint(
        address to,
        address[] calldata addresses,
        uint256[] memory numbers
    ) external returns (uint256 tokenId);

    /**
     * @dev Burn the given ERC721 token and release the assembled assets to the given address.
     * @param to Address to which the assets will be released.
     * @param tokenId The token id of the ERC721 token to be burned.
     * @param salt Salt used to calculate the token id from the given combination of assets.
     * @param addresses Array containing addresses of the assets used to assemble the ERC721 token.
     * @param numbers Array containing additional information about the assets such as amounts and ids.
     */
    function burn(
        address to,
        uint256 tokenId,
        uint256 salt,
        address[] calldata addresses,
        uint256[] calldata numbers
    ) external;

    /**
     * @dev Hashes the combination of assets with a salt to generate a unique bytes32 signature also used as token id.
     * @param salt A value that prevents hash collisions, which can be chosen by user input or automatically generated
     *  by increasing a nonce in the contract.
     * @param addresses Array of addresses for the assets, concatenated in the order of ETH, ERC20, ERC721 and ERC1155.
     * @param numbers Array that describes the number of ETH, ERC-20 token addresses, ERC-721 token addresses,
     * ERC-1155 token addresses, ERC-20 token amounts, ERC-721 token ids, ERC-1155 token ids and amounts.
     * @return tokenId The unique token id as a uint256.
     */
    function hash(
        uint256 salt,
        address[] calldata addresses,
        uint256[] calldata numbers
    ) external pure returns (uint256 tokenId);
}
