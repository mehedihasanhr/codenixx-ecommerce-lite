import { Button } from "@/Components/ui/button";
import { Link } from "@inertiajs/react";
import { IconPrinter, IconX } from "@tabler/icons-react";
import ExportProductDropdown from "./export-dropdown";
import { ProductSearchBox } from "./product-filter-box";
import { ProductFilterCombobox } from "./product-filter-combobox";

export default function TableFilterBar() {
    return (
        <div className="pb-6 flex items-center gap-4">
            <ProductSearchBox />
            <ProductFilterCombobox
                title="category"
                data={[
                    {
                        value: "next.js",
                        label: "Next.js",
                    },
                    {
                        value: "sveltekit",
                        label: "SvelteKit",
                    },
                    {
                        value: "nuxt.js",
                        label: "Nuxt.js",
                    },
                    {
                        value: "remix",
                        label: "Remix",
                    },
                    {
                        value: "astro",
                        label: "Astro",
                    },
                ]}
            />
            <ProductFilterCombobox
                title="stock"
                data={[
                    {
                        value: "in_stock",
                        label: "In Stock",
                    },
                    {
                        value: "low_stock",
                        label: "Low Stock",
                    },
                    {
                        value: "out_of_stock",
                        label: "Out of Stock",
                    },
                ]}
            />

            <Button
                size="sm"
                variant="outline"
                className=" bg-transparent"
                asChild
            >
                <Link href="/products">
                    <IconX size={17} />
                    <span>Clear</span>
                </Link>
            </Button>

            <div className="ml-auto">
                <ExportProductDropdown>
                    <Button size="sm" variant="outline">
                        <IconPrinter size={17} />
                        <span className="pl-1">Export</span>
                    </Button>
                </ExportProductDropdown>
            </div>
        </div>
    );
}
