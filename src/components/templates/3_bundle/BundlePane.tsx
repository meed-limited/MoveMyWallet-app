import { FC } from "react";

import { DownloadOutlined, LoadingOutlined } from "@ant-design/icons";
import { Button, Spin } from "antd";

import styles from "./BundlePane.module.css";
import { useUserData } from "../../../context/UserContextProvider";
import { useContractExecution } from "../../../hooks";
import { sortArrayForBundle } from "../../../utils/sortArrayForBundle";

const BundlePane: FC<BundleProps> = ({ setBundleDataToTransfer, tokensToTransfer, NFTsToTransfer, onReset }) => {
    const { setDisplayPaneMode } = useUserData();
    const { bundle, loading } = useContractExecution();

    const antIcon = <LoadingOutlined style={{ fontSize: 30 }} spin />;

    const onBackClick = () => {
        setDisplayPaneMode("nfts");
    };

    const { addressesArray, numbersArray } = sortArrayForBundle(tokensToTransfer, NFTsToTransfer);

    const handleBundle = async () => {
        const receipt = await bundle(addressesArray, numbersArray);
        if (receipt !== null && receipt !== undefined) {
            const bundleDataToTransfer: TokenData = {
                tokenId: receipt.tokenId,
                salt: receipt.salt,
                addresses: receipt.addresses,
                numbers: receipt.numbers,
            };
            setBundleDataToTransfer(bundleDataToTransfer);
        }
    };

    return (
        <Spin spinning={loading} indicator={antIcon} size="large">
            <div className="small-pane">
                <Button className="button-black-big" shape="round" onClick={handleBundle}>
                    BUNDLE <DownloadOutlined style={{ marginLeft: "25px", transform: "scale(1.2)" }} />
                </Button>

                <p>OR</p>
                <div className={styles.containerBottom}>
                    <Button className="button-small black" shape="round" onClick={onBackClick}>
                        Back
                    </Button>
                    <Button className="button-small white" shape="round" onClick={onReset}>
                        Restart
                    </Button>
                </div>
            </div>
        </Spin>
    );
};

export default BundlePane;
