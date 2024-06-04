import { cn } from "@/lib/utils";
import { Link, usePage } from "@inertiajs/react";

export function SidebarLink({ href, className, title, icon, ...props }) {
    const page = usePage();
    const url = new URL(href);

    return (
        <Link
            {...props}
            href={href}
            className={cn(
                "w-full py-2.5 px-4 rounded-lg text-muted-foreground hover:text-foreground hover:bg-foreground/[0.03] flex items-center space-x-2.5 data-[active=true]:bg-primary data-[active=true]:text-primary-foreground transition-colors duration-300 hover:no-underline",
                className
            )}
            data-active={page.url.startsWith(url.pathname) ? true : false}
        >
            {icon}
            <span>{title}</span>
        </Link>
    );
}
