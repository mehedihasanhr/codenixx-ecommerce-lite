import { CollectionsTable } from "@/Components/data-table/collections/CollectionsTable";
import AdminLayout from "@/Layouts/AdminLayout";
import { PageHeading } from "@/Layouts/PageHeading";
import { Head } from "@inertiajs/react";

export default function Collections(props) {
    console.log(props.collections);
    return (
        <>
            <Head title="Collections" /> {/* Browser title */}
            {/* Layout codes */}
            <AdminLayout>
                <div className="p-8 overflow-hidden max-w-full">
                    {/* Heading part */}
                    <PageHeading
                        heading="Collections"
                        addButtonHref={route("collection.create")}
                        addButtonText="Collection"
                    />

                    {/* page body */}

                    <CollectionsTable {...props} />
                </div>
            </AdminLayout>
        </>
    );
}
