'use server';
import Breadcrumbs from "@/app/ui/admin/components/breadcrumbs";
import EditCustomerForm from "@/app/ui/admin/components/edit-customer-form";
import { getCustomerById } from "@/app/Helpers/function";

export default async function editCustomer({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const customer = await getCustomerById({ id });

    return (
        <main>
            <Breadcrumbs
                breadcrumbs={[
                    { label: 'Manage Customers', href: '/admin/customers' },
                    {
                        label: 'Edit',
                        href: '',
                        active: true,
                    },
                ]}
            />
            {
                customer ? <EditCustomerForm uuid={id} customer={customer.data} /> : ''
            }
        </main>
    );
}

