import mongoose, { Schema } from "mongoose";
const usersAddressSchema = new Schema(
    {
        userId: {
            type: mongoose.Types.ObjectId,
            ref: "users",
            required: true,
        },
        firstname: { type: String },
        lastname: { type: String },
        customer_addr_one: { type: String },
        customer_addr_two: { type: String },
        customer_city: { type: String },
        customer_county: { type: String },
        customer_country: { type: String },
        customer_postcode: { type: String },
    },
    {
        timestamps: true,
    },
);

const usersMultipleAddress =
    mongoose.models.users_multiple_address ||
    mongoose.model("users_multiple_address", usersAddressSchema);

export default usersMultipleAddress;