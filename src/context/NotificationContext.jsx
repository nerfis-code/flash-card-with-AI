import { Children, createContext, useContext } from "react";

export const NotificationContext = createContext();
export const useNotificationContext = () => useContext(NotificationContext);
