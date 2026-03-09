'use server'
import { isLoggedIn } from "../Helpers/function"
import CustomerSideBar from "../ui/customer/components/sidebar";
import Card from "../ui/customer/components/cards";
export default async function Page() {
    const user = await isLoggedIn();

    return (
        <div className="flex">
            <CustomerSideBar />
            <main className="ml-64 p-8">
                <h2 className="text-2xl font-semibold mt-16">Welcome {user?.name}</h2>
                <div className="wrap-user-navigation-area mt-4 top-24 grid grid-cols-3 gap-4">
                    <Card icon={'Briefcase'} title={'Your orders'} description={'See your orders here.'} />
                    <Card icon={'Wishlist'} title={'Your wishlist'} description={'See your wishlist here.'} />
                    <Card icon={'Purchase'} title={'Your purchase'} description={'See your purchase here.'} />
                </div>

            </main>
        </div>

    )
}