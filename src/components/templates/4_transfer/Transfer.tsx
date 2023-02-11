import { FC, useState } from "react";

import { LoadingOutlined, SendOutlined } from "@ant-design/icons";
import { Button, Spin } from "antd";

import styles from "./Transfer.module.css";
import { useContractExecution, useMongoDB } from "../../../hooks";
import { AddressInput } from "../../elements/addressInput";

const Transfer: FC<TransferProps> = ({ bundleDataToTransfer, getAddressFromTransfer }) => {
    const { transfer, loading } = useContractExecution();
    const { deleteBundle } = useMongoDB();
    const [receiver, setReceiver] = useState<string>("");

    const antIcon = <LoadingOutlined style={{ fontSize: 30 }} spin />;

    const setAddress = (value: any) => {
        setReceiver(value);
        getAddressFromTransfer(value);
    };

    const handleTransfer = async () => {
        if (bundleDataToTransfer) {
            const res = await transfer(
                receiver,
                bundleDataToTransfer.tokenId,
                bundleDataToTransfer.salt,
                bundleDataToTransfer.addresses,
                bundleDataToTransfer.numbers
            );
            if (res) {
                deleteBundle(bundleDataToTransfer.tokenId);
            }
        }
    };

    return (
        <Spin spinning={loading} indicator={antIcon} size="large">
            <div className={styles.content}>
                <div style={{ margin: "auto", width: "80%" }}>
                    <p className={styles.text}>Transfer my assets</p>
                    <AddressInput autoFocus placeholder="Receiver" onChange={setAddress} />
                    <div className={styles.buttonDiv}>
                        <Button className={styles.transferButton} shape="round" onClick={handleTransfer}>
                            TRANSFER <SendOutlined style={{ padding: "0 20px", fontSize: "18px" }} />
                        </Button>
                    </div>
                </div>
            </div>
        </Spin>
    );
};

export default Transfer;
