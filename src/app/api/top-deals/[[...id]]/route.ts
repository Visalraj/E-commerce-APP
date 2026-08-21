import { NextResponse } from "next/server";
import connectDB from "@/library/db";
import Products from "@/models/products";
import mongoose from "mongoose";
import Users from "@/models/users";
export async function GET(  request: Request, context: { params: Promise<{ id?: string[] }> },) {

    try {
        await connectDB();
        const { id } = await context.params;
        const productId = id?.[0].split("____")[0];
        let user_id = null;
        if (id?.[0].split("____")[1]!== "undefined") 
            user_id = id?.[0].split("____")[1].toString();
        
        if (productId) {
            if (!mongoose.Types.ObjectId.isValid(productId)) {
                return NextResponse.json(
                    { status: 400, error: "Invalid ID format" },
                    { status: 400 },
                );
            }     
            
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

export async function POST(request: Request) {
  const body = await request.json();
  const {type,userId} = body;
    if((type != '' || type != undefined) && type == 'user_address'  && (userId!='' || userId !=undefined)){
        try{
            await connectDB();
            const userObjectId = new mongoose.Types.ObjectId(userId);
            const userData = await Users.aggregate([
                { $match: { _id: userObjectId } },
                {
                    $lookup: {
                        from: "users_multiple_addresses",
                        localField: "_id",
                        foreignField: "userId",
                        as: "addresses",
                    },
                },
                {
                    $project: {
                        _id: 0,
                        addresses: 1,
                    },
                },
            ]);
            return NextResponse.json({ status: 200, data: userData[0]?.addresses });
        } catch (error) {
            console.error("Database Error:", error);
            return NextResponse.json(
                { status: 500, error: "Internal Server Error" },
                { status: 500 },
            );
        }
    }else if((type != '' || type != undefined) && type == 'user_cart'  && (userId!='' || userId !=undefined)){
        try {
            await connectDB();
            const userObjectId = new mongoose.Types.ObjectId(userId);
            const cartData = await Users.aggregate([
                // 1. Find the user
                {
                    $match: {
                        _id: userObjectId,
                    },
                },

                // 2. Get user's wishlist
                {
                    $lookup: {
                        from: "user_wishlists",
                        localField: "_id",
                        foreignField: "userId",
                        as: "wishlists",
                    },
                },

                // 3. Get product details for all product IDs
                {
                    $unwind: {
                        path: "$wishlists",
                        preserveNullAndEmptyArrays: true,
                    },
                },

                {
                    $lookup: {
                        from: "products",
                        let: {
                            productIds: "$wishlists.products",
                        },
                        pipeline: [
                            {
                                $match: {
                                    $expr: {
                                        $in: ["$_id", "$$productIds"],
                                    },
                                },
                            },

                            // 4. Get images for each product
                            {
                                $lookup: {
                                    from: "product_images",
                                    localField: "_id",
                                    foreignField: "product_id",
                                    as: "product_images",
                                },
                            },
                        ],
                        as: "products",
                    },
                },

                // 5. Return only required data
                {
                    $project: {
                        _id: 0,
                        products: 1,
                    },
                },
            ]);
            return NextResponse.json({ status: 200, data: cartData[0]?.products });
        } catch (error) {
            console.error("Database Error:", error);
            return NextResponse.json({ status: 500, error: "Internal Server Error" }, { status: 500 });
        }    
    }
}
