'use client';
import { useRouter } from 'next/navigation';
import { createCustomer } from "@/app/lib/actions-customer";
import Notifications, { CreateButton } from '../common/ui-elements';
import { useState } from 'react';

export default function CustomerRegForm() {
    const router = useRouter();
    const [errors, setErrors] = useState<Record<string, string[]>>({},);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [notifications, setNotifications] = useState(false);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsSubmitting(true);
        setNotifications(true);

        const formData = new FormData(event.currentTarget);
        
        try {
            const result = await createCustomer(formData);
            if (result.status && result.status === 200 && result.redirectUrl != '') {
                router.push(result.redirectUrl!);
            } else if(result?.errors){
                setErrors(result.errors);
               // setIsSubmitting(false);
            }
        } catch (error) {
            console.log(error);
        }
    }
    const heading = "Personal Information";

    return (
        <>

            {notifications && <Notifications onClose={() => setNotifications(false)} />}
            <div className="flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-purple-50 px-6 py-8">
                <div className="w-full max-w-4xl rounded-2xl border border-gray-200 bg-white shadow-xl p-10">
                    <h2 className="text-3xl font-bold text-center text-gray-900 mb-10">
                        {heading}
                    </h2>

                    <form onSubmit={handleSubmit} method="POST" className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="text-sm font-medium text-gray-700" htmlFor='Firstname'>
                                Firstname
                            </label>
                            <input type="text" name="customer_fname"  className="mt-2 w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"  id='Firstname'/>
                            {errors["customer_fname"] && (<p className="mt-1 text-sm text-red-400"> {errors["customer_fname"][0]} </p> )}

                        </div>

                        <div>
                            <label className="text-sm font-medium text-gray-700" htmlFor='Lastname'>
                                Lastname
                            </label>
                            <input type="text" name="customer_lname" className="mt-2 w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500" id='Lastname'/>
                            {errors["customer_lname"] && (<p className="mt-1 text-sm text-red-400"> {errors["customer_lname"][0]} </p> )}
                        </div>

                        <div>
                            <label className="text-sm font-medium text-gray-700" htmlFor='Age'>
                                Age
                            </label>
                            <input type="number" name="customer_age" className="mt-2 w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500" id='Age'/>
                            {errors["customer_age"] && (<p className="mt-1 text-sm text-red-400"> {errors["customer_age"][0]} </p> )}
                        </div>

                        <div>
                            <label className="text-sm font-medium text-gray-700" htmlFor='Email'>
                                Email
                            </label>
                            <input  type="email" name="customer_email" className="mt-2 w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500" id='Email'/>
                            {errors["customer_email"] && (<p className="mt-1 text-sm text-red-400"> {errors["customer_email"][1]} </p> )}
                        </div>

                        <div className="md:col-span-2">
                            <label className="text-sm font-medium text-gray-700" htmlFor='AddressLine1'>
                                Address Line 1
                            </label>   
                            <input type="text" name="customer_addr_one" className="mt-2 w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500" id='AddressLine1'/>
                            {errors["customer_addr_one"] && (<p className="mt-1 text-sm text-red-400"> {errors["customer_addr_one"][0]} </p> )}
                        </div>

                        
                        <div className="md:col-span-2">
                            <label className="text-sm font-medium text-gray-700" htmlFor='AddressLine2'>
                                Address Line 2
                            </label>
                            <input type="text" name="customer_addr_two" className="mt-2 w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500" id='AddressLine2'/>
                            {errors["customer_addr_two"] && (<p className="mt-1 text-sm text-red-400"> {errors["customer_addr_two"][0]} </p> )}
                        </div>

                        <div>
                            <label className="text-sm font-medium text-gray-700" htmlFor='City'>
                                City
                            </label>
                            <input type="text" name="customer_city" className="mt-2 w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500" id='City'/>
                            {errors["customer_city"] && (<p className="mt-1 text-sm text-red-400"> {errors["customer_city"][0]} </p> )}
                        </div>

                        <div>
                            <label className="text-sm font-medium text-gray-700" htmlFor='County'>
                                County
                            </label>
                            <input   type="text" name="customer_county" className="mt-2 w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500" id='County'/>
                            {errors["customer_county"] && (<p className="mt-1 text-sm text-red-400"> {errors["customer_county"][0]} </p> )}
                        </div>

                        <div>
                            <label className="text-sm font-medium text-gray-700" htmlFor='Country'>
                                Country
                            </label>
                            <input   type="text" name="customer_country" className="mt-2 w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500" id='Country'/>
                            {errors["customer_country"] && (<p className="mt-1 text-sm text-red-400"> {errors["customer_country"][0]} </p> )}
                        </div>

                        <div>
                            <label className="text-sm font-medium text-gray-700" htmlFor='Postcode'>
                                Postcode
                            </label>
                            <input type="text" name="customer_postcode" className="mt-2 w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500" id='Postcode'/>
                            {errors["customer_postcode"] && (<p className="mt-1 text-sm text-red-400"> {errors["customer_postcode"][0]} </p> )}
                        </div>

                            
                        <div className="md:col-span-2 flex justify-end">
                            <CreateButton isSubmitting={isSubmitting} />
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}
