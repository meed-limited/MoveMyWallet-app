import { useState } from "react";

export function useDisplayPane() {
    const [displayPaneMode, setDisplayPaneMode] = useState<DisplayPane>("start");

    const resetDisplayPane = () => {
        setDisplayPaneMode("start");
    };

    return { displayPaneMode, setDisplayPaneMode, resetDisplayPane };
}
