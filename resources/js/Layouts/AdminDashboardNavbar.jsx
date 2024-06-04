import { Avatar, AvatarFallback, AvatarImage } from "@/Components/ui/avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu";
import { getInitials } from "@/utils/getInitialsName";
import { Link, usePage } from "@inertiajs/react";
import { IconLogout, IconSettings, IconUser } from "@tabler/icons-react";

export function AdminDashboardNavbar() {
    const page = usePage();
    const { user } = page.props.auth;

    return (
        <div className="sticky top-0 left-0 isset-x-0 z-50 h-14 border-b flex items-center justify-between px-8 bg-background">
            <div className="ml-auto">
                <DropdownMenu>
                    <DropdownMenuTrigger>
                        <Avatar className="w-8 h-8">
                            <AvatarImage
                                src="https://github.com/shadcn.png"
                                alt="@shadcn"
                            />
                            <AvatarFallback>
                                {getInitials(user.name)}
                            </AvatarFallback>
                        </Avatar>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                            <Link
                                href="#"
                                className="flex items-center space-x-2"
                            >
                                <IconUser size={15} />
                                <span>Profile</span>
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <Link
                                href={route("adminpanel.settings")}
                                className="flex items-center space-x-2"
                            >
                                <IconSettings size={15} />
                                <span>Settings</span>
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <Link
                                href={route("logout")}
                                method="post"
                                as="button"
                                className="flex items-center space-x-2"
                            >
                                <IconLogout size={15} />
                                <span>Logout</span>
                            </Link>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>
    );
}
