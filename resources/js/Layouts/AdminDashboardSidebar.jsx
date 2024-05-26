import Logo from "@/Components/logo";
import { SidebarLink } from "@/Components/SidebarLink";
import { ScrollArea } from "@/Components/ui/scroll-area";
import {
    IconBadge,
    IconBrandGooglePhotos,
    IconLayoutGrid,
    IconNewSection,
    IconSettings,
    IconShoppingBag,
    IconShoppingCart,
    IconSubtask,
    IconUsersGroup,
} from "@tabler/icons-react";

export default function AdminDashboardSidebar(props) {
    return (
        <div className="flex flex-col w-64 border-r h-screen">
            <div className="border-b border-border h-14 px-2.5 py-1">
                <Logo />
            </div>

            <ScrollArea className="flex-1">
                <div className="flex flex-col gap-0.5 p-2.5">
                    {/* dashboard */}
                    <SidebarLink
                        href={route("dashboard")}
                        title="Dashboard"
                        icon={<IconLayoutGrid />}
                    />

                    {/* Orders */}
                    <SidebarLink
                        href={route("dashboard.settings")}
                        title="Orders"
                        icon={<IconShoppingCart />}
                    />

                    {/* Products */}
                    <SidebarLink
                        href={route("dashboard.products")}
                        title="Products"
                        icon={<IconShoppingBag />}
                    />

                    {/* Categories */}
                    <SidebarLink
                        href={route("dashboard.settings")}
                        title="Categories"
                        icon={<IconSubtask />}
                    />

                    {/* Categories */}
                    <SidebarLink
                        href={route("dashboard.settings")}
                        title="Brands"
                        icon={<IconBadge />}
                    />

                    {/* Collections */}
                    <SidebarLink
                        href={route("dashboard.settings")}
                        title="Collections"
                        icon={<IconNewSection />}
                    />

                    {/* Customers */}
                    <SidebarLink
                        href={route("dashboard.settings")}
                        title="Customers"
                        icon={<IconUsersGroup />}
                    />

                    {/* Gallery */}
                    <SidebarLink
                        href={route("dashboard.settings")}
                        title="Gallery"
                        icon={<IconBrandGooglePhotos />}
                    />

                    {/* settings */}
                    <SidebarLink
                        href={route("dashboard.settings")}
                        title="Settings"
                        icon={<IconSettings />}
                    />
                </div>
            </ScrollArea>
        </div>
    );
}
