"use client";
import { useState } from "react";
import Link from "next/link";
import { addToCart, removeFromCart } from "@/app/lib/actions-customer";
import Icon from "@/app/ui/common/svg-tiles";
import AddressModal from "../customer/components/modals";


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

export function AddAdressButton({ onClick }: { onClick: () => void }) {
    return (
        <button
            className="flex items-center px-5 py-2.5 border border-gray-200 text-black rounded-full text-md hover:border-blue-400 transition-all duration-300 shadow-sm active:scale-95"
            onClick={onClick}
        >
            <Icon name="Plus" /> Add New Address{" "}
        </button>
    );
}

export function AddAdressButtonWrapper(){
    const [open, setOpen] = useState(false);
    return (
        <>
            <AddAdressButton onClick={() => setOpen(true)} />
            {open && <AddressModal onClose={() => setOpen(false)} />}
        </>
    );

}
