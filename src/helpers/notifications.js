import { notification } from "antd";

// Type = 'success' | 'error' | 'warning' | 'info'
export function openNotification(type, title, message) {
  notification[type]({
    message: title,
    description: message
  });
}
