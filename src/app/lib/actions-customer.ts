'use server';
import connectDB from '@/library/db';
import { signIn } from '../auth';
import { AuthError } from 'next-auth';
import { z } from 'zod';
import Users from '@/models/users';
import { createUniqueUsername, encryptString, isLoggedIn } from '../Helpers/function';
import { generateRandomString } from '../Helpers/function';
import mongoose from "mongoose";
import { NextResponse } from 'next/server';
import { redirect } from 'next/navigation';
import UserWishlist from '@/models/user-wishlist';
import { AuthState } from './definitions';

export async function authenticate( prevState: AuthState | undefined, formData: FormData ): Promise<AuthState | undefined> {    
    const FormSchema = z.object({
        customer_email: z.string().email().min(1, "Email is required"),
        customer_password: z.string().min(1, "Password is required"),
    });

    const validation = FormSchema.safeParse({
        customer_email: formData.get("email"),
        customer_password: formData.get("password"),
    });
   if (!validation.success)
       return {errors: validation.error.flatten().fieldErrors, };
   
    try {
        formData.append('redirectTo', '/dashboard');
        await signIn('credentials', formData);
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case 'CredentialsSignin':
          return { message: "Invalid credentials" };
           default:
                return { message: "Something went wrong" };
            }
        }
        throw error;
    }
}

export async function createCustomer(formData: FormData) {
    const FormSchema = z.object({
        id: z.string(),
        customer_fname: z.string().min(1, "Firstname is required"),
        customer_lname: z.string().min(1, "Lastname is required"),
        customer_age: z.coerce.number().int().min(1, "Age is required"),
        customer_email: z.string().email().min(1, "Email is required"),
        customer_addr_one: z.string().min(5, "Address Line 1 is required"),
        customer_addr_two: z.string().min(5, "Address Line 2 is required"),
        customer_city: z.string().min(3, "City is required"),
        customer_county: z.string().min(3, "County is required"),
        customer_country: z.string().min(3, "Country is required"),
        customer_postcode: z.string().min(6, "Postcode is required")
    });
    
    const CreateCustomer = FormSchema.omit({ id: true });
    
    const validation = CreateCustomer.safeParse({
        customer_fname: formData.get("customer_fname"),
        customer_lname: formData.get("customer_lname"),
        customer_age: formData.get("customer_age"),
        customer_email: formData.get("customer_email"),
        customer_addr_one: formData.get("customer_addr_one"),
        customer_addr_two: formData.get("customer_addr_two"),
        customer_city: formData.get("customer_city"),
        customer_county: formData.get("customer_county"),
        customer_country: formData.get("customer_country"),
        customer_postcode: formData.get("customer_postcode"),
    });

    if (!validation.success) {
        return {success: false,  errors: validation.error.flatten().fieldErrors,  };
    }

    const { customer_fname, customer_lname,customer_age,  customer_email,customer_addr_one, customer_addr_two, customer_city, customer_county,
        customer_country, customer_postcode,
    } = validation.data;


    const email = await encryptString(customer_email as string);
    const password = await encryptString(await generateRandomString({ length: 10 }));
    const username = await createUniqueUsername(customer_fname + customer_lname);

    try {
        if (await connectDB()) {
            await Users.create({
                firstname: customer_fname,
                lastname: customer_lname,
                age: customer_age,
                email: email,
                password: password,
                address_line_one: customer_addr_one,
                address_line_two: customer_addr_two,
                city: customer_city,
                county: customer_county,
                country: customer_country,
                postcode: customer_postcode,
                isActive: false,
                username: username,
            });
            console.log("User created successfully");
            return { status: 200,  redirectUrl:   process.env.NEXT_PUBLIC_BASE_URL +    "/login",};
        } else {
            return { status: 500, redirectUrl: `${process.env.NEXT_PUBLIC_BASE_URL}` };
        }
    } catch (error) {
        console.error("Validation error:", error);
        return {  success: false,errors: { general: ["Invalid input data"] },
        };
    }
}

export async function addToCart({ id }: { id?: string }) {
    const productId = id || 'unknown';
    if (!mongoose.Types.ObjectId.isValid(productId)) {
        return NextResponse.json(
            { status: 400, error: "Invalid ID format" },
            { status: 400 },
        );
    }
    const user = await isLoggedIn();
    if (!user) return redirect("/login");
    try {
        await connectDB();
        await UserWishlist.findOneAndUpdate(
            { userId: new mongoose.Types.ObjectId(user.id) },
            {
                $addToSet: {
                    products: new mongoose.Types.ObjectId(productId),
                },
            },
            { upsert: true, new: true },
        );

        console.log("Product added to wishlist successfully");
        return { status: true, message: "Product added to wishlist" };      
    } catch (error) {
        console.error("Error adding product to wishlist:", error);
        return { status: false, error: "Failed to add product to wishlist" };
       
    }
}

export async function removeFromCart({ id }: { id?: string }) {
    const productId = id || 'unknown';
    if (!mongoose.Types.ObjectId.isValid(productId)) {
        return NextResponse.json(
            { status: 400, error: "Invalid ID format" },
            { status: 400 },
        );
    }
    const user = await isLoggedIn();
    if (!user) return redirect("/login");
    try {
        await connectDB();
        const wishlist = await UserWishlist.findOneAndUpdate(
            { userId: new mongoose.Types.ObjectId(user.id) },
            {
                $pull: {
                    products: new mongoose.Types.ObjectId(productId),
                },
            },
            { new: true },
        );
        if (wishlist && wishlist.products.length === 0) 
            await UserWishlist.deleteOne({ _id: wishlist._id });

        console.log("Product removed from wishlist successfully");
        return { status: true, message: "Product removed from wishlist" };      
    } catch (error) {
        console.error("Error removing product from wishlist:", error);
        return { status: false, error: "Failed to remove product from wishlist" };
    }
}

export async function buyProduct({ id }: { id?: string }) {
     const productId = id || "unknown";
     if (!mongoose.Types.ObjectId.isValid(productId)) {
         return NextResponse.json(
             { status: 400, error: "Invalid ID format" },
             { status: 400 },
         );
     }
}