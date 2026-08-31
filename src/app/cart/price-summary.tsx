"use client";

import { useCart } from "@/app/context/CartContext";
import { ProceedToCheckoutButton } from "@/app/ui/common/buttons";
import { CartData } from "../lib/definitions";

export default function PriceSummary({userId,from_page}: {userId: string | undefined; from_page?: string;}) {
    const { cartItems } = useCart();

    const items: CartData[] = cartItems;

    const totalPrice = items.reduce((total, item) => {
        const price = Number(item.product_price) || 0;
        const quantity = Number(item.quantity) || 1;

        return total + price * quantity;
    }, 0);

    const vat = totalPrice * 0.2;

    const grandTotal = totalPrice + vat;

    return (
        <>
            {from_page === "product_page" ? (
                <p className="text-2xl mt-4 font-semibold text-blue-600" data-price-display>
                        ${totalPrice}
                </p>
                
            ) : (
                <div className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-gray-100 w-2/5 self-start">
                    <h2 className="text-2xl font-bold text-center mb-5">Price Summary</h2>

                    <div className="flex flex-col gap-4">
                        <div className="flex justify-between items-center">
                            <span>Price</span>

                            <span className="font-bold">
                                {process.env.NEXT_PUBLIC_PLATFORM_CURRENCY_SYMBOL}
                                {totalPrice.toFixed(2)}
                            </span>
                        </div>

                        <div className="flex justify-between items-center">
                            <span>VAT</span>

                            <span className="font-bold">
                                {process.env.NEXT_PUBLIC_PLATFORM_CURRENCY_SYMBOL}
                                {vat.toFixed(2)}
                            </span>
                        </div>

                        <hr />

                        <div className="flex justify-between items-center">
                            <span className="font-bold">Total</span>

                            <span className="text-xl font-bold">
                                {process.env.NEXT_PUBLIC_PLATFORM_CURRENCY_SYMBOL}
                                {grandTotal.toFixed(2)}
                            </span>
                        </div>

                        <ProceedToCheckoutButton userid={userId} from_page="cart" />
                    </div>
                </div>
            )}
        </>
    );
}
