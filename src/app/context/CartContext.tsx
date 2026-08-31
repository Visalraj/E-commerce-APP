"use client";

import { createContext, useContext, useState, ReactNode } from "react";

import { CartData } from "@/app/lib/definitions";

type CartContextType = {
    cartItems: CartData[];
    updateQuantity: (id: string, quantity: number) => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ initialCartItems, children }: { initialCartItems: CartData[]; children: ReactNode }) {
    const [cartItems, setCartItems] = useState<CartData[]>(initialCartItems);

    const updateQuantity = (id: string, quantity: number) => {

        setCartItems((prev) => {
            const updated = prev.map((item) => (item._id === id ? { ...item, quantity } : item));
            return updated;
        });
    };

    return (
        <CartContext.Provider  value={{ cartItems,  updateQuantity }}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);

    if (!context) {
        throw new Error("useCart must be used inside CartProvider");
    }

    return context;
}
