"use client";

import { Input } from "@/Components/ui/input";
import { IconSearch } from "@tabler/icons-react";

export function ProductSearchBox() {

    return (
        <div className="relative max-w-[300px]">
            <IconSearch
                size={18}
                className="absolute top-1/2 left-2.5 -translate-y-1/2 z-10 text-muted-foreground"
            />
            <Input
                type="text"
                placeholder="Filter product..."
                className="rounded-sm h-9 pl-8 bg-transparent"
            />
        </div>
    );
}
