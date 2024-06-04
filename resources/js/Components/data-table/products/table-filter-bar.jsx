import { Button } from "@/Components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/Components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/Components/ui/popover";
import { ScrollArea } from "@/Components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { Inertia } from "@inertiajs/inertia";
import { Link } from "@inertiajs/react";
import { IconPrinter, IconX } from "@tabler/icons-react";
import { Check, ChevronsUpDown } from "lucide-react";
import React from "react";
import ColumnsConfig from "./column-config";
import ExportProductDropdown from "./export-dropdown";
import { ProductSearchBox } from "./product-filter-box";
import { ProductFilterCombobox } from "./product-filter-combobox";

export default function TableFilterBar({
    table,
    defaultCategory="",
    categories,
    defaultBrand="",
    brands
}) {
    const [brandPopover, setBrandPopover] = React.useState(false);
    const [brand, setBrand] = React.useState(defaultBrand);


    // handle brand change
    const handleBrandFilterOnSelect = (d) => {
        setBrand(d.id === brand  ? "": d.id);
        setBrandPopover(false)

        const searchParams = new URLSearchParams(window.location.search);
        searchParams.set('brand', d.id);

        const paramsObject = Object.fromEntries(searchParams.entries());

        // Update the query string using Inertia
        const newUrl = route('adminpanel.products', paramsObject);

        // Perform Inertia visit
        Inertia.visit(newUrl);
    }



    return (
        <div className="pb-6 flex flex-wrap items-center gap-x-4 gap-y-2.5">
            <ProductSearchBox />
            <ProductFilterCombobox
                title="category"
                defaultCategory={defaultCategory}
                data={categories}
            />

            {/* stock filter */}
            <Popover open={brandPopover} onOpenChange={setBrandPopover}>
                <PopoverTrigger
                    className="rounded-sm border-dashed bg-transparent"
                    asChild
                >
                    <Button
                        variant="outline"
                        role="combobox"
                        className="h-9 w-[200px] justify-between pr-2.5"
                    >
                        {brand !== "" ? (
                            brands.find((d) => d.id === Number(brand))?.name
                        ) : (
                            <span className="bold-normal text-muted-foreground">
                                Filter by brand...
                            </span>
                        )}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-40" />
                    </Button>
                </PopoverTrigger>

                 <PopoverContent className="w-[200px] p-0">
                <Command>
                    <CommandInput placeholder={`Search brand...`} />

                    <ScrollArea className="h-[300px]">
                        <CommandList className="max-h-fit">
                            <CommandEmpty>No brand found.</CommandEmpty>

                            <CommandGroup>
                                {brands.map((d) => (
                                    <React.Fragment key={d.id}>
                                        <CommandItem
                                            value={d.id}
                                            onSelect={() => handleBrandFilterOnSelect(d)}
                                        >
                                            <Check
                                                className={cn( "mr-2 h-4 w-4",
                                                    brand === d.id ? "opacity-100" : "opacity-0"
                                                )}
                                            />
                                            {d.name}
                                        </CommandItem>
                                    </React.Fragment>
                                ))}
                            </CommandGroup>
                        </CommandList>
                    </ScrollArea>
                </Command>
            </PopoverContent>
            </Popover>

           {(defaultBrand || defaultCategory) ?
             <Button
                size="sm"
                variant="outline"
                className=" bg-transparent"
                asChild
            >
                <Link href={route('adminpanel.products')}>
                    <IconX size={17} />
                    <span>Clear</span>
                </Link>
            </Button>
            : null
           }

            <div className="flex items-center gap-4">
                    <ExportProductDropdown>
                        <Button size="sm" variant="outline">
                            <IconPrinter size={17} />
                            <span className="pl-1">Export</span>
                        </Button>
                    </ExportProductDropdown>

                <ColumnsConfig table={table} />
            </div>
        </div>
    );
}
