import { SearchBox } from "@/Components/Searchbox";
import { OrdersTable } from "@/Components/data-table/customers/OrdersTable";
import { Avatar, AvatarImage } from "@/Components/ui/avatar";
import { Button } from "@/Components/ui/button";
import { Separator } from "@/Components/ui/separator";
import AdminLayout from "@/Layouts/AdminLayout";
import { Customer } from "@/utils/customers";
import { Head, Link } from "@inertiajs/react";
import {
    IconArrowLeft,
    IconMessageDots,
    IconTimeline,
} from "@tabler/icons-react";

export default function CustomerDetails(props) {
    const customer = new Customer(props.customer);
    return (
        <>
            <Head title="Customer Details" />
            <AdminLayout>
                <div className="container max-w-6xl h-[93%] p-8">
                    <div className="flex bg-white h-full rounded-lg overflow-hidden border">
                        {/* Left side */}
                        <div className="w-80 h-full border-r">
                            <div className="relative">
                                {/* banner */}
                                <div className="h-32 bg-profile_cover" />
                                <div className="flex flex-col items-center -translate-y-10 px-5">
                                    <Avatar className="w-20 h-20 border-4 mb-2">
                                        <AvatarImage
                                            src="https://github.com/shadcn.png"
                                            alt="@shadcn"
                                        />
                                    </Avatar>

                                    <h3>{customer?.name}</h3>
                                    <p>{customer?.email}</p>
                                    <p>+1234567891</p>
                                    <div className="flex items-center gap-3 mt-5">
                                        <Button size="sm" className="gap-1">
                                            <IconMessageDots
                                                size={21}
                                                stroke={1.5}
                                            />
                                            Send Message
                                        </Button>
                                        <Button
                                            size="sm"
                                            variant="outline"
                                            className="gap-1"
                                        >
                                            <IconTimeline
                                                stroke={1.5}
                                                size={21}
                                            />
                                            Analytics
                                        </Button>
                                    </div>
                                </div>

                                <div className="px-5 -mt-3">
                                    <Separator className="mb-5" />
                                    <div>
                                        <h5 className="mb-1">Address</h5>
                                        <p>
                                            {customer?.address?.[0]?.getAddressString()}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* right side */}
                        <div className="flex-1 h-full p-9">
                            <div className="flex items-center space-x-2 mb-5">
                                <Button variant="outline" size="icon" asChild>
                                    <Link
                                        href={route("customers")}
                                        className="text-foreground"
                                    >
                                        <IconArrowLeft size={21} />
                                    </Link>
                                </Button>
                                <div>
                                    <h3>{customer?.name}</h3>
                                    <p className="text-xs font-normal text-muted-foreground">
                                        Back to customers
                                    </p>
                                </div>
                            </div>
                            {/* Widgets */}
                            <div className="grid grid-cols-12 gap-4 mb-5">
                                <div className="col-span-4 bg-background backdrop-blur-md py-2.5 px-4 rounded-lg border">
                                    <h2>152</h2>
                                    <p>Invoices total</p>
                                </div>

                                <div className="col-span-4 bg-background backdrop-blur-md py-2.5 px-4 rounded-lg border">
                                    <h2>140</h2>
                                    <p>Invoice completed</p>
                                </div>

                                <div className="col-span-4 bg-background backdrop-blur-md py-2.5 px-4 rounded-lg border">
                                    <h2>$14,000</h2>
                                    <p>Pays total </p>
                                </div>
                            </div>

                            {/* Search */}
                            <SearchBox
                                className="w-full h-12 rounded-lg"
                                containerClassName="max-w-full"
                                placeholder="Search invoice..."
                            />

                            {/* invoice table */}
                            <OrdersTable customerId={customer.id} />
                        </div>
                    </div>
                </div>
            </AdminLayout>
        </>
    );
}
