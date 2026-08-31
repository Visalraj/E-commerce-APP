"use client";

import { ReactNode } from "react";
import { CartData } from "@/app/lib/definitions";
import { CartProvider } from "@/app/context/CartContext";

export default function CartWrapper({initialCartItems, children,}: { initialCartItems: CartData[]; children: ReactNode;}) {
    return <CartProvider initialCartItems={initialCartItems}>{children}</CartProvider>;
}
