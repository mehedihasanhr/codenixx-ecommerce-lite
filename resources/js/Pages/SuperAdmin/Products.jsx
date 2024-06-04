import ProductsTable from "@/Components/data-table/products/table";
import { Button } from "@/Components/ui/button";
import AdminLayout from "@/Layouts/AdminLayout";
import { Head, Link } from "@inertiajs/react";
import { IconPlus } from "@tabler/icons-react";

export default function Products({
     products,
     sortField,
     sortOrder,
     totalProducts,
     published,
     drafted,
     trashed,
     filter,
     categories,
     brands,
     brand,
     category
}) {


    return (
        <>
            <Head title="Products" />

            <AdminLayout>
                <div className="p-8 overflow-hidden max-w-full">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h2>Products Management</h2>
                        </div>
                        <Button size="sm" asChild>
                            <Link
                                href={route("product.create")}
                                className="flex items-center space-x-1 hover:no-underline"
                            >
                                <IconPlus size={15} />
                                <span>Add Product</span>
                            </Link>
                        </Button>
                    </div>

                    <div className="p-8 relative mt-8 max-w-full overflow-hidden rounded-lg border border-border/50 bg-background">
                        <div className="flex mb-5 text-sm">
                            <Link
                                href={route('adminpanel.products')}
                                data-active={filter === ''}
                                className="pr-2.5 border-r text-muted-foreground data-[active=true]:text-primary font-medium hover:underline"
                            >
                                Products ( <span className="text-foreground">{totalProducts}</span>)
                            </Link>
                            <Link
                                href={route('adminpanel.products', {filter: 'published'})}
                                data-active={filter === 'published'}
                                className="px-2.5 border-r text-muted-foreground data-[active=true]:text-primary font-medium hover:underline"
                            >
                                Published (
                                <span className="text-foreground">{published}</span>)
                            </Link>
                            <Link
                                href={route('adminpanel.products', {filter: 'drafted'})}
                                data-active={filter === 'drafted'}
                                className="px-2.5 border-r text-muted-foreground data-[active=true]:text-primary font-medium hover:underline"
                            >
                                Drafts (
                                <span className="text-foreground">{drafted}</span>)
                            </Link>
                            <Link
                                href={route('adminpanel.products', {filter: 'trashed'})}
                                data-active={filter === 'trashed'}
                                className="px-2.5 text-muted-foreground data-[active=true]:text-primary font-medium hover:underline"
                            >
                                Trash (
                                <span className="text-foreground">{trashed}</span>)
                            </Link>
                        </div>
                        <ProductsTable
                            data={products}
                            sortField={sortField}
                            sortOrder={sortOrder}
                            categories={categories}
                            brands={brands}
                            defaultBrand={brand}
                            defaultCategory={category}
                        />
                    </div>
                </div>
            </AdminLayout>
        </>
    );
}
