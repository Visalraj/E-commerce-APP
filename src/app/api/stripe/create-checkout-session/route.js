import Stripe from "stripe";
import { NextResponse } from "next/server";
import Order from "@/models/orders";
import { auth } from "@/app/auth";
import { getUserAgent } from "@/app/Helpers/function";

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);
export async function POST(req) {
    try {
    const usersession = await auth();
    if (!usersession?.user?.id) {
        return NextResponse.json({ message: "Please login to continue" }, { status: 401 });
    }        
       
        const { products } = await req.json();
        const orderItems = [];

        if (!products || products.length === 0) {
            return NextResponse.json({ message: "Cart is empty" }, { status: 400 });
        }



        // Convert cart products into Stripe line items
        const lineItems = products.map((product) => {
            const name = product.product_name;
            const image = `${process.env.NEXT_PUBLIC_CLOUDINARY_URL}${product.images}`;
            const price = product.product_price;
            const quantity = product.quantity;

            orderItems.push({
                product: product._id,
                name,
                image,
                price,
                quantity,
            });

            return {
                price_data: {
                    currency: "gbp",
                    product_data: {
                        name,
                        images: image ? [image] : [],
                    },
                    unit_amount: Math.round(price * 100),
                },
                quantity,
            };
        });

    

        const order = await Order.create({
            user: usersession.user.id,
            items: orderItems,
            totalAmount: products.reduce((total, product) => total + product.product_price * product.quantity, 0),
            currency: "gbp",
            paymentStatus: "pending",
            orderStatus: "pending",
        });


        const session = await stripe.checkout.sessions.create({
            line_items: lineItems,
            mode: "payment",
            client_reference_id: order._id.toString(),
            metadata: {
                orderId: order._id.toString(),
                userId: usersession.user.id.toString(),
                userAgent:await getUserAgent() || "Unknown",
            },
            success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/thanks/${order._id}`,
            cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/cart`,
        });
        
        order.stripeSessionId = session.id;
        await order.save();

        return NextResponse.json({
            url: session.url,
        });
    } catch (error) {
        console.error("Stripe Checkout Error:", error);

        return NextResponse.json({ message: "Unable to create checkout session" }, { status: 500 });
    }
}