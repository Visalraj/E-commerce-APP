"use client";
import {useEffect, useState } from "react";
import Link from "next/link";
import { addToCart, removeFromCart } from "@/app/lib/actions-customer";
import Icon from "@/app/ui/common/svg-tiles";
import AddressModal from "../customer/components/modals";
import { useNotification } from "@/app/context/NotificationContext";

export default function Notifications({from,onClose}: {from: string; onClose: () => void;}) {
    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    }, []);
    const message = from === "RemoveFromCartButton" ? "Item removed from cart successfully." : "Account created successfully.";

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-[9999]">

            <div id="toast-simple" className={`${from === "RemoveFromCartButton" ? "top-20" : "top-24"} absolute right-4 flex items-center w-[calc(100%-2rem)] max-w-sm p-4 bg-white rounded-lg shadow-lg border border-gray-200 animate-slide-in-right pointer-events-auto`} role="alert">

                <svg className="w-5 h-5 text-fg-brand" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m12 18-7 3 7-18 7 18-7-3Zm0 0v-5"/></svg>
            
                <div className="ms-2.5 text-sm border-s border-default ps-3.5">{message}</div>

                <button type="button" onClick={onClose} className="ms-auto flex items-center justify-center text-body hover:text-heading bg-transparent box-border border border-transparent hover:bg-neutral-secondary-medium focus:ring-4 focus:ring-neutral-tertiary font-medium leading-5 rounded text-sm h-8 w-8 focus:outline-none" data-dismiss-target="#toast-simple" aria-label="Close">
                    <span className="sr-only">Close</span>
                    <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18 17.94 6M18 18 6.06 6"/></svg>
                </button>
            </div>
        </div>
    )
}

export function CreateButton({ isSubmitting }: { isSubmitting: boolean }) {
    return (
        <>
            <button type="submit" className="px-8 py-3 PrimaryBtn" disabled={isSubmitting}>
                {isSubmitting ? "Creating..." : "Create"}
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

export function BuyNowButton({ id,className,style,quantity }: { id?: string; className?: string; style?: React.CSSProperties; quantity: number }) {
    return (
        <Link href={`/product/buy/${(id+'____'+quantity)}`} >
            <button className={`${className ? className : "PrimaryBtn flex items-center gap-2"} `} style={style}>
                <Icon name="Shoppingbag" />
                Buy Now
            </button>
        </Link>
    );
}

export function RemoveFromCartButton({ id,className,style }: { id?: string; className?: string; style?: React.CSSProperties }) {
    const {showNotification} = useNotification();
    return (
        <>
            <button id={id} className={`${className ? className : "PrimaryBtn flex items-center gap-2"}`} style={style}
                onClick={async () => { const result = await removeFromCart({ id: id || "" });
                if (result.status) 
                    showNotification("RemoveFromCartButton");
                
            }} >
                <Icon name="Cart" />
                Remove
            </button>
        </>
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

export function QuantityInput({ price, onQuantityChange, currentQuantity, from, style, className}: {price: number; onQuantityChange: (quantity: number) => void; currentQuantity: number; from: "product" | "cart"; style?: React.CSSProperties; className?: string;}) {

    const handleChange = (value: string) => {
        
        const quantity = parseInt(value);
        const totalPrice = quantity * price;
        
        if (from === "product")
            window.dispatchEvent(new CustomEvent("price:update", { detail: { price: totalPrice } }));
        else 
            <PriceDisplay quantity={quantity} currentPrice={price} />;

        onQuantityChange(quantity);
    };

    return (
        <select  name="quantity" id="quantity" className={className || "mt-1 block w-24 border border-gray-300 rounded-md shadow-sm"}
            value={currentQuantity} onChange={(e) => handleChange(e.target.value)} style={style} >
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
        </select>
    );
}

export function PriceDisplay({ quantity, currentPrice }: { quantity: number; currentPrice: number; }) {
    return (
        <p className="card-text mt-3">
            Price:
            <span className="font-bold">
                {" "}
                {(currentPrice * quantity).toFixed(2)}
            </span>
        </p>
    );
}



const handleCheckout = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log( event);
}

export function ProceedToCheckoutButton({ userid, from_page }: { userid?: string; from_page?: string }) {
    return (
        <form onSubmit={handleCheckout} method="POST">
            <input type="hidden" name="userId" value={userid} />
            <input type="hidden" name="from_page" value={from_page} />
            <input type="hidden" name="action" value="checkout" />

            <button className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-all duration-300 shadow-sm active:scale-95">
                Proceed to Checkout
            </button>
        </form>
       
    );
}

