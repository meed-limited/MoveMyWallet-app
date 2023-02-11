import { URL } from "../data/constant";

export const useMongoDB = () => {
    const updateBundle = async (data: AssemblyEventData) => {
        try {
            const response = await fetch(`${URL}api/updateBundleInDB`, {
                method: "POST",
                headers: {
                    accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    data: data,
                }),
            });
            const result = await response.json();
            return result;
        } catch (error) {
            console.error(error);
            return null;
        }
    };

    const findBundle = async (address: string) => {
        try {
            const response = await fetch(`${URL}api/findBundleInDB`, {
                method: "POST",
                headers: {
                    accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    address: address,
                }),
            });
            const result = await response.json();

            if (result.success) {
                return result.data;
            } else return null;
        } catch (error) {
            console.error(error);
            return null;
        }
    };

    const deleteBundle = async (tokenId: string) => {
        try {
            const response = await fetch(`${URL}api/deleteBundleInDB`, {
                method: "POST",
                headers: {
                    accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    tokenId: tokenId,
                }),
            });
            const result = await response.json();
            return result;
        } catch (error) {
            console.error(error);
            return null;
        }
    };

    return { updateBundle, findBundle, deleteBundle };
};
