"use client";

import { Input } from "@/Components/ui/input";
import { cn } from "@/lib/utils";
import { IconSearch } from "@tabler/icons-react";
import { useEffect, useState } from "react";

export function SearchBox({defaultValue, handleSearch, className, ...props}) {
    const [searchText, setSearchText] = useState(defaultValue);
    const [typing, setTyping] = useState(false);

    let timer;

    useEffect(() => {
        if(!timer && typing){
            timer = setTimeout(() => {
                setTyping(false);
                handleSearch(searchText);
            }, 600)
        }
    }, [searchText]);

    return (
        <div className="relative max-w-[300px]">
            <IconSearch
                size={18}
                className="absolute top-1/2 left-2.5 -translate-y-1/2 z-10 text-muted-foreground"
            />
            <Input
                type="text"
                value={searchText}
                onChange={e => {
                    setTyping(true);
                    setSearchText(e.target.value);
                    onChange(e)
                    clearTimeout(timer)
                }}
                className={cn("rounded-sm h-9 pl-8 bg-transparent", className)}
                {...props}
            />
        </div>
    );
}
