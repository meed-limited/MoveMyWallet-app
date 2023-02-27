import { FC } from "react";

import { Button, Divider } from "antd";

import styles from "./Done.module.css";

const Done: FC<DoneProps> = ({ address, onReset }) => {
    return (
        // <div className={styles.container}>
        <div className="small-pane">
            <p className={styles.title}>Done !</p>
            <p className={styles.text}>
                Your assets have been succesfully transferred to:<br></br>
                <span style={{ fontWeight: "600", color: "blue" }}>{address}</span>.<br></br>
            </p>
            <p className={styles.text}>Thank you for using SuperUltra products.</p>
            <Divider style={{ marginBlock: "40px" }} />
            <Button className={styles.resetButton} shape="round" onClick={onReset}>
                Restart
            </Button>
        </div>
    );
};

export default Done;
