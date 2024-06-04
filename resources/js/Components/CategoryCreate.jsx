import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/Components/ui/dialog";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { Textarea } from "@/Components/ui/textarea";
import { useForm } from "@inertiajs/react";
import React from "react";
import { toast } from "sonner";
import { FormGroup } from "./FormGroup";
import { InputError } from "./InputError";
import { Button } from "./ui/button";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "./ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

export default function CategoryCreate({ children, categories }) {
    const [dialogOpen, setDialogOpen] = React.useState(false);
    const [open, setOpen] = React.useState(false);
    const { data, setData, errors, post, processing } = useForm({
        name: "",
        description: "",
        parent_id: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("adminpanel.categories"), {
            onError: (error) => {
                console.log({ error });
            },
            onSuccess: () => {
                toast.success("Category successfully added.");
                setDialogOpen(false);
            },
        });
    };

    return (
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle> Create Category </DialogTitle>
                </DialogHeader>

                <form
                    className="flex flex-col gap-4 mt-4"
                    onSubmit={handleSubmit}
                >
                    {/* Category name */}
                    <FormGroup>
                        <Label>
                            {" "}
                            Name <sup className="text-red-500">*</sup>{" "}
                        </Label>
                        <Input
                            type="text"
                            placeholder="Category name"
                            value={data.name}
                            onChange={(e) =>
                                setData((prev) => ({
                                    ...prev,
                                    name: e.target.value,
                                }))
                            }
                        />
                        <InputError message={errors.name} />
                    </FormGroup>

                    {/* Parent ID */}
                    <FormGroup>
                        <Label> Parent </Label>
                        <Popover open={open} onOpenChange={setOpen}>
                            <PopoverTrigger className="border h-10 rounded-lg text-left px-4">
                                {categories.find(
                                    (category) => category.id === data.parent_id
                                )?.name ?? (
                                    <span className="text-sm text-muted-foreground">
                                        Select parent category
                                    </span>
                                )}
                            </PopoverTrigger>
                            <PopoverContent className="p-0 w-[var(--radix-popover-trigger-width)]">
                                <Command>
                                    <CommandInput />
                                    <CommandList>
                                        <CommandEmpty />
                                        <CommandGroup>
                                            {categories.map((category) => (
                                                <CommandItem
                                                    key={category.id}
                                                    value={category.name}
                                                    onSelect={() => {
                                                        setData((prev) => ({
                                                            ...prev,
                                                            parent_id:
                                                                category.id,
                                                        }));

                                                        setOpen(false);
                                                    }}
                                                >
                                                    {category.name}
                                                </CommandItem>
                                            ))}
                                        </CommandGroup>
                                    </CommandList>
                                </Command>
                            </PopoverContent>
                        </Popover>
                        <InputError message={errors.name} />
                    </FormGroup>

                    {/* Category description */}
                    <FormGroup>
                        <Label> Description </Label>
                        <Textarea
                            placeholder=""
                            value={data.description}
                            onChange={(e) =>
                                setData((prev) => ({
                                    ...prev,
                                    description: e.target.value,
                                }))
                            }
                        />
                        <InputError message={errors.description} />
                    </FormGroup>

                    <Button type="submit" disabled={processing}>
                        {processing ? "Processing..." : "Save"}
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    );
}
