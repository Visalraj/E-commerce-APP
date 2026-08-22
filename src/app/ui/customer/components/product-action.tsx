"use client";

import { useState } from "react";
import { QuantityInput, AddToCartButton, BuyNowButton } from "@/app/ui/common/buttons";

type ProductActionsProps = {
    id: string;
    price: number;
    isWishlisted: boolean;
};

export default function ProductActions({ id, price, isWishlisted }: ProductActionsProps) {
    const [quantity, setQuantity] = useState(1);

    return (
        <>
            <div className="quantity-input mt-6">
                <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">
                    Quantity
                </label>

                <QuantityInput price={price} onQuantityChange={setQuantity} />
            </div>

            <div className="wrap-btns pt-4 mt-3 flex gap-4">
                <AddToCartButton id={id} isWishlisted={isWishlisted} quantity={quantity} />
                <BuyNowButton id={id} />
            </div>
        </>
    );
}
