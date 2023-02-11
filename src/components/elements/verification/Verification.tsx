import { FC } from "react";

import styles from "./Verification.module.css";
import { useUserData } from "../../../context/UserContextProvider";
import { useSuportedChains } from "../../../hooks";

const Verification: FC = () => {
    const { isConnected } = useUserData();
    const isSupportedChain = useSuportedChains();

    const notConnected = "Connect your wallet";
    const unupportedChain = ` This chain is not supported, \n
    please select a different chain`;

    let message = "";
    if (!isConnected) {
        message = notConnected;
    } else if (!isSupportedChain) {
        message = unupportedChain;
    }

    return (
        <>
            {message !== "" && (
                <div className="small-pane">
                    <div className={styles.smallContainer}>
                        <div className={styles.text}>{message}</div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Verification;
