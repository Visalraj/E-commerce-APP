import Image from "next/image";
import Link from "next/link";
import SwipperWrapper from "../components/Swipper-Wrapper";

export default function TopDeals() {
    return (
        <>
            <div className="topdeals-container p-3">
                <h2 className="text-2xl font-bold mt-5 mb-4">Top Deals</h2>
                <SwipperWrapper>
                    {Array.from({ length: 10 }).map((_, i) => (
                        <div key={i} >
                            <div  className="relative w-fit max-w-sm bg-neutral-primary-soft p-6 border border-default rounded-md shadow-xs">
                                <Link href="">
                                    <Image className="rounded-base mb-6 m-auto"  src="https://flowbite.com/docs/images/products/apple-watch.png"   alt="product image" width={200} height={200} />
                                </Link>
                                <div>
                                    <Link href="#">
                                        <h5 className="text-xl text-heading font-semibold tracking-tight">
                                            Apple Watch Series {i} GPS, Aluminium
                                            Case, Starlight
                                        </h5>
                                    </Link>
                                    <div className="flex items-center justify-between mt-6">
                                        <span className="text-3xl font-extrabold text-heading">
                                            ${i}99
                                        </span>
                                        <button type="button" className="inline-flex items-center  text-white bg-brand hover:bg-brand-strong box-border border border-transparent focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base text-sm px-3 py-2 focus:outline-none">
                                            <svg className="w-4 h-4 me-1.5" aria-hidden="true"  xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                                fill="none" viewBox="0 0 24 24"  >
                                                <path stroke="currentColor"    strokeLinecap="round" strokeLinejoin="round"  strokeWidth="2"
                                                d="M5 4h1.5L9 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm-8.5-3h9.25L19 7H7.312" />
                                            </svg>
                                            Add to cart
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </SwipperWrapper>
            </div>
        </>
    );
}