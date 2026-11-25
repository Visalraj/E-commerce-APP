import Image from "next/image";
import { getUserWishlists } from "@/app/lib/actions-customer";
import { trimCharacters } from "@/app/Helpers/function";


export default async function Page() {
    const wishlists = await getUserWishlists();
    const response = wishlists?.entities.flat() ?? [];
    return (
        <>
            <h3 className="text-2xl font-semibold mb-4">Your Wishlists</h3>

            <div className="flex gap-6 items-start">
                {/* Wishlist - Left Column */}
                <div className="w-3/5">
                    {(response && response).map((item, i) => (
                        <div className="border rounded-lg p-4 mt-4 bg-white shadow-sm" key={i}>
                            <div className="flex gap-4 items-center">
                                <Image
                                    src="/images/slider-two.jpg"
                                    alt="Christmas Sale"
                                    height={100}
                                    width={100}
                                    className="rounded-lg"
                                />

                                <div className="flex-1">
                                    <h5 className="text-lg font-semibold">{item.product.product_name}</h5>

                                    <p className="text-sm text-gray-500 mt-1">
                                        {trimCharacters(item.product.product_desc)}
                                    </p>

                                    <p className="font-semibold mt-2">{`${process.env.NEXT_PUBLIC_PLATFORM_CURRENCY_SYMBOL}${item.product.product_price}`}</p>

                                    <div className="flex items-center gap-3 mt-3 w-fit">
                                        <label htmlFor={`quantity-${i}`} className="text-sm whitespace-nowrap">
                                            Quantity:
                                        </label>

                                        <select
                                            id={`quantity-${i}`}
                                            className="border rounded px-3 py-2 w-20 shrink-0 bg-white"
                                            defaultValue={item.quantity}
                                        >
                                            <option value="1">1</option>
                                            <option value="2">2</option>
                                            <option value="3">3</option>
                                            <option value="4">4</option>
                                            <option value="5">5</option>
                                        </select>
                                    </div>

                                    <div className="flex flex-wrap gap-2 mt-4">
                                        <button
                                            type="button"
                                            className="SecondaryBtn text-white text-sm px-4 py-2 rounded-md"
                                        >
                                            Remove from Wishlist
                                        </button>

                                        <button
                                            type="button"
                                            className="PrimaryBtn text-white text-sm px-5 py-2 rounded-md"
                                        >
                                            Buy Now
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Order Summary - Right Column */}
                <div className="w-1/4 sticky top-6 bg-white rounded-3xl border border-gray-100 shadow-lg p-6 mt-4">
                    <h3 className="text-2xl font-bold mb-6">Order Summary</h3>

                    <div className="mt-6 space-y-3">
                        <div className="flex justify-between text-gray-600">
                            <span>Subtotal</span>
                            <span>{process.env.PLATFORM_CURRENCY_SYMBOL}</span>
                        </div>

                        <div className="flex justify-between text-gray-600">
                            <span>Shipping</span>
                            <span>Free</span>
                        </div>

                        <div className="flex justify-between text-gray-600">
                            <span>Tax</span>
                            <span>{process.env.PLATFORM_CURRENCY_SYMBOL}0.00</span>
                        </div>

                        <div className="border-t pt-4 flex justify-between">
                            <span className="font-semibold text-lg">Total</span>
                            <span className="font-bold text-2xl">{process.env.PLATFORM_CURRENCY_SYMBOL}</span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
