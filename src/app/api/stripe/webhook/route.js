import Stripe from "stripe";
import { NextResponse } from "next/server";
import Order from "@/models/orders";
import Transactions from "@/models/transactions";
import connectDB from "@/library/db";


const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);

export async function POST(req) {
    const body = await req.text();
    const signature = req.headers.get("stripe-signature");
    let event;
    try {
        event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET);
    } catch (error) {
        return NextResponse.json({ message: "Invalid webhook signature" }, { status: 400 });
    }

    if (event.type === "checkout.session.completed") {
        const session = event.data.object;

        const paymentIntent = await stripe.paymentIntents.retrieve(session.payment_intent, {
            expand: ["payment_method"],
        });

        const paymentMethod = paymentIntent.payment_method;


        try{
            if(await connectDB() && session.client_reference_id && session.payment_status === "paid"){
                console.log("im inside the if statement");
                const order = await Order.findOne({ _id: session.client_reference_id });
                if(order){
                    console.log("Order found for session:", session.id);
                    order.orderStatus = "processing";
                    await order.save();

                    // Create a new transaction record
                    const transaction = new Transactions({
                        user: order.user,
                        order: order._id,
                        transactionId: session.payment_intent,
                        amount: session.amount_total / 100,
                        currency: session.currency,
                        paymentMethod: paymentMethod.type,
                        paymentStatus: "completed",
                        jsonData: session,
                        stripePaymentIntentId: session.payment_intent,
                        stripeSessionId: session.id,
                        userAgent: req.headers.get("user-agent"),
                    });
                    await transaction.save();
                }else{
                    console.log("Order not found for session:", session.id);
                }
            }
        }catch(err){
            console.log(err);
        }
    }

    return NextResponse.json({ received: true });
}
