import { OrdersTable } from "@/Components/data-table/orders/DataTable";
import AdminLayout from "@/Layouts/AdminLayout";

export default function Orders(props) {

    console.log({...props})

  return (
   <AdminLayout>
    <div className="p-8">
        <div className="flex items-center justify-between gap-8">
            <h3>Orders</h3>
        </div>


        <OrdersTable {...props} />
    </div>
   </AdminLayout>
  )
}
