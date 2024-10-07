import { Button } from "@/Components/ui/button";
import { cn } from "@/lib/utils";
import { Link } from "@inertiajs/react";
import { IconPlus } from "@tabler/icons-react";

export function PageHeading({
    heading,
    addButtonText = "",
    addButtonHref,
    className,
}) {
    return (
        <div
            className={cn("flex items-center justify-between mb-8", className)}
        >
            <h2>{heading}</h2>
            {addButtonHref ? (
                <Button size="sm" asChild>
                    <Link
                        href={addButtonHref}
                        className="flex items-center space-x-1 hover:no-underline"
                    >
                        <IconPlus size={15} />
                        <span>{addButtonText}</span>
                    </Link>
                </Button>
            ) : null}
        </div>
    );
}
