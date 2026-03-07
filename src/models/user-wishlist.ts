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

const UserWishlist = mongoose.models.userWishlist || mongoose.model("userWishlist", userWishlistSchema);

export default UserWishlist;