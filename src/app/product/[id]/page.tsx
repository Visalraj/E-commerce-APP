import { Suspense } from "react";
import Image from "next/image";
import Skeleton from "@/app/ui/common/loading-skeleton";
import Navbar from "@/app/ui/Home/navbar";
import { isLoggedIn } from "@/app/Helpers/function";
import ProductActions from "@/app/ui/customer/components/product-action";
import CartWrapper from "@/app/cart/CartWrapper";
import PriceSummary from "@/app/cart/price-summary";

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const user = await isLoggedIn();

    const productUserId = id+'____'+user?.id;
    return (
        <div className="min-h-screen bg-[#FDFDFD]">
            <Navbar />
            <Suspense fallback={<Skeleton />}>
                <ProductDetails id={productUserId} />
            </Suspense>
        </div>
    );
}

async function ProductDetails({ id }: { id: string }) {
    const res = await fetch(`${process.env.API_URL}top-deals/${id}`, {
        next: { revalidate: 0 },
    });

    const user = await isLoggedIn();
    if (!res.ok) return ( <div className="p-20 text-center">Product not found</div>);
    const { data } = await res.json();
    if (!data) return <div className="p-20 text-center">No data found</div>;   

    return (
        <CartWrapper initialCartItems={[data]}>
            <main className="container mx-auto px-6 py-12">
                <div className="flex flex-col md:flex-row gap-12 bg-white p-10 rounded-[2.5rem] shadow-sm border border-gray-100">
                    <div className="w-full md:w-1/2 aspect-square bg-gray-100 rounded-[2rem] overflow-hidden relative">
                        <Image
                            src={
                                data.images?.[0]
                                    ? `${process.env.NEXT_PUBLIC_CLOUDINARY_URL}${data.images[0]}`
                                    : "https://flowbite.com/docs/images/products/apple-watch.png"
                            }
                            alt="product image"
                            fill
                            className="object-cover rounded-base"
                        />
                    </div>
                    <div className="flex-1">
                        <h1 className="text-4xl font-bold">{data.product_name}</h1>
                        <PriceSummary userId={user?.id} from_page="product_page" />
                        <p className="text-gray-600 mt-4">{data.product_desc}</p>
                        <ProductActions
                            id={data._id}
                            price={data.product_price}
                            isWishlisted={data.isInWishlist}
                            currentQuantity={data.quantity === undefined ? 1 : data.quantity}
                        />
                    </div>
                </div>
            </main>
        </CartWrapper>
    );
}
