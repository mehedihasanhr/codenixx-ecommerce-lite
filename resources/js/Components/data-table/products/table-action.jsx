import { Button } from "@/Components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu";
import { Link } from "@inertiajs/react";
import { IconDots, IconEdit, IconEye, IconTrash } from "@tabler/icons-react";

export default function TableActionDropdown({ product }) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button size="icon-sm" variant="ghost">
                    <IconDots size={16} />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem>
                    <Link
                        href={route("product.view", { product_id: product.id })}
                        className="flex items-center w-full"
                    >
                        <IconEye size={16} />
                        <span className="px-1.5">Preview</span>
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <Link
                        href={route("product.edit", { product_id: product.id })}
                        className="flex items-center w-full"
                    >
                        <IconEdit size={16} />
                        <span className="px-1.5">Edit</span>
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <Link
                        href={route("product.trash", {
                            product_id: product.id,
                        })}
                        method="patch"
                        className="flex items-center w-full"
                    >
                        <IconTrash size={16} />
                        <span className="px-1.5">Delate</span>
                    </Link>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
