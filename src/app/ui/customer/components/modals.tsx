'use client'
import { createCustomerMultipleAddress } from "@/app/lib/actions-customer";
import { useState } from "react";
export default function AddressModal({onClose}: {onClose: () => void}){
    const [errorState,setErrorState] = useState<boolean | undefined>(false);
    const handleSubmit = async(event:React.FormEvent<HTMLFormElement>)=>{
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const result = await createCustomerMultipleAddress(formData);
        result.status ? onClose() : setErrorState(true);
    }
    return(
        <>
            <div className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"  onClick={onClose} aria-hidden="true"/>

            <div id="crud-modal" tabIndex={-1}  className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto p-4">
                <div className="relative w-full max-w-md bg-gradient-to-br from-indigo-50 via-white to-purple-50 rounded-2xl border border-gray-200 shadow-xl p-4 md:p-6">
                    <div className="relative bg-neutral-primary-soft  shadow-xl rounded-base p-4 md:p-6">
                        <div className="flex items-center justify-between border-b border-default pb-4 md:pb-5">
                            <h3 className="text-lg font-medium text-heading">
                               Add New Address
                            </h3>
                            <button type="button" onClick = {onClose} className="text-body bg-transparent hover:bg-neutral-tertiary hover:text-heading rounded-base text-sm w-9 h-9 ms-auto inline-flex justify-center items-center" data-modal-hide="crud-modal">
                                <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18 17.94 6M18 18 6.06 6"/></svg>
                                <span className="sr-only">Close modal</span>
                            </button>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className="grid gap-4 grid-cols-2 py-4 md:py-6">
                                <div className="col-span-2">
                                    <label htmlFor="firstname" className="block mb-2.5 text-sm font-medium text-heading">Firstname</label>
                                    <input type="text" name="firstname" id="firstname" className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"  />
                                </div>
                                <div className="col-span-2">
                                    <label htmlFor="lastname" className="block mb-2.5 text-sm font-medium text-heading">Lastname</label>
                                    <input type="text" name="lastname" id="lastname" className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"  />
                                </div>
                                <div className="col-span-2">
                                    <label htmlFor="email" className="block mb-2.5 text-sm font-medium text-heading">Email</label>
                                    <input type="text" name="email" id="email" className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"  />
                                </div>
                                <div className="col-span-2">
                                    <label htmlFor="phone" className="block mb-2.5 text-sm font-medium text-heading">Phone</label>
                                    <input type="text" name="phone" id="phone" className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"  />
                                </div>
                                <div className="col-span-2">
                                    <label htmlFor="add_line_one" className="block mb-2.5 text-sm font-medium text-heading">Address line one</label>
                                    <input type="text" name="add_line_one" id="add_line_one" className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"  />
                                </div>
                                <div className="col-span-2">
                                    <label htmlFor="add_line_two" className="block mb-2.5 text-sm font-medium text-heading">Address line two</label>
                                    <input type="text" name="add_line_two" id="add_line_two" className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"  />
                                </div>
                                <div className="col-span-2 sm:col-span-1">
                                    <label htmlFor="city" className="block mb-2.5 text-sm font-medium text-heading">Town</label>
                                    <input type="text" name="city" id="city" className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"/>
                                </div>
                                <div className="col-span-2 sm:col-span-1">
                                    <label htmlFor="county" className="block mb-2.5 text-sm font-medium text-heading">County</label>
                                     <input type="text" name="county" id="county" className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"  />
                                </div>
                                <div className="col-span-2 sm:col-span-1">
                                    <label htmlFor="country" className="block mb-2.5 text-sm font-medium text-heading">Country</label>
                                    <input type="text" name="country" id="country" className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"/>
                                </div>
                                <div className="col-span-2 sm:col-span-1">
                                    <label htmlFor="category" className="block mb-2.5 text-sm font-medium text-heading">Postcode</label>
                                     <input type="text" name="postcode" id="postcode" className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"  />
                                </div>
                                
                            </div>
                            <div className="flex justify-end space-x-4 border-t border-default pt-4 md:pt-6">
                                <button type="button" onClick={onClose} className="SecondaryBtn m-3 p-3">
                                    Cancel
                                </button>     
                                <button type="submit" className="PrimaryBtn m-3 p-3">
                                    Add address
                                </button>
                                {errorState? <p>something error occured</p> : ''}
                            </div>
                        </form>
                    </div>
                </div>
            </div> 
        </>
    )
}