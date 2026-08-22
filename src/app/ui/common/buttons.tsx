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

export function AddToCartButton({ id, isWishlisted,quantity }: { id?: string; isWishlisted?: boolean; quantity: number }) {
    const [wishlisted, setWishlisted] = useState(isWishlisted || false);

    const handleWishlistClick = async () => {
        if (!id) return;
        try {
            
            const response = !wishlisted ? await addToCart({ id, quantity }) : await removeFromCart({ id });
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

export function QuantityInput({ price, onQuantityChange }: { price: number; onQuantityChange: (quantity: number) => void }) {
    const handleChange = (value: string) => {
        const quantity = parseInt(value);
        document.cookie = `selected_quantity=${quantity}; path=/; max-age=31536000`;
        const totalPrice = quantity * price;
        window.dispatchEvent(new CustomEvent("price:update", { detail: { price: totalPrice } }));
        onQuantityChange(quantity);
    };

    return (
        <select  name="quantity"  id="quantity" className="mt-1 block w-24 border border-gray-300 rounded-md shadow-sm"  defaultValue="1" onChange={(e) => handleChange(e.target.value)}>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
        </select>
    );
}

