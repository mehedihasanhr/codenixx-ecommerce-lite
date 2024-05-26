"use client";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu";

export default function ExportProductDropdown({ children }) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem> Export as PDF</DropdownMenuItem>
                <DropdownMenuItem> Export as Excel</DropdownMenuItem>
                <DropdownMenuItem> Export as CSV</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
