import { Suspense } from "react";
import Navbar from "@/app/ui/Home/navbar";
import Skeleton from "@/app/ui/common/loading-skeleton";
import { getCustomerById, isLoggedIn } from "@/app/Helpers/function";
import { Customer } from "@/app/lib/definitions";
import Icon from "@/app/ui/common/svg-tiles";
import { AddAdressButtonWrapper } from "@/app/ui/common/buttons";
export default async function Page({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    //await redirectToLoginIfNotAuthenticated();D2wvz8Lp2m
    const user = await isLoggedIn();
    const productUserId = id+'____'+user?.id;

    const response = user?.id ? await getCustomerById({ id: user.id }) : null;
    const getCustomerData = response?.data[0] || null;
    return (
        <div className="min-h-screen bg-[#FDFDFD]">
            <Navbar />
            <Suspense fallback={<Skeleton />}>
                <ProductDetails id={productUserId} getCustomerData={getCustomerData} userId = {user?.id}/>
            </Suspense>
        </div>
    );
}
async function ProductDetails({
    id,
    getCustomerData,
    userId,
}: {
    id: string;
    getCustomerData: Customer | null;
    userId: string | undefined;
}) {
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

    const result = [ getCustomerData, ...(addressData.data || []),]

    console.log("Merged Address Data:", result);
    if (!res.ok)
        return (
            <div className="p-20 text-center">Product not found</div>
        );
    const { data } = await res.json();
    if (!data)
        return <div className="p-20 text-center">No data found</div>;

    return (
        <>
            <div className="flex gap-6 max-w-6xl mx-auto px-6 py-12">
                <div className="main-container-user w-4/5 border border-gray-200 rounded-[2.5rem] bg-white shadow-sm p-6">
                    <div className="head-items flex gap-6 justify-between">
                        <h3 className="text-xl mb-4">
                            {" "}
                            Delivery Address
                        </h3>
                        <AddAdressButtonWrapper />
                    </div>
                    {result ? (
                        <div className="flex flex-row flex-wrap gap-4 w-full mt-4">
                            {result.map((item, index) => (
                                <div
                                    key={index}
                                    className="cards flex-1 min-w-[250px] max-w-[300px] border border-gray-200 bg-white p-6 rounded-xl shadow-sm hover:border-blue-400 transition-all"
                                >
                                    <label className="relative flex flex-col cursor-pointer">
                                        <input
                                            type="radio"
                                            name="delivery-address"
                                            id={`delivery-address-${item._id}`}
                                            value={item._id}
                                            className="peer sr-only"
                                        />

                                        <div className="mt-1 flex h-5 w-5 items-center justify-center rounded-full border-2 border-gray-300 peer-checked:border-blue-600 peer-checked:bg-blue-600 transition-colors">
                                            <div className="h-2 w-2 rounded-full bg-white" />
                                        </div>

                                        <div className="mt-4">
                                            <div className="flex items-center justify-between">
                                                <h4 className="text-lg font-bold text-gray-900 tracking-tight">
                                                    {item.firstname}{" "}
                                                    {item.lastname}
                                                </h4>
                                                <span className="hidden peer-checked:block text-xs font-bold text-blue-600 uppercase tracking-wider">
                                                    Selected
                                                </span>
                                            </div>

                                            <div className="mt-2 text-sm leading-6 text-gray-600">
                                                <p>
                                                    {" "}
                                                    {
                                                        item.customer_addr_one
                                                    }{" "}
                                                    ,{" "}
                                                    {
                                                        item.customer_addr_two
                                                    }
                                                </p>
                                                <p>
                                                    {" "}
                                                    {
                                                        item.customer_city
                                                    }{" "}
                                                    ,{" "}
                                                    {
                                                        item.customer_county
                                                    }{" "}
                                                    ,{" "}
                                                    {
                                                        item.customer_postcode
                                                    }{" "}
                                                </p>
                                                <p className="font-medium text-gray-800">
                                                    {" "}
                                                    {
                                                        item.customer_country
                                                    }
                                                </p>
                                            </div>

                                            <button
                                                type="button"
                                                className="group mt-4 flex items-center gap-1 text-sm font-semibold hover:text-blue-800 transition-colors"
                                            >
                                                Edit Address
                                                <span className="transform transition-transform group-hover:translate-x-1">
                                                    <Icon name="Arrowright" />
                                                </span>
                                            </button>
                                        </div>
                                    </label>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <></>
                    )}
                </div>

                <div className="main-container-product-details w-1/5 border border-gray-200 rounded-[2.5rem] bg-white shadow-sm p-6">
                    some dummy data
                </div>
            </div>
        </>
    );
}