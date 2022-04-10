// SPDX-License-Identifier: MIT
pragma solidity 0.8.13;

interface IAssemblyNFT {
    event AssemblyAsset(
        address indexed firstHolder,
        uint256 indexed tokenId,
        uint256 salt,
        address[] addresses,
        uint256[] numbers
    );

    event AssemblyAssetClaimed(
        uint256 indexed tokenId,
        address indexed owner,
        address[] addresses,
        uint256[] numbers
    );

    /// @dev hash function assigns the combination of assets with salt to bytes32 signature that is also the token id.
    /// @param _salt prevents hash collision, can be chosen by user input or increasing nonce from contract.
    /// @param _addresses concat assets addresses, e.g. [ERC-20_address1, ERC-20_address2, ERC-721_address_1, ERC-1155_address_1, ERC-1155_address_2]
    /// @param _numbers describes how many eth, ERC-20 token addresses length, ERC-721 token addresses length, ERC-1155 token addresses length,
    /// ERC-20 token amounts, ERC-721 token ids, ERC-1155 token ids and amounts.
    function hash(
        uint256 _salt,
        address[] memory _addresses,
        uint256[] memory _numbers
    ) external pure returns (uint256 tokenId);

    /// @dev to assemble lossless assets
    /// @param _to the receiver of the assembly token
    function safeMint(
        address _to,
        address[] memory _addresses,
        uint256[] memory _numbers
    ) external payable returns (uint256 tokenId);

    /// @dev burn this token and releases assembled assets
    /// @param _to to which address the assets is released
    function burn(
        address _to,
        uint256 _tokenId,
        uint256 _salt,
        address[] calldata _addresses,
        uint256[] calldata _numbers
    ) external;
}
