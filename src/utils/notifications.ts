import { ReactNode } from "react";

import { notification } from "antd";

type NotificationType = "success" | "info" | "warning" | "error";

export const openNotification = (type: NotificationType, title: string, message: string | ReactNode) => {
    notification[type]({
        message: title,
        description: message,
    });
};
