"use client";

import { createContext, useContext, useState, ReactNode } from "react";

import Notifications from "@/app/ui/common/ui-elements";

type NotificationContextType = {
    showNotification: (from: string) => void;
};

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export function NotificationProvider({ children }: { children: ReactNode }) {
    const [notificationVisible, setNotificationVisible] = useState(false);

    const [from, setFrom] = useState("");

    const showNotification = (from: string) => {
        console.log(`Notification triggered from: ${from}`);
        setFrom(from);
        setNotificationVisible(true);

        // Optional auto-close
        setTimeout(() => {
            setNotificationVisible(false);
        }, 3000);
    };

    return (
        <NotificationContext.Provider value={{ showNotification }}>
            {children}
            {notificationVisible && <Notifications from={from} onClose={() => setNotificationVisible(false)} />}
        </NotificationContext.Provider>
    );
}

export function useNotification() {
    const context = useContext(NotificationContext);

    if (!context) {
        throw new Error("useNotification must be used inside NotificationProvider");
    }

    return context;
}
