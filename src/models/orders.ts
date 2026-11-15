import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "users",
            required: true,
        },

        items: [
            {
                product: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Product",
                    required: true,
                },
                name: String,
                image: String,
                price: Number,
                quantity: Number,
            },
        ],

        totalAmount: {
            type: Number,
            required: true,
        },

        currency: {
            type: String,
            default: "gbp",
        },

        paymentStatus: {
            type: String,
            enum: ["pending", "paid", "failed", "expired"],
            default: "pending",
        },

        orderStatus: {
            type: String,
            enum: ["pending", "processing", "shipped", "delivered", "cancelled"],
            default: "pending",
        },

        stripeSessionId: {
            type: String,
            unique: true,
            sparse: true,
        },
        paymentMethod: {
            type: String,
        },
        jsonData: {
            type: mongoose.Schema.Types.Mixed,
        },

        stripePaymentIntentId: String,
    },
    {
        timestamps: true,
    },
);

export default mongoose.models.Order || mongoose.model("Order", orderSchema);
