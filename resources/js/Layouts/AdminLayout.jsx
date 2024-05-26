import { ScrollArea } from "@/Components/ui/scroll-area";
import { AdminDashboardNavbar } from "./AdminDashboardNavbar";
import AdminDashboardSidebar from "./AdminDashboardSidebar";

export default function AdminLayout(props) {
    return (
        <div className="flex h-screen overflow-hidden">
            <AdminDashboardSidebar />
            <ScrollArea className="flex-1">
                <AdminDashboardNavbar />
                {props.children}
            </ScrollArea>
        </div>
    );
}
