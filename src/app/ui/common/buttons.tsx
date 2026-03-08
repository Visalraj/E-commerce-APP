"use client";

import { useState } from "react";
import { addToCart, removeFromCart, buyProduct } from "@/app/lib/actions-customer";
import Icon from "@/app/ui/common/svg-tiles";

export function AddToCartButton({ id, isWishlisted }: { id?: string; isWishlisted?: boolean }) {
    const [wishlisted, setWishlisted] = useState(isWishlisted || false);

    const handleWishlistClick = async () => {
        if (!id) return;
        try {
            
            const response = !wishlisted ? await addToCart({ id }) : await removeFromCart({ id });
            response.status && setWishlisted((prev) => !prev);
        } catch (err) {
            console.error("Client-side error:", err);
        }
    };

    return (
        <button className="SecondaryBtn flex items-center gap-2 disabled:opacity-50" onClick={handleWishlistClick} >
            {!wishlisted ? (<><Icon name="Wishlist" />{" "} </> ) : ( <>  <Icon name="Filledheart" />{" "} </>)}
            {!wishlisted ? "Wishlist" : "Wishlisted"}
        </button>
    );
}

export function BuyNowButton({ id }: { id?: string }) {
    return (
        <button className="PrimaryBtn flex items-center gap-2" onClick={() => buyProduct({ id })}>
            <Icon name="Shoppingbag" />
            Buy Now
        </button>
    );
}
