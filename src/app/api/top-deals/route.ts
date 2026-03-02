import { NextResponse } from "next/server";
import connectDB from "@/library/db";
import Products from "@/models/products";

export async function GET() {
    try {
        await connectDB();

        const topDeals = await Products.aggregate([
            {
                $lookup: {
                    from: "product_images",
                    localField: "_id",
                    foreignField: "product_id",
                    as: "productImages",
                },
            },
            {
                $addFields: {
                    images: {
                        $arrayElemAt: ["$productImages.images", 0],
                    },
                },
            },
            {
                $project: {
                    productImages: 0,
                },
            },
        ]);

        return NextResponse.json({ status: 200, data: topDeals });
    } catch (error) {
        console.log("Error fetching top deals:", error);
        return NextResponse.json( { status: 500, error: "Server error" }, { status: 500 }, );
    }
}
