import { Badge } from "@/Components/ui/badge";
import { Currency } from "@/utils/currency";
import { Link } from "@inertiajs/react";
import { IconStarFilled } from "@tabler/icons-react";
import _ from "lodash";
import TableActionDropdown from "./table-action";

export const ProductTableColumns = [
    {
        id: "product_name",
        header: "Product Name",
        accessorKey: "name",
        size: 300,
        cell: ({ row }) => {
            const data = row.original;
            return (
                <Link href="#" className="hover:underline hover:text-primary">
                    {data.name}
                </Link>
            );
        },
    },
    {
        id: "sku",
        header: "SKU",
        size: 100,
        accessorKey: "sku",
        cell: () => "HY5232",
    },
    {
        id: "product_stock_quantity",
        header: "Stock",
        size: 120,
        accessorKey: "stock_quantity",
        cell: ({ row }) => {
            const stock = row.original.stock_quantity;
            if (stock > 10) {
                return (
                    <span className="font-semibold text-accent-foreground/70">
                        <span className="text-green-500 font-semibold">
                            In stock{" "}
                        </span>{" "}
                        ({stock})
                    </span>
                );
            } else if (stock > 0 && stock <= 10) {
                return (
                    <span className="font-semibold text-accent-foreground/70">
                        <span className="text-orange-500 font-semibold">
                            Stock low
                        </span>
                        ({stock})
                    </span>
                );
            } else {
                return (
                    <span className="font-semibold text-accent-foreground/70">
                        <span className="text-destructive font-semibold">
                            Out of stock
                        </span>
                        ({stock})
                    </span>
                );
            }
        },
    },
    {
        id: "product_price",
        header: "Price",
        size: 120,
        accessorFn: (row) => row.price.amount,
        cell: ({ row }) => {
            const data = row.original;
            return (
                <span className="font-semibold">
                    {new Currency(data.price.currency_code).format(
                        data.price.amount
                    )}
                </span>
            );
        },
    },
    {
        id: "product_category",
        header: "Category",
        accessorKey: "",
        size: 120,
        cell: ({ row }) => {
            const { categories } = row.original;
            if (categories === undefined || categories.length === 0) {
                return <span>--</span>;
            }

            const categoriesName = _.map(categories, (c) => c.name).join(", ");

            return <span>{categoriesName}</span>;
        },
    },
    {
        id: "product_variant_by_size",
        header: "Sizes",
        accessorKey: "",
        size: 120,
        cell: ({ row }) => {
            const data = row.original;

            if (data.variants === undefined) {
                return <span className="text-foreground/70">--</span>;
            }

            const sizes = _.filter(
                data.variants,
                (variant) => variant.type === "SIZE"
            );

            if (_.isArray(sizes) && sizes.length > 0) {
                return (
                    <div className="flex items-center space-x-1.5">
                        {_.map(sizes, (variant) => (
                            <Badge key={variant.id}> {variant.name} </Badge>
                        ))}
                    </div>
                );
            }
        },
    },

    {
        id: "product_type",
        header: "Type",
        size: 120,
        accessorKey: "",
        cell: () => "Good",
    },
    {
        id: "product_tags",
        header: "Tags",
        size: 120,
        accessorKey: "tags",
        cell: () => {
            const tags = ["Top rated", "Best", "Popular"].join(", ");
            return <span>{tags}</span>;
        },
    },
    {
        id: "product_rates",
        header: "Rate",
        size: 60,
        accessorFn: (row) => row.reviews.averageRating,
        cell: ({ row }) => {
            const { reviews } = row.original;

            return (
                <span>
                    <span className="flex items-center">
                        <IconStarFilled
                            size={14}
                            className="mr-1.5 text-orange-500"
                        />
                        {reviews.averageRating}
                    </span>
                </span>
            );
        },
    },
    {
        id: "product_status",
        header: "Status",
        size: 120,
        accessorKey: "",
        cell: () => "Published",
    },
    {
        id: "action",
        header: "Actions",
        size: 60,
        cell: () => {
            return <TableActionDropdown />;
        },
    },
];
