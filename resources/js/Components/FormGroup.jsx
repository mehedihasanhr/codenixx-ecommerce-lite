import { cn } from "@/lib/utils";

export function FormGroup({ children, className }) {
    return (
        <div className={cn("flex flex-col space-y-2.5", className)}>
            {children}
        </div>
    );
}
