export type Customer = {
    _id: string;
    firstname: string;
    lastname: string;
    email: string;
    username: string;
    password: string;
    isActive: boolean;
    customer_addr_one: string;
    customer_addr_two: string;
    customer_city: string;
    customer_county: string;
    customer_country: string;
    customer_postcode: string;
    createdAt: string;
    updatedAt: string;
};

export type Products_schema = {
    _id: string;
    product_name: string;
    product_desc: string;
    product_price: number;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
    images: { url: string }[];
}

export type TopDealsResponse = {
    status: number;
    data: Products_schema[];
};

export type CartData = {
    _id: string;
    product_name: string;
    product_desc: string;
    product_price: number;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
    product_images: {
        images: string[];
    }[];
    quantity: number;
};

export type AuthState = {
    errors?: {  customer_email?: string[];
            customer_password?: string[];
    };
    message?: string;
};