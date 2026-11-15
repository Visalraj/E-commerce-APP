export default async function ThanksPage({ params }: { params: Promise<{ id: string }> }) {
    const {id} = await params;
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1 className="text-4xl font-bold mb-4">Thank You!</h1>
            <p className="text-lg mb-8">
                Your order has been successfully placed. Your order ID is:{" "}
                <span className="font-mono">{id}</span>
            </p>
            <a href="/" className="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
                Continue Shopping
            </a>
        </div>
    );
}