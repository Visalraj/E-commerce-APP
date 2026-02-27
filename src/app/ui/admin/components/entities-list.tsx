'use server';
import { Customer, Products_schema } from "@/app/lib/definitions";
import Entities from "../../common/entities";

type EntityMap = {
    customers: Customer;
    products: Products_schema;
};

export default async function EntitiesList<T extends keyof EntityMap>({
    response,
    type,
}: {
    response: { status: number; entities: EntityMap[T][] } | undefined;
    type: T;
}) {
    let labelArray: string[] = [];

    if (type === 'customers') {
        labelArray = ['ID', 'Name', 'Username', 'Email', 'Status', 'Created Date', 'Actions', 'Login'];
    } else if (type === 'products') {
        labelArray = ['ID', 'Product Name', 'Description', 'Price', 'Status', 'Created Date', 'Action'];
    }

    return (
        <>
            {response && response.status === 200 && (
                <Entities label={labelArray} entity={response.entities} type={type} />
            )}
        </>
    );
}
