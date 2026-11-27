import Image from "next/image";
import { getUserWishlists } from "@/app/lib/actions-customer";
import { trimCharacters } from "@/app/Helpers/function";
import CartWrapper from "@/app/cart/CartWrapper";
import ProductActions from "@/app/ui/customer/components/product-action";
import { WishlistResponse } from "@/app/lib/definitions";

export default async function Page() {
    const wishlists = await getUserWishlists();
    const response = wishlists?.entities.flat() ?? [];
    const serializedResponse = JSON.parse(JSON.stringify(response));
    return (
        <>
            <h3 className="text-2xl font-semibold mb-4">Your Wishlists</h3>

            <div className="flex gap-6 items-start">
                {/* Wishlist - Left Column */}
                <div className="w-3/5">
                    {(serializedResponse && serializedResponse).map((item:WishlistResponse, i) => (
                        <CartWrapper initialCartItems={[item]} key={item.product._id}>
                            <div className="border rounded-lg p-4 mt-4 bg-white shadow-sm">
                                <div className="flex gap-4 items-center">
                                    <Image
                                        src={`${process.env.NEXT_PUBLIC_CLOUDINARY_URL}${item.product.images}`}
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

                                        <div className="flex flex-col gap-3 mt-3 w-full [&_.quantity-input]:!mt-0 [&_.quantity-input]:w-full [&_.quantity-input_label]:text-sm [&_.quantity-input_select]:!w-20 [&_.quantity-input_select]:!py-2 [&_.quantity-input_select]:!text-sm [&_.wrap-btns]:!mt-0 [&_.wrap-btns]:!pt-0 [&_.wrap-btns]:flex [&_.wrap-btns]:flex-row [&_.wrap-btns]:w-full [&_.wrap-btns]:gap-3 [&_.wrap-btns>button]:flex-1 [&_.wrap-btns>a]:flex-1 [&_.wrap-btns>a]:w-auto [&_.wrap-btns_button]:!min-h-[48px] [&_.wrap-btns_button]:!h-12 [&_.wrap-btns_button]:!px-3 [&_.wrap-btns_button]:!py-2 [&_.wrap-btns_button]:!text-sm [&_.wrap-btns_button_svg]:!size-5 [&_.quantity-input]:!flex [&_.quantity-input]:!flex-row [&_.quantity-input]:!items-center [&_.quantity-input]:!gap-3 [&_.quantity-input_label]:!mb-0 [&_.quantity-input_select]:!mt-0">
                                            <ProductActions
                                                id={item.product._id.toString()}
                                                price={item.product.product_price}
                                                isWishlisted={true}
                                                currentQuantity={item.quantity === undefined ? 1 : item.quantity}
                                                from="wishlist"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </CartWrapper>
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
