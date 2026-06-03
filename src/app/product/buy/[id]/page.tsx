import { Suspense } from "react";
import Navbar from "@/app/ui/Home/navbar";
import Skeleton from "@/app/ui/common/loading-skeleton";
import { getCustomerById, isLoggedIn } from "@/app/Helpers/function";
import { Customer } from "@/app/lib/definitions";
import ProductBuyPage from "@/app/ui/customer/components/product-buy-page";
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

    
   return (
       <>
           <div className="flex gap-6 max-w-6xl mx-auto px-6 py-6">
               {/* Left Column */}
               <div className="w-4/5 flex flex-col gap-4">
                   {/* Delivery Address */}
                    {result.length > 0 && <ProductBuyPage customerData={result} />}                  
               </div>

               {/* Right Column */}
               <div className="w-1/5">
                   <div className="sticky top-6 border border-gray-200 rounded-[2.5rem] bg-white shadow-sm p-6 h-[400px] overflow-y-auto">
                       <h3 className="text-xl mb-4">Order Summary</h3>

                       <p className="text-gray-600">
                           There are many variations of passages of Lorem Ipsum available, but the majority have
                           suffered alteration in some form, by injected humour, or randomised words which dont look
                           even slightly believable.
                       </p>
                   </div>
               </div>
           </div>
       </>
   );
}
