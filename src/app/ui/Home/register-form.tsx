'use client';
import { CreateButtonComponent } from "../customer/components/create-button";
import { createCustomer } from "@/app/lib/actions-customer";
import { useRouter } from 'next/navigation';

export default function CustomerRegForm() {
    const router = useRouter();
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        try {
            const result = await createCustomer(formData);
            if (result.status && result.status === 200 && result.redirectUrl != '') {
                router.push(result.redirectUrl!);
            }
        } catch (error) {
            console.log(error);
        }
    }
    const heading = "Personal Information";

    return (
        //         <CreateButtonComponent />
        <div className="flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-purple-50 px-6 py-8">
            <div className="w-full max-w-4xl rounded-2xl border border-gray-200 bg-white shadow-xl p-10">
                <h2 className="text-3xl font-bold text-center text-gray-900 mb-10">
                    {heading}
                </h2>

                <form onSubmit={handleSubmit} method="POST" className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="text-sm font-medium text-gray-700">
                            Firstname
                        </label>
                        <input type="text" name="customer_fname"  className="mt-2 w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"  />
                    </div>

                    <div>
                        <label className="text-sm font-medium text-gray-700">
                            Lastname
                        </label>
                        <input type="text" name="customer_lname" className="mt-2 w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                    </div>

                    <div>
                        <label className="text-sm font-medium text-gray-700">
                            Age
                        </label>
                        <input type="number" name="customer_age" className="mt-2 w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                    </div>

                    <div>
                        <label className="text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <input  type="email" name="email" className="mt-2 w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                    </div>

                    <div className="md:col-span-2">
                        <label className="text-sm font-medium text-gray-700">
                            Address Line 1
                        </label>   
                        <input type="text" name="customer_addr_one" className="mt-2 w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                    </div>

                    {/* Address Line 2 */}
                    <div className="md:col-span-2">
                        <label className="text-sm font-medium text-gray-700">
                            Address Line 2
                        </label>
                        <input type="text" name="customer_addr_two" className="mt-2 w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                    </div>

                    <div>
                        <label className="text-sm font-medium text-gray-700">
                            City
                        </label>
                        <input type="text" name="customer_city" className="mt-2 w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                    </div>

                    <div>
                        <label className="text-sm font-medium text-gray-700">
                            County
                        </label>
                        <input   type="text" name="customer_county" className="mt-2 w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                    </div>

                    <div>
                        <label className="text-sm font-medium text-gray-700">
                            Country
                        </label>
                        <input   type="text" name="customer_country" className="mt-2 w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                    </div>

                    <div>
                        <label className="text-sm font-medium text-gray-700">
                            Postcode
                        </label>
                        <input type="text" name="customer_postcode" className="mt-2 w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                    </div>

                    <div className="md:col-span-2 flex justify-end">
                        <button type="submit" className="px-8 py-3 DefaultBtn">
                            Create
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
