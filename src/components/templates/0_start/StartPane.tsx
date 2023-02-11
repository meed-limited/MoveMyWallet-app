import { FC } from "react";

import { Button } from "antd";

import styles from "./StartPane.module.css";
import { useUserData } from "../../../context/UserContextProvider";

const StartPane: FC = () => {
    const { setDisplayPaneMode } = useUserData();
    return (
        <div className={styles.startPane}>
            <p className={styles.text}>
                Welcome to<br></br> <span style={{ fontSize: "60px" }}>Move My Wallet</span>
            </p>
            <div className={styles.buttonDiv}>
                <Button className="button-black-big" shape="round" onClick={() => setDisplayPaneMode("tokens")}>
                    Start
                </Button>
            </div>
        </div>
    );
};

export default StartPane;
