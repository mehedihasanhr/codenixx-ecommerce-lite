import ProductsTable from "@/Components/data-table/products/table";
import { Button } from "@/Components/ui/button";
import { productData } from "@/data/product.data";
import AdminLayout from "@/Layouts/AdminLayout";
import { Head, Link } from "@inertiajs/react";
import { IconPlus } from "@tabler/icons-react";

export default function Products(props) {
    return (
        <>
            <Head title="Products" />

            <AdminLayout>
                <div className="p-8">
                    <div className="flex items-center justify-between">
                        <div>
                            <h2>Products Management</h2>
                            <p>Products</p>
                        </div>
                        <Button size="sm" asChild>
                            <Link
                                href={route("dashboard.product.create")}
                                className="flex items-center space-x-1"
                            >
                                <IconPlus size={15} />
                                <span>Add Product</span>
                            </Link>
                        </Button>
                    </div>

                    <ProductsTable data={productData(10)} />
                </div>
            </AdminLayout>
        </>
    );
}
