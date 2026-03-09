"use client";

import { useState } from "react";
import { addToCart, removeFromCart } from "@/app/lib/actions-customer";
import Icon from "@/app/ui/common/svg-tiles";
import Link from "next/link";


export function CreateButton() {
    return (
        <>
            <button type="submit" className="px-8 py-3 DefaultBtn">
                Create
            </button>
        </>
    );
}

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
        <Link href={`/product/buy/${id}`}>
            <button className="PrimaryBtn flex items-center gap-2">
                <Icon name="Shoppingbag" />
                Buy Now
            </button>
        </Link>
    );
}
