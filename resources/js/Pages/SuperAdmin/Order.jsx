import AdminLayout from "@/Layouts/AdminLayout";

export default function OrderPage(props) {
    console.log(props.order);

    return (
        <AdminLayout>
            <div className="p-8">Order page</div>
        </AdminLayout>
    );
}
