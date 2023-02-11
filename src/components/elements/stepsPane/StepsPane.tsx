import { FC } from "react";

import { Steps } from "antd";

import styles from "./StepsPane.module.css";
import { useUserData } from "../../../context/UserContextProvider";
import { useWindowWidthAndHeight } from "../../../hooks";

const StepsPane: FC<StepsPaneProps> = ({ tokensToTransfer, NFTsToTransfer }) => {
    const { displayPaneMode } = useUserData();
    const { isMobileOnly, isTablet } = useWindowWidthAndHeight();

    const switchStep = () => {
        switch (displayPaneMode) {
            case "start":
                return -1;
            case "tokens":
                return 0;
            case "nfts":
                return 1;
            case "bundle":
                return 2;
            case "transfer":
                return 3;
            case "done":
                return 4;
            default:
                return 0;
        }
    };

    const tokens = tokensToTransfer.length;
    const nfts = NFTsToTransfer.length;

    const items = [
        {
            title: isTablet ? "Select Tokens" : "Choose Tokens to transfer, if any",
            description:
                isTablet && !isMobileOnly
                    ? ""
                    : tokens > 0
                    ? `${tokens} token${tokens > 1 ? "s" : ""} selected`
                    : "Select some of your ERC20 tokens, or all, or none, and click on OK when you're done.",
        },
        {
            title: isTablet ? "Select NFTs" : "Choose NFTs to transfer, if any",
            description:
                isTablet && !isMobileOnly
                    ? ""
                    : nfts > 0
                    ? `${nfts} NFT${nfts > 1 ? "s" : ""} selected`
                    : "Select some of your NFTs, or all, or none, and click on OK when you're done.",
        },
        {
            title: "Bundle",
            description: isTablet && !isMobileOnly ? "" : "Pack all your assets in one NFT for a single transaction.",
        },
        {
            title: "Transfer",
            description:
                isTablet && !isMobileOnly ? "" : "Get all your assets ready and waiting for you in your new wallet!",
        },
    ];

    return (
        <div className={styles.steps}>
            <Steps
                direction={isTablet ? "horizontal" : "vertical"}
                current={switchStep()}
                items={items}
                className={styles.stepsContent}
            />
        </div>
    );
};

export default StepsPane;
