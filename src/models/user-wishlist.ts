import mongoose, { Schema } from "mongoose";
const userWishlistSchema = new Schema(
    {
        userId: {
            type: mongoose.Types.ObjectId,
            ref: "users",
            required: true,
        },
        products: [
            {
                productId: {
                    type: mongoose.Types.ObjectId,
                    ref: "products",
                    required: true,
                },
                quantity: {
                    type: Number,
                    required: true,
                    default: 1,
                    min: 1,
                },
            },
        ],
    },
    {
        timestamps: true,
    },
);

const UserWishlist = mongoose.models.user_Wishlist || mongoose.model("user_Wishlist", userWishlistSchema);

export default UserWishlist;