import mongoose, { Schema } from "mongoose";
const userWishlistSchema = new Schema(
    {
        userId: { type: mongoose.Types.ObjectId, ref: 'users', required: true },
        products: [{ type: mongoose.Types.ObjectId, ref: 'products' }],
    },
    {
        timestamps: true
    }
);

const UserWishlist = mongoose.models.user_Wishlist || mongoose.model("user_Wishlist", userWishlistSchema);

export default UserWishlist;