import { CaretSortIcon } from "@radix-ui/react-icons";
import { IconCheck } from "@tabler/icons-react";
import React from "react";
import {
    Command,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "./ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { ScrollArea } from "./ui/scroll-area";

export function BrandSelection({ brands, value, onChange }) {
    const [open, setOpen] = React.useState(false);
    const [selected, setSelected] = React.useState(() => value ? brands.find(b => b.id === value)?.name : "");

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger className="w-full h-10 px-3 py-2 border rounded-md text-sm text-left">
                <span className="flex items-center gap-2">
                    <span className="flex-1">
                        {selected ? selected : "Select Brand"}
                    </span>
                    <CaretSortIcon />
                </span>
            </PopoverTrigger>
            <PopoverContent className="p-0 w-[var(--radix-popover-trigger-width)]">
                <Command>
                    <CommandList className="max-h-fit">
                        <CommandGroup>
                            <CommandInput />
                            <ScrollArea className="h-64 pt-1">
                                {brands?.map((brand) => (
                                    <CommandItem
                                        value={brand.id}
                                        key={brand.id}
                                        onSelect={(currentValue) => {
                                            setSelected(currentValue);
                                            onChange(brand.id);
                                            setOpen(false);
                                        }}
                                        className="flex items-center gap-2"
                                    >
                                        <IconCheck
                                            size={15}
                                            className={
                                                value === brand.id
                                                    ? "opacity-6"
                                                    : "opacity-0"
                                            }
                                        />
                                        {brand.name}
                                    </CommandItem>
                                ))}
                            </ScrollArea>
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
}
