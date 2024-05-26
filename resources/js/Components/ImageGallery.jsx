import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/Components/ui/dialog";

import { Button } from "@/Components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu";
import { Separator } from "@/Components/ui/separator";
import { IconPlus, IconSquareCheckFilled } from "@tabler/icons-react";
import { ScrollArea } from "./ui/scroll-area";

export function ImageGallery({ children, selected, onSelect }) {
    return (
        <Dialog>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent className="max-w-[700px]">
                <DialogHeader>
                    <DialogTitle>Image Gallery</DialogTitle>
                </DialogHeader>

                <div>
                    <DropdownMenu>
                        <DropdownMenuTrigger
                            className="flex items-center space-x-1.5"
                            asChild
                        >
                            <Button variant="outline" size="sm">
                                <IconPlus size={15} />
                                <span>Upload</span>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="start">
                            <DropdownMenuItem>
                                Upload from Local
                            </DropdownMenuItem>
                            <DropdownMenuItem> Upload by URL </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>

                <Separator />

                <ScrollArea className="max-h-[400px] px-3">
                    <div className="grid grid-cols-3 xs:grid-cols-4 sm:grid-cols-5 md:grid-cols-6 gap-4">
                        {[...Array(40)].map((_, index) => (
                            <GalleryItem
                                key={index}
                                src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cHJvZHVjdHxlbnwwfHwwfHx8MA%3D%3D"
                                alt=""
                                selected={index === 2}
                                onSelect={() => {}}
                            />
                        ))}
                    </div>
                </ScrollArea>
                <Separator />
                <div className="w-full flex justify-end">
                    <Button size="sm">Insert</Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}

export function GalleryItem({ src, alt = "", selected, onSelect }) {
    if (!src) return null;
    return (
        <div className="relative" onClick={() => onSelect(url)}>
            {selected ? (
                <>
                    <div className="absolute top-0 left-0 bg-foreground/20 w-full h-full p-1">
                        <span className="relative before:w-4 before:h-4 before:bg-white before:absolute before:left-1 before:top-1 before:block">
                            <span className="absolute top-0 left-0">
                                <IconSquareCheckFilled className="[&>path]:fill-primary" />
                            </span>
                        </span>
                    </div>
                </>
            ) : null}
            <img
                src={src}
                alt={alt}
                width={100}
                height={100}
                className="w-full rounded-lg object-cover aspect-square"
            />
        </div>
    );
}
