import { NextResponse } from "next/server";
import connectDB from "@/library/db";
import Products from "@/models/products";
import mongoose from "mongoose";
export async function GET(  request: Request, context: { params: Promise<{ id?: string[] }> },) {

    try {
        await connectDB();
        const { id } = await context.params;
        const productId = id?.[0].split("____")[0];
        let user_id=null;
        if (id?.[0].split("____")[1]!== "undefined") 
            user_id = id?.[0].split("____")[1].toString();
        
        if (productId) {
            if (!mongoose.Types.ObjectId.isValid(productId)) {
                return NextResponse.json(
                    { status: 400, error: "Invalid ID format" },
                    { status: 400 },
                );
            }     
            
            console.log("Fetching product with ID:", productId, "for user ID:", user_id);
            const product = await Products.aggregate([
                {
                    $match: {
                        _id: new mongoose.Types.ObjectId(productId),
                    },
                },
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
                {
                    $lookup: {
                        from: "user_wishlists",
                        let: { prodId: "$_id" },
                        pipeline: user_id
                            ? [
                                  {
                                      $match: {
                                          $expr: {
                                              $and: [
                                                  {
                                                      $eq: [
                                                          "$userId",
                                                          new mongoose.Types.ObjectId(
                                                              user_id,
                                                          ),
                                                      ],
                                                  },
                                                  {
                                                      $in: [
                                                          "$$prodId",
                                                          "$products",
                                                      ],
                                                  },
                                              ],
                                          },
                                      },
                                  },
                              ]
                            : [],
                        as: "wishlistInfo",
                    },
                },
                {
                    $addFields: {
                        isInWishlist: user_id
                            ? { $gt: [{ $size: "$wishlistInfo" }, 0] }
                            : false,
                    },
                },

                { $project: { wishlistInfo: 0 } },
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
