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
    CommandList,
} from "@/Components/ui/command";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/Components/ui/popover";
import { cn } from "@/lib/utils";

export function ProductFilterCombobox({ data, title }) {
    const [open, setOpen] = React.useState(false);
    const [value, setValue] = React.useState("");

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
                        data.find((d) => d.value === value)?.label
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

                    <CommandList>
                        <CommandEmpty>No {title} found.</CommandEmpty>
                        <CommandGroup>
                            {data.map((d) => (
                                <CommandItem
                                    key={d.value}
                                    value={d.value}
                                    onSelect={(currentValue) => {
                                        setValue(
                                            currentValue === value
                                                ? ""
                                                : currentValue
                                        );
                                        setOpen(false);
                                    }}
                                >
                                    <Check
                                        className={cn(
                                            "mr-2 h-4 w-4",
                                            value === d.value
                                                ? "opacity-100"
                                                : "opacity-0"
                                        )}
                                    />
                                    {d.label}
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
}
