import Stripe from "stripe";
import { NextResponse } from "next/server";

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);

export async function POST(req) {
    const body = await req.text();
    const signature = req.headers.get("stripe-signature");

    console.log("Webhook body:", body);
    let event;

    try {
        event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET);
    } catch (error) {
        return NextResponse.json({ message: "Invalid webhook signature" }, { status: 400 });
    }

    if (event.type === "checkout.session.completed") {
        const session = event.data.object;

        // TODO:
        // 1. Find your order using session.id
        // 2. Update payment status to "paid"
        // 3. Save Stripe payment details
        // 4. Clear the customer's cart if appropriate
    }

    return NextResponse.json({ received: true });
}
