/**********************************************************
                           CONTEXT
***********************************************************/

interface UserContext {
    address?: `0x${string}` | undefined;
    chainId: number;
    isConnected: boolean;
    balances: UserBalances;
    userNFTs: Nfts;
    collections: Collections;
    syncWeb3: () => void;
    displayPaneMode: DisplayPane;
    setDisplayPaneMode: Dispatch<SetStateAction<DisplayPane>>;
    resetDisplayPane: () => void;
}

interface Web3Data {
    balances: UserBalances;
    userNFTs: Nfts;
    collections: Collections;
    syncWeb3: () => void;
}

interface UserBalances {
    native: string;
    token: Token[];
}

type DisplayPane = "start" | "tokens" | "nfts" | "bundle" | "transfer" | "done";

interface Token {
    key: string;
    balance: number;
    decimals: number;
    logo: string | null;
    name: string;
    symbol: string;
    thumbnail: string | null;
    token_address: string;
}

/**********************************************************
                            LAYOUT
***********************************************************/

type MenuItem = Required<MenuProps>["items"][number];

interface AddressProps {
    style: CSSProperties | undefined;
    avatar: string;
    size: number | undefined;
    copyable: boolean;
    account: string;
}

type ConnectModalProps = {
    isOpen: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
};

type DisconnectModalProps = {
    isOpen: boolean;
    onClose: React.Dispatch<React.SetStateAction<boolean>>;
};

/**********************************************************
                           NFT
***********************************************************/

interface EvmNft {
    amount: number | undefined;
    blockNumber: BigNumber | undefined;
    blockNumberMinted: BigNumber | undefined;
    chain: EvmChain;
    contractType: string | undefined;
    lastMetadataSync: Date | undefined;
    lastTokenUriSync: Date | undefined;
    metadata?: any;
    name: string | undefined;
    ownerOf: EvmAddress | undefined;
    symbol: string | undefined;
    tokenAddress: EvmAddress | undefined;
    tokenHash: string | undefined;
    tokenId: string | number;
    tokenUri: string | undefined;
}

interface NftsOwners {
    _id: ObjectId;
    amount: number;
    blockNumber: string | undefined;
    blockNumberMinted: string | undefined;
    chain: string | number;
    contractType: string | undefined;
    lastMetadataSync: string | undefined;
    lastTokenUriSync: string | undefined;
    name: string | undefined;
    ownerOf: string | undefined;
    symbol: string | undefined;
    tokenAddress: string;
    tokenHash: string | undefined;
    tokenId: number;
    tokenUri: string | undefined;
    isStaked: boolean;
}

type Nfts = {
    nfts: NFTinDB[];
    total: number;
};

interface Nft {
    amount: string;
    block_number: string;
    block_number_minted: string;
    contract_type: string;
    image: string;
    last_metadata_sync: string;
    last_token_uri_sync: string;
    metadata: NftMetadata;
    name: string;
    owner_of: string;
    symbol: string;
    token_address: string;
    token_hash: string;
    token_id: string;
    token_uri: string;
    image?: string;
}

interface NftMetadata {
    attributes: NftAttributes;
    description: string;
    image: string;
    name: string;
}

interface NftAttributes {
    display_type?: string;
    trait_type?: string;
    value?: string;
    boost: string;
    rarity: string;
}

type NFTinDB = {
    amount: string;
    block_number: string;
    block_number_minted: string;
    chainId?: string;
    collectionName?: string;
    contract_type: string;
    createdAt?: string;
    image: string;
    itemId?: number | undefined;
    last_metadata_sync: string;
    last_token_uri_sync: string;
    metadata: NftMetadata;
    normalized_metadata: any;
    objectId?: string;
    owner: string;
    name: string;
    owner_of: string;
    price?: number;
    seller?: string;
    sold?: boolean;
    symbol?: string;
    synced_at: string;
    tokenId: string;
    token_address: string;
    token_hash: string;
    token_id: string;
    token_uri: string;
    updatedAt: string;
};

/**********************************************************
                        TEMPLATE PROPS
***********************************************************/

interface TokenProps {
    tokensToTransfer: Token[];
    setTokensToTransfer: Dispatch<SetStateAction<Token[]>>;
}

interface NFTProps {
    NFTsToTransfer: NFTinDB[];
    setNFTsToTransfer: Dispatch<SetStateAction<NFTinDB[]>>;
}

interface BundleProps {
    setBundleDataToTransfer: Dispatch<SetStateAction<TokenData>>;
    tokensToTransfer: Token[];
    NFTsToTransfer: NFTinDB[];
    onReset: () => void;
}

interface TransferProps {
    bundleDataToTransfer: TokenData | undefined;
    getAddressFromTransfer: (value: SetStateAction<string>) => void;
}

interface DoneProps {
    address: string;
    onReset: () => void;
}

/**********************************************************
                        DIVERS
***********************************************************/

interface StepsPaneProps {
    tokensToTransfer: Token[];
    NFTsToTransfer: NFTinDB[];
}

interface DisplayNFTProps {
    item: NFTinDB;
    index: number;
    isNFTSelected: (currentNft: NFTinDB) => boolean;
    handleClickCard: (clickedNFT: NFTinDB) => void;
}

interface BundleArrays {
    addressesArray: string[];
    numbersArray: (number | string | BigNumber)[];
}

interface AssemblyEventData {
    addresses: string[];
    blockHash: string;
    blockNumber: number;
    chainId: number;
    numbers: string[];
    ownerOf: string;
    salt: number;
    tokenId: string;
    transactionHash: string;
}

interface TokenData {
    tokenId: string;
    salt: number;
    addresses: string[];
    numbers: string[];
}

interface Collection {
    token_address: string;
    contract_type: string;
    name: string;
    symbol: string;
}

type Collections = Collection[];

type MenuItem = Required<MenuProps>["items"][number];

interface Item {
    label: string;
    key: string;
    icon: JSX.Element;
}

interface CollectionSelectorProps {
    setNftsDisplayed: React.Dispatch<React.SetStateAction<NFTinDB[]>>;
}

interface AddEthereumChainParameter {
    chainId: string; // A 0x-prefixed hexadecimal string
    chainName?: string;
    nativeCurrency?: {
        name: string;
        symbol: string; // 2-6 characters long
        decimals: number;
    };
    rpcUrls?: (string | undefined)[];
    blockExplorerUrls?: (string | undefined)[];
    iconUrls?: string[]; // Currently ignored.
}
