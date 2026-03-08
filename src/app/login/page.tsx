'use server'
import Navbar from "../ui/Home/navbar";
import Loginform from "../ui/Home/login-form";
export default async function Page() {
    return (
        <>
            <Navbar />
            <div className="w-1/3 rounded-md m-auto relative ">
                <Loginform />
            </div>
        </>
    )
}