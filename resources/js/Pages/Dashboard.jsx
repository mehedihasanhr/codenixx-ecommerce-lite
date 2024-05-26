import { Button } from "@/Components/ui/button";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import SuperUserDashboard from "./SuperAdmin/Dashboard";

export default function Dashboard({ auth }) {
    console.log({ auth });

    if (auth.user?.role === "ADMIN") {
        return <SuperUserDashboard />;
    }

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="p-6 flex items-center justify-between bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="text-gray-900">You're logged in!</div>
                        <Button asChild>
                            <Link
                                href={route("logout")}
                                method="post"
                                as="button"
                            >
                                Log out
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
