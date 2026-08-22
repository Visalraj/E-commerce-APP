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
                // 1. Find the product
                {
                    $match: {
                        _id: new mongoose.Types.ObjectId(productId),
                        isActive: true,
                    },
                },

                // 2. Get product images
                {
                    $lookup: {
                        from: "product_images",
                        localField: "_id",
                        foreignField: "product_id",
                        as: "productImages",
                    },
                },

                // 3. Get the first image
                {
                    $addFields: {
                        images: {
                            $arrayElemAt: ["$productImages.images", 0],
                        },
                    },
                },

                // 4. Remove productImages because we only need images
                {
                    $project: {
                        productImages: 0,
                    },
                },

                // 5. Check whether this product is in user's wishlist
                {
                    $lookup: {
                        from: "user_wishlists",

                        let: {
                            productId: "$_id",
                            userId: user_id ? new mongoose.Types.ObjectId(user_id) : null,
                        },

                        pipeline: [
                            {
                                $match: {
                                    $expr: {
                                        $and: [
                                            // Match the user
                                            {
                                                $eq: ["$userId", "$$userId"],
                                            },

                                            // Check if productId exists
                                            // inside products[].productId
                                            {
                                                $gt: [
                                                    {
                                                        $size: {
                                                            $filter: {
                                                                input: {
                                                                    $ifNull: ["$products", []],
                                                                },

                                                                as: "item",

                                                                cond: {
                                                                    $eq: ["$$item.productId", "$$productId"],
                                                                },
                                                            },
                                                        },
                                                    },
                                                    0,
                                                ],
                                            },
                                        ],
                                    },
                                },
                            },
                        ],

                        as: "wishlistInfo",
                    },
                },

                // 6. Convert wishlistInfo into true/false
                {
                    $addFields: {
                        isInWishlist: {
                            $gt: [
                                {
                                    $size: {
                                        $ifNull: ["$wishlistInfo", []],
                                    },
                                },
                                0,
                            ],
                        },

                        quantity: {
                            $let: {
                                vars: {
                                    wishlistProducts: {
                                        $ifNull: [
                                            {
                                                $arrayElemAt: ["$wishlistInfo.products", 0],
                                            },
                                            [],
                                        ],
                                    },
                                },

                                in: {
                                    $let: {
                                        vars: {
                                            wishlistProduct: {
                                                $arrayElemAt: [
                                                    {
                                                        $filter: {
                                                            input: "$$wishlistProducts",
                                                            as: "item",
                                                            cond: {
                                                                $eq: ["$$item.productId", "$_id"],
                                                            },
                                                        },
                                                    },
                                                    0,
                                                ],
                                            },
                                        },

                                        in: "$$wishlistProduct.quantity",
                                    },
                                },
                            },
                        },
                    },
                },

                // 7. Remove wishlistInfo from response
                {
                    $project: {
                        wishlistInfo: 0,
                    },
                },
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

                // 3. Get wishlist
                {
                    $unwind: {
                        path: "$wishlists",
                        preserveNullAndEmptyArrays: true,
                    },
                },

                // 4. Get product details
                {
                    $lookup: {
                        from: "products",
                        let: {
                            products: "$wishlists.products",
                        },
                        pipeline: [
                            {
                                $match: {
                                    $expr: {
                                        $in: [
                                            "$_id",
                                            {
                                                $map: {
                                                    input: "$$products",
                                                    as: "product",
                                                    in: "$$product.productId",
                                                },
                                            },
                                        ],
                                    },
                                },
                            },

                            // 5. Get images
                            {
                                $lookup: {
                                    from: "product_images",
                                    localField: "_id",
                                    foreignField: "product_id",
                                    as: "product_images",
                                },
                            },

                            {
                                $sort: {
                                    createdAt: 1,
                                },
                            },

                            // 6. Add quantity to product
                            {
                                $addFields: {
                                    quantity: {
                                        $let: {
                                            vars: {
                                                wishlistProduct: {
                                                    $arrayElemAt: [
                                                        {
                                                            $filter: {
                                                                input: "$$products",
                                                                as: "product",
                                                                cond: {
                                                                    $eq: ["$$product.productId", "$_id"],
                                                                },
                                                            },
                                                        },
                                                        0,
                                                    ],
                                                },
                                            },
                                            in: "$$wishlistProduct.quantity",
                                        },
                                    },
                                },
                            },
                        ],
                        as: "products",
                    },
                },

                // 7. Return only required data
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
