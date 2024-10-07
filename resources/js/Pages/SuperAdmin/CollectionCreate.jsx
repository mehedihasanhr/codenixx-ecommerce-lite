import { Button } from "@/Components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/Components/ui/form";
import { Input } from "@/Components/ui/input";
import { Textarea } from "@/Components/ui/textarea";
import AdminLayout from "@/Layouts/AdminLayout";
import { zodResolver } from "@hookform/resolvers/zod";
import { Head, Link, router } from "@inertiajs/react";
import { IconArrowLeft } from "@tabler/icons-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

const schema = z.object({
    name: z.string().min(1, "Collection name is required!"),
    is_active: z.boolean().default(true),
    description: z.string().optional(),
});

export default function CollectionCreate() {
    const form = useForm({
        resolver: zodResolver(schema),
        defaultValues: {
            name: "",
            is_active: false,
            description: "",
        },
    });

    const onSubmit = (values) => {
        router.post(
            route("collection.create"),
            {
                ...values,
            },
            {
                onSuccess: () => {
                    toast.success("Collection successfully created.");
                },
            },
        );
    };

    return (
        <>
            <Head title="Create Collection" />
            {/* page code */}
            <AdminLayout>
                <div className="container max-w-3xl p-8">
                    <div className="flex items-center mb-8">
                        <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            asChild
                        >
                            <Link
                                href={route("collections")}
                                aria-label="backButton"
                                className="text-muted-foreground hover:no-underline"
                            >
                                <IconArrowLeft />
                            </Link>
                        </Button>
                        <h2 className="ml-1">Create Collection</h2>
                    </div>

                    {/* form */}
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="flex flex-col gap-4"
                        >
                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-lg text-muted-foreground">
                                        General Info
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    {/* collection name */}
                                    <FormField
                                        name="name"
                                        control={form.control}
                                        render={({ field }) => (
                                            <FormItem className="mb-4">
                                                <FormLabel>
                                                    Name
                                                    <sup className="text-destructive">
                                                        *
                                                    </sup>
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type="text"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    {/* Description */}
                                    <FormField
                                        name="description"
                                        control={form.control}
                                        render={({ field }) => (
                                            <FormItem className="mb-4">
                                                <FormLabel>
                                                    Description
                                                </FormLabel>
                                                <FormControl>
                                                    <Textarea
                                                        rows={10}
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </CardContent>
                            </Card>
                            <div className="flex items-center justify-end gap-4">
                                <Button
                                    type="submit"
                                    size="sm"
                                    className="w-fit"
                                >
                                    Save
                                </Button>
                            </div>
                        </form>
                    </Form>
                </div>
            </AdminLayout>
        </>
    );
}
