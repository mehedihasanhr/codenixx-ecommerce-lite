import { CustomersTable } from "@/Components/data-table/customers/CustomersTable";
import AdminLayout from "@/Layouts/AdminLayout";
import { PageHeading } from "@/Layouts/PageHeading";
import { Head } from "@inertiajs/react";

export default function Customers(props) {
    return (
        <>
            <Head title="Customer" />
            <AdminLayout>
                <div className="p-8">
                    <PageHeading heading="Customers" />
                    <div>
                        <CustomersTable {...props} />
                    </div>
                </div>
            </AdminLayout>
        </>
    );
}
