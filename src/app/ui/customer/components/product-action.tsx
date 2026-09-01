"use client";

import { useState } from "react";
import { QuantityInput, AddToCartButton, BuyNowButton } from "@/app/ui/common/ui-elements";
import { useCart } from "@/app/context/CartContext";


type ProductActionsProps = {
    id?: string;
    price: number;
    isWishlisted?: boolean;
    currentQuantity: number;
    from?: "product" | "cart";
    style?: React.CSSProperties;
    className?: string;
};

export default function ProductActions({ id, price, isWishlisted, currentQuantity, from="product" , style, className }: ProductActionsProps) {
    const [quantity, setQuantity] = useState(currentQuantity);
    const { updateQuantity } = useCart();

    const handleQuantityChange = (newQuantity: number) => {
        setQuantity(newQuantity);
        if (id) {
            updateQuantity(id, newQuantity);
        }
    };


    if(from === "cart"){
        return (
            <>
                <div className="flex flex-col gap-3">
                    {/* Quantity Row */}
                    <div className="flex items-center  gap-4">
                        <span className="">Quantity:</span>

                        <QuantityInput
                            price={price}
                            currentQuantity={quantity}
                            onQuantityChange={handleQuantityChange}
                            from={from}
                            style={style}
                            className={className}
                        />
                    </div>

                    {/* Price Row */}
                    <div className="flex items-center  gap-4">
                        <span className="">Price:</span>

                        <span className="font-bold text-base">{`${process.env.NEXT_PUBLIC_PLATFORM_CURRENCY_SYMBOL}${(price * quantity).toFixed(2)}`}</span>
                    </div>
                </div>
            </>
        );
    }
    return (
        <>
            <div className="quantity-input mt-6">
                <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">
                    Quantity
                </label>

                <QuantityInput price={price}   onQuantityChange={handleQuantityChange} currentQuantity={quantity} from={from}  />
            </div>

            <div className="wrap-btns pt-4 mt-3 flex gap-4">
                <AddToCartButton id={id} isWishlisted={isWishlisted} quantity={quantity} />
                <BuyNowButton id={id} quantity={quantity} />
            </div>
        </>
    );
}
