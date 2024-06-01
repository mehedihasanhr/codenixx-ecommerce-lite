import { Cross2Icon } from "@radix-ui/react-icons";
import { IconPhotoPlus } from "@tabler/icons-react";
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Button } from "./ui/button";

export function ImageUpload({ files, setFiles }) {

    const onDrop = useCallback((acceptedFiles) => {
        if (acceptedFiles?.length !== 0) {
            setFiles([
                ...files,
                ...acceptedFiles.map((file) =>
                    Object.assign(file, {
                        preview: URL.createObjectURL(file),
                    })
                ),
            ])
        }
    }, [setFiles]);

    const removeFile = (index) => {
        const removedFile = files[index];
        const updatedFiles = files.filter((_, i) => i !== index);
        setFiles(updatedFiles);
        URL.revokeObjectURL(removedFile.preview);
    };

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
    });


    return (
        <>
            {files.map((file, index) => (
                <div
                    key={index}
                    className="col-span-4 relative w-full rounded-lg group aspect-square border"
                >
                    <Button
                        type="button"
                        variant="destructive"
                        size="icon-sm"
                        onClick={() => removeFile(index)}
                        className="rounded-full absolute right-1 top-1 shadow-md items-center justify-center hidden group-hover:flex"
                    >
                        <Cross2Icon />
                    </Button>
                    <img
                        src={file.preview}
                        alt=""
                        width={150}
                        height={150}
                        className="w-full h-full object-contain rounded-lg"
                    />
                </div>
            ))}

            <div
                {...getRootProps({
                    className: `col-span-4 dropzone border-2 border-dashed w-full aspect-square rounded-lg flex items-center justify-center hover:bg-muted/30 bg-muted/20 hover:border-primary/30 `,
                })}
            >
                <input {...getInputProps()} multiple />
                <IconPhotoPlus size={40} stroke={1.5} opacity={0.3} />
            </div>
        </>
    );
}
