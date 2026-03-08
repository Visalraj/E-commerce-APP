import { Suspense } from "react";
import Navbar from "@/app/ui/Home/navbar";
import Skeleton from "@/app/ui/common/loading-skeleton";
import { isUserLoggedIn } from "@/app/Helpers/function";
export default async function Page({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const user = await isUserLoggedIn();
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

    if (!res.ok) return ( <div className="p-20 text-center">Product not found</div>);
    const { data } = await res.json();
    if (!data) return <div className="p-20 text-center">No data found</div>;

    return (
        <>
            
        </>
    );  
}