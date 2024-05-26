import { ImageGallery } from "@/Components/ImageGallery";
import { Button } from "@/Components/ui/button";

import AdminLayout from "@/Layouts/AdminLayout";

export default function SuperUserDashboard() {
    return (
        <AdminLayout>
            <div className="p-6">
                <ImageGallery>
                    <Button>Image Gallery</Button>
                </ImageGallery>
            </div>
        </AdminLayout>
    );
}
