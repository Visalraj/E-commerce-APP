import mongoose from "mongoose";
const transactionSchema = new mongoose.Schema(
    {
        user:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "users",
            required: true,
        },
        order:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "orders",
            required: true,
        },
        amount:{
            type: Number,
            required: true,
        },
        currency:{
            type: String,
            default: "gbp",
        },
        paymentStatus:{
            type: String,
            enum: ["pending", "completed", "failed", "expired"],
            default: "pending",
        },
        paymentMethod:{
            type: String,
        },
        jsonData:{
            type: mongoose.Schema.Types.Mixed,
        },
        userAgent: String,
        stripeSessionId: String,
        stripePaymentIntentId: String,
    },
    {
        timestamps: true
    }
);

export default mongoose.models.transactions || mongoose.model("transactions", transactionSchema);
