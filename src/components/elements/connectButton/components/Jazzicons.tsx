import { FC } from "react";

import { Skeleton } from "antd";
import Jazzicon, { jsNumberForAddress } from "react-jazzicon";

/**
 * Shows a Jazzicon for the provided wallet address
 * @param {*} props
 * @returns <Jazzicons /> JSX Elemenet
 */

interface JazziconsProps {
    seed: string;
    size?: number;
}

const Jazzicons: FC<JazziconsProps> = ({ seed, size }) => {
    if (!seed) return <Skeleton.Avatar active size={40} />;

    if (size) return <Jazzicon seed={jsNumberForAddress(seed)} diameter={size} />;

    return <Jazzicon seed={jsNumberForAddress(seed)} />;
};

export default Jazzicons;
