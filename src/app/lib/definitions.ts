export type Customer = {
    _id: string;
    firstname: string;
    lastname: string;
    email: string;
    username: string;
    password: string;
    isActive: boolean;
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