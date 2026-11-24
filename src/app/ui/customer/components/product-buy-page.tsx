"use client";

import {  CustomerBuyPageData, Products_schema } from "@/app/lib/definitions";
import Icon from "@/app/ui/common/svg-tiles";
import { AddAdressButtonWrapper } from "@/app/ui/common/ui-elements";
import { useState } from "react";
    
export  function ProductBuyPage({ customerData, cart }: { customerData: CustomerBuyPageData[] | null; cart: Products_schema }) {
    const result = customerData?.flat() ?? [];
    const cartData = cart ? [cart] : [];
    const [selectedAddressId, setSelectedAddressId] = useState(result.length > 0 ? result[0]._id : "");

    const handleSubmit = async () => {
        try {
            const response = await fetch("/api/stripe/create-checkout-session", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    products: cartData,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Checkout failed");
            }

            if (data.url) {
                window.location.href = data.url;
            }
        } catch (error) {
            console.error("Checkout error:", error);
        }
    };

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
                <div className="rounded-[2.5rem] bg-white shadow-sm p-6 flex justify-end mt-14">
                    <button   type="button" onClick={() => handleSubmit()} form="checkoutForm" className="PrimaryBtn px-4 py-2 ">
                       {<> Pay Now <Icon name="Arrowright" /></> }
                    </button> 
                </div>

            </div>
        </>
    );
}

    