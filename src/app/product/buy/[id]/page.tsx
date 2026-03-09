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
                <ProductDetails id={productUserId} getCustomerData={getCustomerData} />
            </Suspense>
        </div>
    );
}
async function ProductDetails({ id, getCustomerData }: { id: string; getCustomerData: Customer | null }) {
    const res = await fetch(`${process.env.API_URL}top-deals/${id}`, {
        next: { revalidate: 0 },
    });

    if (!res.ok) return ( <div className="p-20 text-center">Product not found</div>);
    const { data } = await res.json();
    if (!data) return <div className="p-20 text-center">No data found</div>;

    return (
        <>
            <div className="flex gap-6 max-w-6xl mx-auto px-6 py-12">
                <div className="main-container-user w-4/5 border border-gray-200 rounded-[2.5rem] bg-white shadow-sm p-6">
                    <div className="head-items flex gap-6 justify-between">
                        <h3 className="text-xl mb-4"> Delivery Address</h3>
                        <AddAdressButtonWrapper/>            
                    </div>
                    {getCustomerData ? (
                        <>
                            <div className="cards">
                                <label className="relative flex cursor-pointer rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:border-blue-400 has-[:checked]:border-blue-600 has-[:checked]:ring-1 has-[:checked]:ring-blue-600 w-full md:w-2/4">
                                    
                                    <input type="radio"  name="delivery-address" id="delivery-address"  value="0" className="peer sr-only" />

                                    <div className="mt-1 flex h-5 w-5 items-center justify-center rounded-full border-2 border-gray-300 peer-checked:border-blue-600 peer-checked:bg-blue-600 transition-colors">
                                        <div className="h-2 w-2 rounded-full bg-white" />
                                    </div>

                                    <div className="ml-4 flex-1">
                                        <div className="flex items-center justify-between">
                                            <h4 className="text-lg font-bold text-gray-900 tracking-tight">
                                                { getCustomerData.firstname}{" "} {  getCustomerData.lastname }
                                            </h4>
                                            <span className="hidden peer-checked:block text-xs font-bold text-blue-600 uppercase tracking-wider">
                                                Selected
                                            </span>
                                        </div>

                                        <div className="mt-2 text-sm leading-6 text-gray-600">
                                            <p> { getCustomerData.customer_addr_one } ,{" "} {  getCustomerData.customer_addr_two}</p>
                                            <p> { getCustomerData.customer_city},{" "}  {    getCustomerData.customer_county   },{" "}  {   getCustomerData.customer_postcode   } </p>
                                            <p className="font-medium text-gray-800">  {  getCustomerData.customer_country  }</p>
                                        </div>

                                        <button type="button"  className="group mt-4 flex items-center gap-1 text-sm font-semibold hover:text-blue-800 transition-colors" >
                                            Edit Address
                                            <span className="transform transition-transform group-hover:translate-x-1">
                                                <Icon name="Arrowright" />
                                            </span>
                                        </button>
                                    </div>
                                </label>
                            </div>
                        </>
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