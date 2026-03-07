'use server';
import connectDB from '@/library/db';
import { signIn } from '../auth';
import { AuthError } from 'next-auth';
import { z } from 'zod';
import Users from '@/models/users';
import { createUniqueUsername, encryptString, isUserLoggedIn } from '../Helpers/function';
import { generateRandomString } from '../Helpers/function';
import mongoose from "mongoose";
import { NextResponse } from 'next/server';
import { redirect } from 'next/navigation';
import UserWishlist from '@/models/user-wishlist';

export async function authenticate(
    prevState: string | undefined,
    formData: FormData,
) {
    try {
        formData.append('redirectTo', '/dashboard');
        await signIn('credentials', formData);
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case 'CredentialsSignin':
                    return 'Invalid credentials.';
                default:
                    return 'Something went wrong.';
            }
        }
        throw error;
    }
}

const FormSchema = z.object({
    id: z.string(),
    customer_fname: z.string().min(1),
    customer_lname: z.string().min(1),
    customer_age: z.coerce.number().int(),
    customer_email: z.string().email().min(1),
    customer_addr: z.string().min(10),
});

const CreateCustomer = FormSchema.omit({ id: true });

export async function createCustomer(formData: FormData) {
    const { customer_fname, customer_lname, customer_age, customer_email: rawEmail, customer_addr } = CreateCustomer.parse({
        customer_fname: formData.get('customer_fname'),
        customer_lname: formData.get('customer_lname'),
        customer_age: formData.get('customer_age'),
        customer_email: formData.get('customer_email'),
        customer_addr: formData.get('customer_addr'),
    });

    const email = await encryptString(rawEmail as string);
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
                address: customer_addr,
                isActive: false,
                username: username
            });
            console.log('User created successfully');
            return { status: 200, redirectUrl: process.env.NEXT_PUBLIC_BASE_URL + '/login' }
        } else {
            return { status: 500, redirectUrl: `${process.env.NEXT_PUBLIC_BASE_URL}` };
        }
    } catch (error) {
        console.log('Error during user creation or DB connection:', error);
        return { status: 500, redirectUrl: `${process.env.NEXT_PUBLIC_BASE_URL}` };
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
    try {
        const user = await isUserLoggedIn();
        if (!user) return redirect("/login");
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
export async function buyProduct({ id }: { id?: string }) {
     const productId = id || "unknown";
     if (!mongoose.Types.ObjectId.isValid(productId)) {
         return NextResponse.json(
             { status: 400, error: "Invalid ID format" },
             { status: 400 },
         );
     }
}