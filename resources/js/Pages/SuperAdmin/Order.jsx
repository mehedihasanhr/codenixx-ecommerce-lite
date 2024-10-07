import { OrderItem } from "@/Components/OrderItem";
import Switch from "@/Components/Switch";
import { Badge } from "@/Components/ui/badge";
import { Button } from "@/Components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import { Separator } from "@/Components/ui/separator";
import AdminLayout from "@/Layouts/AdminLayout";
import { Order } from "@/utils/order";
import { Head, Link, router } from "@inertiajs/react";
import {
    IconArrowNarrowLeft,
    IconPrinter,
    IconTruckDelivery,
} from "@tabler/icons-react";
import _ from "lodash";
import { toast } from "sonner";

export default function OrderPage(props) {
    const order = new Order(props.order);
    const paymentStatus = order.getPaymentStatus();

    // update status
    const updateStatus = (statusId) => {
        router.put(
            route("adminpanelUpdateOrderStatus", {
                invoice: order?.getInvoice(),
            }),
            {
                status_id: statusId,
            },
            {
                onSuccess: () => {
                    toast.success("Order status successfully updated!");
                },
            }
        );
    };

    return (
        <AdminLayout>
            <Head title={`Order#${order.getInvoice()}`} />
            <div className="p-8">
                <div className="flex justify-between gap-4 mb-10">
                    <div className="flex flex-col">
                        <div className="flex items-center gap-2.5 mb-2.5">
                            <Button
                                aria-label="backButtonContainingAnArrowSign"
                                variant="outline"
                                size="icon"
                                asChild
                            >
                                <Link
                                    href={route("adminpanel.orders")}
                                    className="text-sm text-foreground opacity-80 hover:no-underline"
                                >
                                    <IconArrowNarrowLeft />
                                </Link>
                            </Button>

                            <h2>Order# {order.getInvoice()}</h2>
                        </div>

                        <div className="ml-12">
                            <Badge
                                variant="outline"
                                className={`py-1 rounded`}
                                style={{
                                    background: order?.status?.background,
                                    color: order?.status?.foreground,
                                }}
                            >
                                {_.startCase(order?.status?.name)}
                            </Badge>
                        </div>
                    </div>

                    <div className="flex gap-4">
                        <Switch>
                            <Switch.Case condition={order?.status?.id === 1}>
                                <Button
                                    size="sm"
                                    className="text-sm"
                                    onClick={() => updateStatus(2)}
                                >
                                    <IconTruckDelivery
                                        size={17}
                                        className="mr-1"
                                    />
                                    Confirm order
                                </Button>
                            </Switch.Case>

                            <Switch.Case condition={order?.status?.id === 2}>
                                <Button
                                    size="sm"
                                    className="text-sm"
                                    onClick={() => updateStatus(3)}
                                >
                                    <IconTruckDelivery
                                        size={17}
                                        className="mr-1"
                                    />
                                    Place order
                                </Button>
                            </Switch.Case>
                        </Switch>
                        <Button size="sm" variant="outline" className="text-sm">
                            <IconPrinter size={17} className="mr-1" />
                            Export
                        </Button>
                    </div>
                </div>

                {/* Order item's details */}
                <Card className="p-4 mb-4">
                    <CardContent className="p-0 grid grid-cols-12 gap-4 items-center">
                        <div className="col-span-12 lg:col-span-6 xl:col-span-3 border-l-2 px-3">
                            <h6 className="mb-3 text-muted-foreground">
                                Customer
                            </h6>
                            <div>
                                <h5>{order?.customer?.name}</h5>
                                <span>{order?.customer?.email}</span>
                                <span>{order?.customer?.phone}</span>
                            </div>
                        </div>

                        <div className="col-span-12 lg:col-span-6 xl:col-span-3 border-l-2 px-3">
                            <h6 className="mb-3 text-muted-foreground">
                                Billing address
                            </h6>
                            <div className="max-w-[200px]">
                                <span>{order?.billingAddress}</span>
                            </div>
                        </div>

                        <div className="col-span-12 lg:col-span-6 xl:col-span-3 border-l-2 px-3">
                            <h6 className="mb-3 text-muted-foreground">
                                Shipping address
                            </h6>
                            <div className="max-w-[200px]">
                                <span>{order?.shippingAddress}</span>
                            </div>
                        </div>

                        <div className="col-span-12 lg:col-span-6 xl:col-span-3 border-l-2 px-3">
                            <h6 className="mb-3 text-muted-foreground">
                                Payment
                            </h6>
                            <div className="flex flex-col gap-1">
                                <span className="text-xl font-medium block">
                                    {order?.getTotalCost("BDT").formatted}
                                </span>
                                <span
                                    className="py-1 px-3 rounded-lg w-fit"
                                    style={{
                                        color: paymentStatus.foreground,
                                        background: paymentStatus.background,
                                    }}
                                >
                                    {paymentStatus.status}
                                </span>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Order item's details */}
                <Card>
                    <CardHeader className="border-b mb-2.5">
                        <CardTitle> Products </CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-col p-0">
                        {order?.products?.map((orderItem) => (
                            <OrderItem
                                key={orderItem.id}
                                item={orderItem}
                                {...props}
                            />
                        ))}

                        <div className="text-right px-3.5">
                            <div className="grid grid-cols-12 gap-4 py-2.5">
                                <div className="col-span-9">
                                    <span className="text-sm">Sub total:</span>
                                </div>
                                <div className="col-span-3 w-full text-right text-sm font-medium">
                                    {order.getSubTotalPrice("BDT").formatted}
                                </div>
                            </div>
                            <div className="grid grid-cols-12 gap-4 mb-3">
                                <div className="col-span-9">
                                    <span className="text-sm">
                                        Delivery Cost:
                                    </span>
                                </div>
                                <div className="col-span-3 w-full text-right text-sm font-medium">
                                    {order.getDeliveryCost("BDT").formatted}
                                </div>
                            </div>

                            <div className="relative grid grid-cols-12 gap-4">
                                <span
                                    className="absolute text-6xl font-medium opacity-20 -rotate-45 right-0 -translate-y-[50px] pointer-events-none"
                                    style={{
                                        color: paymentStatus.foreground,
                                    }}
                                >
                                    ({paymentStatus.status})
                                </span>
                                <Separator className="col-span-5 col-start-8 mb-4" />
                            </div>

                            <div className="grid grid-cols-12 gap-4 mb-3">
                                <div className="relative col-span-9">
                                    <span className="font-medium">Total:</span>
                                </div>
                                <div className="col-span-3 w-full text-right font-medium">
                                    <div className="flex flex-col font-bold">
                                        {order.getTotalCost("BDT").formatted}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AdminLayout>
    );
}
