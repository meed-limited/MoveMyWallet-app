import { FC, useMemo } from "react";

import { Card, Image } from "antd";

import { useIPFS, useWindowWidthAndHeight } from "../../../hooks";

const { Meta } = Card;

const DisplayNFT: FC<DisplayNFTProps> = ({ item, index, isNFTSelected, handleClickCard }) => {
    const { isTablet } = useWindowWidthAndHeight();
    const { resolveLink } = useIPFS();
    const nft = useMemo(() => resolveLink(item), [item]);

    return (
        <>
            {nft && (
                <Card
                    onClick={() => handleClickCard(nft)}
                    size="small"
                    hoverable
                    style={{
                        width: isTablet ? 150 : 190,
                        border: isNFTSelected(nft) ? "8px solid #e7e779" : undefined,
                        opacity: isNFTSelected(nft) ? "1" : "0.9",
                        transform: isNFTSelected(nft) ? undefined : "scale(0.9)",
                    }}
                    cover={
                        <Image
                            preview={false}
                            src={nft.image}
                            alt=""
                            style={{ height: isTablet ? "150px" : "190px" }}
                        />
                    }
                    key={index}
                >
                    <Meta title={nft.name} description={nft.contract_type} />
                </Card>
            )}
        </>
    );
};

export default DisplayNFT;
