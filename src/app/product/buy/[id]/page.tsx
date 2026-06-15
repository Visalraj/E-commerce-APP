'use server';
import { Suspense } from "react";
import Navbar from "@/app/ui/Home/navbar";
import Skeleton from "@/app/ui/common/loading-skeleton";
import { getCustomerById, isLoggedIn } from "@/app/Helpers/function";
import { Customer } from "@/app/lib/definitions";
import ProductBuyPage from "@/app/ui/customer/components/product-buy-page";
import Image from "next/image";
import { cookies } from "next/headers";
export default async function Page({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    //await redirectToLoginIfNotAuthenticated();
    const user = await isLoggedIn();
    const productUserId = id + "____" + user?.id;

    const response = user?.id ? await getCustomerById({ id: user.id }) : null;
    const getCustomerData = response?.data[0] || null;
    return (
        <div className="min-h-screen bg-[#FDFDFD]">
            <Navbar />
            <Suspense fallback={<Skeleton />}>
                <ProductDetails id={productUserId} getCustomerData={getCustomerData} userId={user?.id} />
            </Suspense>
        </div>
    );
}


async function ProductDetails({id,getCustomerData, userId,}: { id: string; getCustomerData: Customer | null; userId: string | undefined;}) {
    const res = await fetch(`${process.env.API_URL}top-deals/${id}`, {
        cache: "no-store",
    });

    const response = await fetch(`${process.env.API_URL}top-deals/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            type: "user_address",
            userId: userId,
        }),
        cache: "no-store",
    });
    const addressData = await response.json();

    const result = [getCustomerData, ...(addressData.data || [])];
    if (!res.ok || result.length === 0) return <div className="p-20 text-center">Product not found</div>;
    const { data } = await res.json();
    if (!data) return <div className="p-20 text-center">No data found</div>;

    const quantity = parseInt((await cookies()).get("selected_quantity")?.value ?? "1");

    return (
        <>
            <div className="flex gap-6 max-w-6xl mx-auto px-6 py-6">
                {/* Left Column */}
                <div className="w-4/5 flex flex-col gap-4">
                    {/* Delivery Address */}
                    {result.length > 0 && <ProductBuyPage customerData={result} />}
                </div>

                {/* Right Column */}
                <div className="w-1/4">
                    <div className="sticky top-6 bg-white rounded-3xl border border-gray-100 shadow-lg p-6">
                        <h3 className="text-2xl font-bold mb-6">Order Summary</h3>

                        {/* Product */}
                        <div className="flex items-center gap-4 pb-5 border-b border-gray-100">
                            <div className="w-20 h-20 bg-gray-50 rounded-2xl flex items-center justify-center">
                                <Image
                                    src={
                                        data.images?.[0]
                                            ? `${process.env.NEXT_PUBLIC_CLOUDINARY_URL}${data.images[0]}`
                                            : "https://flowbite.com/docs/images/products/apple-watch.png"
                                    }
                                    width={80}
                                    height={80}
                                    alt="product image"
                                    className="object-contain"
                                />
                            </div>

                            <div className="flex-1">
                                <h4 className="font-semibold text-lg text-gray-900">{data.product_name}</h4>

                                <p className="text-sm text-gray-500 mt-1">Quantity: {quantity}</p>

                                <p className="text-xl font-bold mt-2 text-gray-900">${data.product_price}</p>
                            </div>
                        </div>

                        {/* Price Breakdown */}
                        <div className="mt-6 space-y-3">
                            <div className="flex justify-between text-gray-600">
                                <span>Subtotal</span>
                                <span>${data.product_price}</span>
                            </div>

                            <div className="flex justify-between text-gray-600">
                                <span>Shipping</span>
                                <span>Free</span>
                            </div>

                            <div className="flex justify-between text-gray-600">
                                <span>Tax</span>
                                <span>$0.00</span>
                            </div>

                            <div className="border-t pt-4 flex justify-between">
                                <span className="font-semibold text-lg">Total</span>
                                <span className="font-bold text-2xl">${data.product_price}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
