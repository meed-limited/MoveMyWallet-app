import React, { useCallback, useEffect, useRef, useState } from "react";

import { SearchOutlined } from "@ant-design/icons";
import { fetchEnsAddress, FetchEnsAddressResult, fetchEnsResolver } from "@wagmi/core";
import { Input, InputRef } from "antd";
import { utils } from "ethers";

import Jazzicons from "./Jazzicons";
import { isProdEnv } from "../../../data/constant";
import { getEllipsisTxt } from "../../../utils/format";

const AddressInput: React.FC<any> = (props) => {
    const input = useRef<InputRef>(null);
    const [address, setAddress] = useState<string>("");
    const [validatedAddress, setValidatedAddress] = useState<FetchEnsAddressResult | string>("");
    const [isDomain, setIsDomain] = useState<boolean>(false);
    const [error, setError] = useState<string>("");

    useEffect(() => {
        if (validatedAddress) props.onChange(isDomain ? validatedAddress : address);
    }, [props, validatedAddress, isDomain, address]);

    const updateAddress = useCallback(async (value: string) => {
        setError("");
        setAddress(value);

        const isAddress = utils.isAddress(value);
        const isSupportedDomain = value.endsWith(".eth") || value.endsWith(".xyz");

        if (isSupportedDomain) {
            if (isProdEnv) {
                try {
                    let result: FetchEnsAddressResult | string;
                    if (value.endsWith(".eth")) {
                        result = await fetchEnsAddress({ name: value });
                    } else {
                        const resolver = await fetchEnsResolver({ name: value });
                        result = resolver?.address || "";
                    }
                    setValidatedAddress(result);
                    setIsDomain(true);
                } catch (error) {
                    setValidatedAddress("");
                    setError("Error fetching ENS address");
                }
            } else {
                setError("ENS not supported on this network. Are you connected on a testnet?");
            }
        } else if (isAddress) {
            setValidatedAddress(getEllipsisTxt(value, 10));
            setIsDomain(false);
        } else {
            setValidatedAddress("");
            setIsDomain(false);
            setError("Invalid address. Please check your input.");
        }
    }, []);

    const Cross = () => (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 22 22"
            strokeWidth="2"
            stroke="#E33132"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            onClick={() => {
                setAddress("");
                setValidatedAddress("");
                setIsDomain(false);
                setError("");
                setTimeout(() => {
                    if (input.current !== null) {
                        input.current.focus();
                    }
                });
            }}
            style={{ cursor: "pointer" }}
        >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
    );

    return (
        <>
            <Input
                ref={input}
                placeholder={props.placeholder ? props.placeholder : "Public address"}
                prefix={
                    isDomain || address.length === 42 ? (
                        <Jazzicons seed={(isDomain && validatedAddress ? validatedAddress : address).toLowerCase()} />
                    ) : (
                        <SearchOutlined />
                    )
                }
                suffix={validatedAddress && <Cross />}
                autoFocus={props.autoFocus}
                value={isDomain && validatedAddress ? `${address} (${getEllipsisTxt(validatedAddress)})` : address}
                onChange={(e) => {
                    updateAddress(e.target.value);
                }}
                disabled={validatedAddress !== "" ? true : false}
                style={{ ...props?.style, backgroundColor: "white", gap: "0.5rem" }}
            />
            {error && <p style={{ color: "red", marginBlock: "-15px 15px", fontSize: "12px" }}>{error}</p>}
        </>
    );
};

export default AddressInput;
