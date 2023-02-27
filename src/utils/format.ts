import { BigNumber, utils } from "ethers";

/**
 * Returns a string of form "abc...xyz"
 * @param {string} str string to string
 * @param {number} n number of chars to keep at front/end
 * @returns {string}
 */
export const getEllipsisTxt = (str: string, n = 6) => {
    if (str) {
        return `${str.slice(0, n)}...${str.slice(str.length - n)}`;
    }
    return "";
};

export const toHexString = (num: number): string => {
    return "0x" + num.toString(16);
};

export const formatBigNumber = (num: number): BigNumber => {
    const test = num / 10 ** 18;
    return utils.parseUnits(test.toString(), 18);
};
