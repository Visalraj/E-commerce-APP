import Navbar from "@/app/ui/Home/navbar";
import { isLoggedIn,trimCharacters } from "../Helpers/function";
import { Suspense } from "react";
import Skeleton from "../ui/common/loading-skeleton";
import { CartData } from "../lib/definitions";
import Image from "next/image";
import { BuyNowButton, ProceedToCheckoutButton, RemoveFromCartButton } from "../ui/common/buttons";
import Link from "next/link";
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
export async function CartDetails({ id }: { id: string | undefined }) {
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
    const totalPrice = result.reduce((total: number, item: CartData) => total + item.product_price * item.quantity, 0);
    if (!response.ok || result.length === 0) return <div className="p-20 text-center">Product not found</div>;

    return (
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
                                                {item.product_name.charAt(0).toUpperCase() + item.product_name.slice(1)}
                                            </h5>
                                        </Link>
                                        <p className="card-text">{trimCharacters(item.product_desc)}</p>
                                        <div className="flex flex-row gap-4">
                                            <p className="card-text mt-3">Quantity: </p>
                                            <select
                                                className="form-select form-select-sm mt-2"
                                                aria-label=".form-select-sm example"
                                                defaultValue={item.quantity}
                                                style={{ width: "5rem" }}
                                            >
                                                <option value="1">1</option>
                                                <option value="2">2</option>
                                                <option value="3">3</option>
                                                <option value="4">4</option>
                                                <option value="5">5</option>
                                            </select>
                                        </div>
                                        <p className="card-text mt-3">
                                            Price:
                                            <span className="font-bold">
                                                {" "}
                                                {`${process.env.PLATFORM_CURRENCY_SYMBOL}${(item.product_price * item.quantity).toFixed(2)}`}
                                            </span>
                                        </p>
                                        <hr className="my-4" />
                                        <p className="card-text">
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
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-gray-100 w-2/5 self-start">
                    <div className="card mb-3 border-none" style={{ maxWidth: "540px" }}>
                        <div className="row g-0">
                            <div className="col-md-12">
                                <div className="card-body p-0">
                                    <h2 className="card-title text-2xl font-bold text-center mb-5">Price Summary</h2>

                                    <div className="flex flex-col gap-4">
                                        <div className="flex justify-between items-center">
                                            <span className="card-text text-gray-600">Price</span>
                                            <span className="font-bold text-gray-900">{`${process.env.PLATFORM_CURRENCY_SYMBOL}${totalPrice.toFixed(2)}`}</span>
                                        </div>

                                        <div className="flex justify-between items-center">
                                            <span className="card-text text-gray-600">VAT</span>
                                            <span className="font-bold text-gray-900">{`${process.env.PLATFORM_CURRENCY_SYMBOL}${(totalPrice * 0.2).toFixed(2)}`}</span>
                                        </div>

                                        <hr className="my-3 border-gray-300" />

                                        <div className="flex justify-between items-center">
                                            <span className="text-lg font-semibold text-gray-900">Total</span>
                                            <span className="text-xl font-bold text-gray-900">{`${process.env.PLATFORM_CURRENCY_SYMBOL}${(totalPrice + totalPrice * 0.2).toFixed(2)}`}</span>
                                        </div>

                                        <div className="mt-2">
                                            <ProceedToCheckoutButton />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}