"use client";

import { useCart } from "@/app/context/CartContext";
import { ProceedToCheckoutButton } from "@/app/ui/common/buttons";

export default function PriceSummary({
    userId,
}: {
    userId: string | undefined;
}) {
    const { cartItems } = useCart();
    const totalPrice = cartItems.reduce((total, item) => {  return total + item.product_price * item.quantity; }, 0);

    const vat = totalPrice * 0.2;

    const grandTotal = totalPrice + vat;

    return (
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
    );
}
