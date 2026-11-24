import Icon from "@/app/ui/common/svg-tiles";
import Popper from "@/app/ui/customer/components/popper";
import Navbar from "@/app/ui/Home/navbar";

export default async function ThanksPage({ params }: { params: Promise<{ id: string }> }) {
    const {id} = await params;
    return (
        <>
            <Popper />
            <Navbar />
            <div className="flex flex-col bg-red-50 px-8 py-24">
                <div className="inner-section ml-4">
                    <h1 className="text-3xl font-bold mb-4">Thank You!</h1>
                    <p className="text-lg">
                        Order Number:&nbsp;<span className="font-semibold">{id}</span>
                    </p>
                    <p className="text-lg">
                        Your order has been confirmed and you will receive a confirmation email shortly.
                    </p>
                    <div className="mt-6">
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded inline-flex items-center gap-2">
                            Print Receipt <Icon name="Arrowright" />
                        </button>
                    </div>
                </div>

                <div className="md:table-fixed py-16 px-4">
                    <table className="table-auto border border-red-300 w-3/4 ">
                        <thead>
                            <tr>
                            <th className="border border-red-300 px-4 py-2">Item</th>
                            <th className="border border-red-300 px-4 py-2">Price</th>
                            <th className="border border-red-300 px-4 py-2">Quantity</th>
                            <th className="border border-red-300 px-4 py-2">Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                            <td className="border border-red-300 px-4 py-2">The Sliding Mr. Bones (Next Stop, Pottersville)</td>
                            <td className="border border-red-300 px-4 py-2">Malcolm Lockyer</td>
                            <td className="border border-red-300 px-4 py-2">1961</td>
                            <td className="border border-red-300 px-4 py-2">1961</td>

                            </tr>
                            <tr>
                            <td className="border border-red-300 px-4 py-2">Witchy Woman</td>
                            <td className="border border-red-300 px-4 py-2">The Eagles</td>
                            <td className="border border-red-300 px-4 py-2">1972</td>
                            <td className="border border-red-300 px-4 py-2">1961</td>
                            </tr>
                            <tr>
                            <td className="border border-red-300 px-4 py-2">Shining Star</td>
                            <td className="border border-red-300 px-4 py-2">Earth, Wind, and Fire</td>
                            <td className="border border-red-300 px-4 py-2">1975</td>
                            <td className="border border-red-300 px-4 py-2">1961</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}