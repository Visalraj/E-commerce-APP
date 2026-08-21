import Navbar from "@/app/ui/Home/navbar";
import { isLoggedIn } from "../Helpers/function";
import { Suspense } from "react";
import Skeleton from "../ui/common/loading-skeleton";
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

    return (
        <main className="container mx-auto px-6 py-12">
            <div className="flex flex-col md:flex-row gap-12">
                <div className="flex flex-col md:flex-col gap-12 bg-white p-10 rounded-[2.5rem] shadow-sm border border-gray-100 w-3/5">
                    <div className="card mb-3" style={{ maxWidth: "740px" }}>
                        <div className="row g-0">
                            <div className="col-md-4">
                                <img src="" className="img-fluid rounded-start" alt="..." />
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

                    <div className="card mb-3" style={{ maxWidth: "740px" }}>
                        <div className="row g-0">
                            <div className="col-md-4">
                                <img src="" className="img-fluid rounded-start" alt="..." />
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

                    <div className="card mb-3" style={{ maxWidth: "740px" }}>
                        <div className="row g-0">
                            <div className="col-md-4">
                                <img src="" className="img-fluid rounded-start" alt="..." />
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

                <div className="flex flex-col md:flex-col gap-12 bg-white p-10 rounded-[2.5rem] shadow-sm border border-gray-100 w-2/5">
                    <div className="card mb-3" style={{ maxWidth: "540px" }}>
                        <div className="row g-0">
                            <div className="col-md-4">
                                <img src="" className="img-fluid rounded-start" alt="..." />
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