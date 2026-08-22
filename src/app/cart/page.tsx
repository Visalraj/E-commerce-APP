import Navbar from "@/app/ui/Home/navbar";
import { isLoggedIn,trimCharacters } from "../Helpers/function";
import { Suspense } from "react";
import Skeleton from "../ui/common/loading-skeleton";
import { CartData } from "../lib/definitions";
import Image from "next/image";
import Icon from "../ui/common/svg-tiles";
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
    console.log("cartData", cartData);
    const result = cartData.data || [];
    if (!response.ok || result.length === 0) return <div className="p-20 text-center">Product not found</div>;

    return (
        <main className="container mx-auto px-6 py-12">
            <div className="flex flex-col md:flex-row gap-12">
                <div className="flex flex-col md:flex-col gap-12 bg-white p-10 rounded-[2.5rem] shadow-sm border border-gray-100 w-3/5">
                    {result.map((item: CartData, index: number) => (
                        <div key={index} className="card mb-3" style={{ maxWidth: "740px" }}>
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
                                        <h5 className="card-title font-bold">{(item.product_name).charAt(0).toUpperCase() + item.product_name.slice(1)}</h5>
                                        <p className="card-text">{trimCharacters(item.product_desc)}</p>
                                        <div className="flex flex-row gap-4">
                                            <p className="card-text mt-3">Quantity: </p>
                                            <select className="form-select form-select-sm mt-2" aria-label=".form-select-sm example" defaultValue={item.quantity} style={{ width: "5rem" }}>
                                                <option value="1">1</option>
                                                <option value="2">2</option>
                                                <option value="3">3</option>
                                                <option value="4">4</option>
                                                <option value="5">5</option>
                                            </select>
                                        </div>
                                        <hr className="my-4" />
                                        <p className="card-text">
                                            <button type="button"  className="btn border me-2 d-inline-flex align-items-center justify-content-center gap-2" style={{ width: "13rem" }} >
                                                <Icon name="Cart" />
                                                <span>Remove</span>
                                            </button>
                                           <button type="button"  className="btn border me-2 d-inline-flex align-items-center justify-content-center gap-2" style={{ width: "13rem" }} >
                                                <Icon name="Buy" />
                                                <span>Buy</span>
                                            </button>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="flex flex-col md:flex-col gap-12 bg-white p-10 rounded-[2.5rem] shadow-sm border border-gray-100 w-2/5">
                    <div className="card mb-3" style={{ maxWidth: "540px" }}>
                        <div className="row g-0">
                            <div className="col-md-4">
                                <Image
                                    src={"https://flowbite.com/docs/images/products/apple-watch.png"}
                                    className="img-fluid rounded-start"
                                    alt="..."
                                    width={200}
                                    height={200}
                                />
                            </div>
                            <div className="col-md-8">
                                <div className="card-body">
                                    <h5 className="card-title">Card title</h5>
                                    <p className="card-text">
                                        This is a wider card with supporting text below as a natural lead-in to
                                        additional content. This content is a little bit longer.
                                    </p>
                                    <p className="card-text">
                                        <small className="text-muted">Last updated 3 mins ago</small>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}