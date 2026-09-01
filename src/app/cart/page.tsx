import Navbar from "@/app/ui/Home/navbar";
import {  isLoggedIn,trimCharacters } from "../Helpers/function";
import { Suspense } from "react";
import Skeleton from "../ui/common/loading-skeleton";
import { CartData } from "../lib/definitions";
import Image from "next/image";
import { BuyNowButton, RemoveFromCartButton } from "../ui/common/ui-elements";
import Link from "next/link";
import ProductActions from "@/app/ui/customer/components/product-action";
import CartWrapper from "./CartWrapper";
import PriceSummary from "./price-summary";

export default async function CartPage() {
    const user = await isLoggedIn();
    return (
        <div className="min-h-screen bg-[#FDFDFD]">
            <Navbar />
            <Suspense fallback={<Skeleton />}>
                <CartDetails id={user?.id} />
            </Suspense>
        </div>
    );
}
async function CartDetails({ id }: { id: string | undefined }) {
    const userId = id;
    const response = await fetch(`${process.env.API_URL}top-deals/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            type: "user_cart",
            userId: userId,
        }),
        cache: "no-store",
    });
    const cartData = await response.json();
    const result = cartData.data || [];    
    if (!response.ok || result.length === 0) return <div className="p-20 text-center">Product not found</div>;

    return (
        <CartWrapper initialCartItems={result}>
            <main className="container mx-auto px-6 py-12">
                <div className="flex flex-col md:flex-row gap-12">
                    <div className="flex flex-col md:flex-col gap-12 bg-white p-10 rounded-[2.5rem] shadow-sm border border-gray-100 w-3/5">
                        {result.map((item: CartData, index: number) => (
                            <div key={index} className="card mb-3 border" style={{ maxWidth: "740px" }}>
                                <div className="row g-0">
                                    <div className="col-md-4 m-auto">
                                        <Image
                                            src={
                                                item.product_images[0]?.images[0]
                                                    ? `${process.env.NEXT_PUBLIC_CLOUDINARY_URL}${item.product_images[0].images[0]}`
                                                    : "https://flowbite.com/docs/images/products/apple-watch.png"
                                            }
                                            alt={item.product_name}
                                            width={200}
                                            height={200}
                                            className="img-fluid rounded-start w-fit"
                                        />
                                    </div>
                                    <div className="col-md-8">
                                        <div className="card-body">
                                            <Link href={`/product/${item._id}`}>
                                                <h5 className="card-title font-bold">
                                                    {item.product_name.charAt(0).toUpperCase() +
                                                        item.product_name.slice(1)}
                                                </h5>
                                            </Link>
                                            <p className="card-text">{trimCharacters(item.product_desc)}</p>

                                            <ProductActions
                                                from="cart"
                                                price={item.product_price}
                                                currentQuantity={item.quantity}
                                                className="form-select form-select-sm mt-2"
                                                style={{ width: "5rem" }}
                                                id={item._id}
                                            />

                                            <hr className="my-4" />
                                           
                                            <RemoveFromCartButton
                                                id={item._id}
                                                className="btn border me-2 d-inline-flex align-items-center justify-content-center gap-2"
                                                style={{ width: "13rem" }}
                                                
                                            />

                                            <BuyNowButton
                                                id={item._id}
                                                className="btn border me-2 d-inline-flex align-items-center justify-content-center gap-2"
                                                style={{ width: "13rem" }}
                                                quantity={item.quantity}
                                                />
                                            
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <PriceSummary userId={userId} />
                </div>
            </main>
        </CartWrapper>
    );
}