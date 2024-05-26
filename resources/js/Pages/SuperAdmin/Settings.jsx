import { Button } from "@/Components/ui/button";
import AdminLayout from "@/Layouts/AdminLayout";
import { Cross2Icon } from "@radix-ui/react-icons";

export default function Settings(props) {
    return (
        <AdminLayout>
            <div className="flex items-center justify-center">
                <div className="w-4/6 h-4/5 bg-background rounded-lg">
                    <div>
                        <Button variant="ghost" size="icon">
                            <Cross2Icon />
                        </Button>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
