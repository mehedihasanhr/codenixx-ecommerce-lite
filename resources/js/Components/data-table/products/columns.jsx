import { Badge } from "@/Components/ui/badge";
import { Currency } from "@/utils/currency";
import { Product } from "@/utils/product";
import { Link } from "@inertiajs/react";
import { IconStar, IconStarFilled } from "@tabler/icons-react";
import TableActionDropdown from "./table-action";

export const ProductTableColumns = [
    {
        id: "id",
        header: "#",
        accessorKey: 'id',
        cell: ({row})=>{
            const product = new Product(row.original);
            return (
                <div className="line-clamp-2">
                    {`${product.id}`}
                </div>
            );
        }
    },
    {
        id: "name",
        header: "Name",
        accessorKey: "name",
        cell: ({ row }) => {
            const product = new Product(row.original);
            return (
                <Link
                    href={route("product.view", {product_id: product.id})}
                    className="hover:underline hover:text-primary line-clamp-2"
                >
                    {product.name}
                </Link>
            );
        },
    },

    {
        id: "price",
        header: "Price",
        accessorKey: "price",
        cell: ({ row }) => {
            const product = new Product(row.original);
            const currency = new Currency(product.currencyCode);
            return (
                <span className="font-medium">
                    {currency.format(product.price.amount)}
                </span>
            );
        },
    },

    {
        id: "compare_price",
        header: "Compare price",
        accessorKey: "compare_price",
        cell: ({ row }) => {
            const product = new Product(row.original);
            const currency = new Currency(product.currencyCode);
            return (
                <span className="font-medium">
                    {currency.format(product.compare_price.amount)}
                </span>
            );
        },
    },

    {
        id: "cost_per_item",
        header: "Cost per item",
        accessorKey: "cost_per_item",
        cell: ({ row }) => {
            const product = new Product(row.original);
            const currency = new Currency(product.currencyCode);
            return (
                <span className="font-medium">
                    {currency.format(product.cost_per_item.amount)}
                </span>
            );
        },
    },

    {
        id: "sku",
        header: "SKU",
        accessorKey: "sku",
        cell: ({ row }) => {
            const product = new Product(row.original);

            return (
                <span className="flex items-center gap-2.5">
                    {product.inventory.sku}
                </span>
            );
        },
    },

    {
        id: "stock",
        header: "Stock",
        accessorKey: "stock",
        cell: ({ row }) => {
            const product = new Product(row.original);
            const stock = product.inventory.stock;

            const lowStock = (stock > 0 && stock < 10) ? <span className=" text-orange-500"> Low stock </span> : null  ;
            const inStock = stock > 10 ? <span className="text-green-500"> In stock </span> : null;
            const outOfStock = stock === 0 ? <span className="text-red-500"> Out of stock </span> : null;

            return (
                <span className="flex items-center flex-wrap gap-x-2">
                    <span>
                     {lowStock}
                     {inStock}
                     {outOfStock}
                    </span>
                    <span className="text-xs">
                        ({stock}{product.inventory.stock_unit})
                    </span>
                </span>
            );
        },
    },

    {
        id: "barcode",
        header: "Barcode",
        accessorKey: "barcode",
        cell: ({ row }) => {
            const product = new Product(row.original);

            return (
                <span className="flex items-center gap-2.5">
                    {product.inventory.barcode}
                </span>
            );
        },
    },

    {
        id: "category_id",
        header: "Category",
        accessorKey: "category",
        cell: ({ row }) => {
            const product = new Product(row.original);
            return (
                <div className="line-clamp-2">
                    {product.category.name ?? "--"}
                </div>
            );
        },
    },

    {
        id: "brand_id",
        header: "Brand",
        accessorKey: "brand",
        cell: ({ row }) => {
            const product = new Product(row.original);
            return (
                <div className="line-clamp-2">
                    {product.brand.name ?? "--"}
                </div>
            );
        },
    },

    {
        id: "sizes",
        header: "Sizes",
        accessorKey: "sizes",
        cell: ({ row }) => {
            const product = new Product(row.original);
            return (
                <div className="line-clamp-2">
                    {product.variants.sizes.join(', ') ?? "--"}
                </div>
            );
        },
    },
    {
        id: "colors",
        header: "Colors",
        accessorKey: "colors",
        cell: ({ row }) => {
            const product = new Product(row.original);
            return (
                <div className="line-clamp-2">
                    {product.variants.colors.join(', ') ?? "--"}
                </div>
            );
        },
    },
    {
        id: "rate",
        header: "Rate",
        accessorKey: "rate",
        cell: ({ row }) => {
            const product = new Product(row.original);
            const rating = product.getAverageRating();


            return (
                <span className="flex items-center gap-2.5">
                    {rating === 0 ?
                        <IconStar size={15} className="text-muted-foreground" /> :
                        <IconStarFilled size={15} className="text-orange-500" />
                    }
                   <span>{rating}</span>
                </span>
            );
        },
    },

    {
        id: "status",
        header: "Status",
        accessorKey: "status",
        cell: ({ row }) => {
            const product = new Product(row.original);
            if(product.status === 'published'){
                return <Badge> Published </Badge>
            }else if(product.status === 'drafted'){
                return <Badge variant="secondary"> Draft </Badge>
            }else{
                return <Badge variant="destructive"> Trashed </Badge>
            }

        },
    },

    {
        id: "action",
        header: "Actions",
        cell: ({row}) => {
            const product = new Product(row.original);
            return <TableActionDropdown product={product} />;
        },
    },
];
