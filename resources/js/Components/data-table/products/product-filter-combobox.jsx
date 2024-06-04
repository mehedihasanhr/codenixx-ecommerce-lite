"use client";

import { Check, ChevronsUpDown } from "lucide-react";
import * as React from "react";

import { Button } from "@/Components/ui/button";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList
} from "@/Components/ui/command";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/Components/ui/popover";
import { ScrollArea } from "@/Components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { Inertia } from "@inertiajs/inertia";

export function ProductFilterCombobox({ data, title, defaultCategory }) {
    const [open, setOpen] = React.useState(false);
    const [value, setValue] = React.useState(defaultCategory);


    // handle brand change
    const handleCategorySelect = (d) => {
         setValue(d.id === value  ? "": d.id);

        const searchParams = new URLSearchParams(window.location.search);
        searchParams.set('category', d.id);

        const paramsObject = Object.fromEntries(searchParams.entries());

        // Update the query string using Inertia
        const newUrl = route('adminpanel.products', paramsObject);

        // Perform Inertia visit
        Inertia.visit(newUrl);
    }

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger
                className="rounded-sm border-dashed bg-transparent"
                asChild
            >
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="h-9 w-[200px] justify-between pr-2.5"
                >
                    {value !== "" ? (
                        data.find((d) => d.id === Number(value))?.name
                    ) : (
                        <span className="bold-normal text-muted-foreground">
                            Filter by {title}...
                        </span>
                    )}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-40" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
                <Command>
                    <CommandInput placeholder={`Search ${title}...`} />

                    <ScrollArea className="h-[300px]">
                        <CommandList className="max-h-fit">
                            <CommandEmpty>No {title} found.</CommandEmpty>

                            <CommandGroup>
                                {data.map((category) => (
                                    <React.Fragment key={category.id}>
                                        <CommandItem
                                            value={category.id}
                                            onSelect={() => {
                                                handleCategorySelect(category)
                                                setOpen(false);
                                            }}
                                        >
                                            <Check
                                                className={cn( "mr-2 h-4 w-4",
                                                    value === category.id ? "opacity-100" : "opacity-0"
                                                )}
                                            />
                                            {category.name}
                                        </CommandItem>
                                    </React.Fragment>
                                ))}
                            </CommandGroup>
                        </CommandList>
                    </ScrollArea>
                </Command>
            </PopoverContent>
        </Popover>
    );
}
