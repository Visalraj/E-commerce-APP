"use client";

import { useState } from "react";
import { addToCart, buyProduct } from "@/app/lib/actions-customer";
import Icon from "@/app/ui/common/svg-tiles";

export function AddToCartButton({ id }: { id?: string }) {
    const [loading, setLoading] = useState(false);
    const [wishlisted, setWishlisted] = useState(false);

    const handleWishlistClick = async () => {
        if (!id) return;
        setLoading(true);
        try {
            const response = await addToCart({ id });
            response.status && setWishlisted(true);
        } catch (err) {
            console.error("Client-side error:", err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <button className="SecondaryBtn flex items-center gap-2 disabled:opacity-50" onClick={handleWishlistClick}  disabled={loading} >
            {!wishlisted ? (<><Icon name="Wishlist" />{" "} </> ) : ( <>  <Icon name="Filledheart" />{" "} </>)}
            {loading ? "Adding..." : !wishlisted ? "Wishlist" : "Wishlist"}
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
