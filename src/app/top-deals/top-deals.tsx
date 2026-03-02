import Image from "next/image";
import Link from "next/link";
import SwipperWrapper from "../components/Swipper-Wrapper";
import { TopDealsResponse } from "../lib/definitions";

export default async function TopDeals() {
    const res = await fetch("http://localhost:3000/api/top-deals", {
        next: { revalidate: 60 },
    });
    const topDeals: TopDealsResponse = await res.json();
    return (
        <>
            <div className="topdeals-container p-3">
                <h2 className="text-2xl font-bold mt-5 mb-4">
                    Top Deals
                </h2>
                <SwipperWrapper>
                    {(topDeals &&
                        topDeals.status == 200 &&
                        topDeals.data.map((deal, i) => (
                            <div key={i}>
                                <div className="relative w-full max-w-sm bg-neutral-primary-soft p-6 border border-default rounded-md shadow-xs flex flex-col">
                                    <Link href={`/product/${deal._id}`}>
                                        <div className="relative w-full aspect-square mb-6">
                                            <Image src={
                                                    deal.images?.[0]
                                                        ? `${process.env.NEXT_PUBLIC_CLOUDINARY_URL}${deal.images[0]}`
                                                        : "https://flowbite.com/docs/images/products/apple-watch.png"
                                                } alt="product image" fill className="object-cover rounded-base" />
                                        </div>
                                    </Link>

                                    <div className="flex flex-col flex-grow">
                                        <h5 className="text-xl text-heading font-semibold tracking-tight">
                                            {deal.product_name}
                                        </h5>
                                        <p className="text-sm text-gray-500 line-clamp-2">
                                            {deal.product_desc}
                                        </p>

                                        <div className="flex items-center justify-between mt-auto pt-6">
                                            <span className="text-3xl font-extrabold text-heading">
                                                ${deal.product_price}
                                            </span>

                                            <button className="inline-flex items-center text-black bg-brand hover:bg-brand-strong rounded-base text-sm px-3 py-2">
                                                Add to cart
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))) ||
                        []}
                </SwipperWrapper>
            </div>
        </>
    );
}