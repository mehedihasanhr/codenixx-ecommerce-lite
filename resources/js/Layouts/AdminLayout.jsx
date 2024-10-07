import { cn } from "@/lib/utils";
import { AdminDashboardNavbar } from "./AdminDashboardNavbar";
import AdminDashboardSidebar from "./AdminDashboardSidebar";

export default function AdminLayout({ className, ...props }) {
    return (
        <div
            className={cn("flex w-screen h-screen overflow-hidden", className)}
        >
            <AdminDashboardSidebar />
            <div className="flex-1 h-screen overflow-y-auto overflow-x-hidden">
                <AdminDashboardNavbar />
                {props.children}
            </div>
        </div>
    );
}
