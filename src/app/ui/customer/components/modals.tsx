export default function AddressModal({onClose}: {onClose: () => void}){
    return(
        <>
            <div id="crud-modal" tabIndex={-1}  className=" overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
                <div className="relative p-4 w-full max-w-md max-h-full">
                    <div className="relative bg-neutral-primary-soft border border-default rounded-base shadow-sm p-4 md:p-6">
                        <div className="flex items-center justify-between border-b border-default pb-4 md:pb-5">
                            <h3 className="text-lg font-medium text-heading">
                                Create new product
                            </h3>
                            <button type="button" onClick = {onClose} className="text-body bg-transparent hover:bg-neutral-tertiary hover:text-heading rounded-base text-sm w-9 h-9 ms-auto inline-flex justify-center items-center" data-modal-hide="crud-modal">
                                <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18 17.94 6M18 18 6.06 6"/></svg>
                                <span className="sr-only">Close modal</span>
                            </button>
                        </div>
                        <form action="#">
                            <div className="grid gap-4 grid-cols-2 py-4 md:py-6">
                                <div className="col-span-2">
                                    <label htmlFor="name" className="block mb-2.5 text-sm font-medium text-heading">Name</label>
                                    <input type="text" name="name" id="name" className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body" placeholder="Type product name" />
                                </div>
                                <div className="col-span-2 sm:col-span-1">
                                    <label htmlFor="price" className="block mb-2.5 text-sm font-medium text-heading">Price</label>
                                    <input type="number" name="price" id="price" className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body" placeholder="$2999" />
                                </div>
                                <div className="col-span-2 sm:col-span-1">
                                    <label htmlFor="category" className="block mb-2.5 text-sm font-medium text-heading">Category</label>
                                    <select id="category" className="block w-full px-3 py-2.5 bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand px-3 py-2.5 shadow-xs placeholder:text-body">
                                        <option >Select category</option>
                                        <option value="TV">TV/Monitors</option>
                                        <option value="PC">PC</option>
                                        <option value="GA">Gaming/Console</option>
                                        <option value="PH">Phones</option>
                                    </select>
                                </div>
                                <div className="col-span-2">
                                    <label htmlFor="description" className="block mb-2.5 text-sm font-medium text-heading">Product Description</label>
                                    <textarea id="description"  className="block bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full p-3.5 shadow-xs placeholder:text-body" placeholder="Write product description here"></textarea>                    
                                </div>
                            </div>
                            <div className="flex items-center space-x-4 border-t border-default pt-4 md:pt-6">
                                <button type="submit" className="inline-flex items-center  text-white bg-brand hover:bg-brand-strong box-border border border-transparent focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none">
                                    <svg className="w-4 h-4 me-1.5 -ms-0.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14m-7 7V5"/></svg>
                                    Add new product
                                </button>
                                <button data-modal-hide="crud-modal" type="button" className="text-body bg-neutral-secondary-medium box-border border border-default-medium hover:bg-neutral-tertiary-medium hover:text-heading focus:ring-4 focus:ring-neutral-tertiary shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none">Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div> 

        </>
    )
}