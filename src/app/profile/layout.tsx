import CustomerSideBar from "@/app/ui/customer/components/sidebar";

export default function CustomerLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <CustomerSideBar />
            <main className="sm:ml-64 mt-16 p-4">{children}</main>
        </>
    );
}
