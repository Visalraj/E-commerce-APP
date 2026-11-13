"use client";

import {  CustomerBuyPageData } from "@/app/lib/definitions";
import Icon from "@/app/ui/common/svg-tiles";
import { AddAdressButtonWrapper } from "@/app/ui/common/ui-elements";
import { useState } from "react";
import {loadStripe} from "@stripe/stripe-js";

export  function ProductBuyPage({ customerData }: { customerData: CustomerBuyPageData[] | null }) {
    const result = customerData?.flat() ?? [];
    const [paymentText, setPaymentText] = useState("");
    const [selectedAddressId, setSelectedAddressId] = useState(result.length > 0 ? result[0]._id : "");

    const handleSubmit = async()=> {
        const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "");
        console.log(stripe);
    };

    const handlePaymentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedPaymentMethod = event.target.value;
        setPaymentText("Pay Now");
        console.log("Selected Payment Method:", selectedPaymentMethod);
    }
    return (
        <>
            {/* OUTER LAYOUT CONTAINER (NOT FORM) */}
            <div className="flex flex-col gap-4">
                {/* DELIVERY ADDRESS + FORM ONLY HERE */}
                <div className="border border-gray-200 rounded-[2.5rem] bg-white shadow-sm p-6 h-[400px] overflow-y-auto">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-xl">Delivery Address</h3>
                        <AddAdressButtonWrapper />
                    </div>

                    {/* FORM STARTS HERE */}
                    <form id="checkoutForm">
                        <div className="flex flex-row flex-wrap gap-4 w-full mt-4">
                            {result?.map((item, index) => (
                                <div
                                    key={index}
                                    className="flex-1 min-w-[250px] max-w-[300px] border border-gray-200 bg-white p-6 rounded-xl shadow-sm hover:border-blue-400 transition-all"
                                    id={item._id}
                                >
                                    <label className="relative flex flex-col cursor-pointer">
                                        <input
                                            type="radio"
                                            name="delivery-address"
                                            value={item._id}
                                            className="peer sr-only"
                                            onChange={() => setSelectedAddressId(item._id)}
                                            defaultChecked={index === 0}
                                        />

                                        <div className="mt-1 flex h-5 w-5 items-center justify-center rounded-full border-2 border-gray-300 peer-checked:border-blue-600 peer-checked:bg-blue-600">
                                            <div className="h-2 w-2 rounded-full bg-white" />
                                        </div>

                                        <div className="mt-4">
                                            <h4 className="text-lg font-bold">
                                                {item.firstname} {item.lastname}
                                            </h4>

                                            <div className="mt-2 text-sm text-gray-600">
                                                <p>
                                                    {item.customer_addr_one}, {item.customer_addr_two}
                                                </p>
                                                <p>
                                                    {item.customer_city}, {item.customer_county},{" "}
                                                    {item.customer_postcode}
                                                </p>
                                                <p>{item.customer_country}</p>
                                            </div>

                                            <button
                                                type="button"
                                                className="group mt-4 flex items-center gap-1 text-sm font-semibold"
                                            >
                                                Edit Address
                                                <span className="group-hover:translate-x-1 transition-transform">
                                                    <Icon name="Arrowright" />
                                                </span>
                                            </button>
                                        </div>
                                    </label>
                                </div>
                            ))}
                        </div>
                        <input type="hidden" name="customer_address_id" value={selectedAddressId} />
                    </form>
                </div>

                {/* PAYMENT (OUTSIDE FORM) */}
                <div className="border border-gray-200 rounded-[2.5rem] bg-white shadow-sm p-6">
                    <h3 className="text-xl mb-4">Payment Method</h3>

                    <label className="flex items-center gap-3">
                        <input type="radio" name="payment" value="card" onChange={handlePaymentChange} />
                        Card
                    </label>
                </div>

                {/* SUBMIT (OUTSIDE FORM) */}
                <div className="border border-gray-200 rounded-[2.5rem] bg-white shadow-sm p-6">
                    <button   type="button" onClick={() => handleSubmit()} form="checkoutForm" className="PrimaryBtn px-4 py-2">
                        {paymentText || "Select Payment Method"}
                    </button>
                </div>
            </div>
        </>
    );
}

    