"use server";

import { isLoggedIn } from "../../Helpers/function";
import Card from "../../ui/customer/components/cards";

export default async function Page() {
    const user = await isLoggedIn();

    return (
        <div className="min-h-[calc(100vh-4rem)] bg-gray-50 p-6 md:p-8">
            {/* Welcome Section */}
            <section className="mb-8">
                <h2 className="text-3xl font-bold text-gray-900">Welcome back, {user?.name || "Customer"}!</h2>
                <p className="text-gray-500 mt-2">
                    Manage your account, track your orders and keep your favourite products close.
                </p>
            </section>

            {/* Navigation Cards */}
            <section>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Your Account</h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                    <Card
                        icon="Wishlist"
                        title="Your Wishlists"
                        description="View and manage your favourite products."
                    />

                    <Card
                        icon="Briefcase"
                        title="Your Orders"
                        description="Track your orders and view your purchase history."
                    />
                </div>
            </section>
        </div>
    );
}
