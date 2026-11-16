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
                    ref: "products",
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


        orderStatus: {
            type: String,
            enum: ["pending", "processing", "shipped", "delivered", "cancelled"],
            default: "pending",
        },

        },
    {
        timestamps: true,
    },
);

export default mongoose.models.Orders || mongoose.model("Orders", orderSchema);
