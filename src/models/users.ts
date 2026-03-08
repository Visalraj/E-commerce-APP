import mongoose, { Schema } from "mongoose";
const usersSchema = new Schema(
    {
        firstname: { type: String },
        lastname: { type: String },
        age: { type: Number },
        email: { type: String },
        address_line_one: { type: String },
        address_line_two: { type: String },
        city: { type: String },
        county: { type: String },
        country: { type: String },
        postcode: { type: String },
        username: { type: String },
        password: { type: String },
        isActive: { type: Boolean, default: true }
    },
    {
        timestamps: true
    }
);

const Users = mongoose.models.users || mongoose.model("users", usersSchema);

export default Users;