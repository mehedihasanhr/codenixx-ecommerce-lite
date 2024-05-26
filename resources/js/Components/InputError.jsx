import { cn } from "@/lib/utils";

export function InputError({ message, className }) {
    if (!message) return null;

    return (
        <div className={cn("text-sm font-normal text-destructive", className)}>
            {message}
        </div>
    );
}
