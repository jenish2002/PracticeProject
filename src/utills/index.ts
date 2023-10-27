import { NotificationType } from "../types";
import { notification } from "antd";

export * from "./enums";

export * from "./translation";

export const makeCustomMessage = (...messages: string[]) => messages.join(" ");

export const displayNotification = (
  type: NotificationType,
  message: string
) => {
  notification.destroy("notification");
  notification[type]({
    key: "notification",
    message: message,
    placement: "top",
    duration: 2,
  });
};

export const onMenuOpenClose = () => {
  document.dispatchEvent(new CustomEvent("onSidebarOpenClose"));
};

export const onMenuClose = () => {
  document.dispatchEvent(new CustomEvent("onSidebarClose"));
};

export const EMAIL_REGEX = new RegExp(
  /^[a-zA-Z0-9._+-]+@([a-zA-Z0-9.-]+\.[a-zA-Z]{2,4})$/i
);
