import { NextResponse } from "next/server";
import connectDB from "@/library/db";
import Products from "@/models/products";
import mongoose from "mongoose";
export async function GET( request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        await connectDB();
        const { id } = await params;
        if (id && id !== "all") {
            if (!mongoose.Types.ObjectId.isValid(id)) {
                return NextResponse.json(
                    { status: 400, error: "Invalid ID format" },
                    { status: 400 },
                );
            }

            const product = await Products.aggregate([
                { $match: { _id: new mongoose.Types.ObjectId(id) } },
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
                            $arrayElemAt: [
                                "$productImages.images",
                                0,
                            ],
                        },
                    },
                },
                { $project: { productImages: 0 } },
            ]);

            if (!product.length) {
                return NextResponse.json(
                    { status: 404, error: "Product not found" },
                    { status: 404 },
                );
            }

            return NextResponse.json({
                status: 200,
                data: product[0],
            });
        }

        const allProducts = await Products.aggregate([
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
            { $project: { productImages: 0 } },
        ]);

        return NextResponse.json({ status: 200, data: allProducts });
    } catch (error) {
        console.error("Database Error:", error);
        return NextResponse.json(
            { status: 500, error: "Internal Server Error" },
            { status: 500 },
        );
    }
}
