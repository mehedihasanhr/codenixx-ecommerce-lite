import { Separator } from "@/Components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/Components/ui/tabs"
import AdminLayout from "@/Layouts/AdminLayout"
import { Head } from "@inertiajs/react"
import CurrencySetting from "./CurrencySetting"

export default function Settings() {
  return (
     <>
        <Head title="Settings" />
        <AdminLayout className="bg-background">
            <div className="p-8">
                <h3 className="mb-3">Settings</h3>

                <Tabs defaultValue="general">
                    <TabsList
                        className="p-0 h-fit w-full justify-start bg-transparent"
                    >
                        <TabTrigger value="general">General</TabTrigger>
                        <TabTrigger value="currency">Currency</TabTrigger>
                        <TabTrigger value="tax">Tax</TabTrigger>
                        <TabTrigger value="payment">Payment</TabTrigger>
                        <TabTrigger value="shipping">Shipping</TabTrigger>
                        <TabTrigger value="email">Email</TabTrigger>
                        <TabTrigger value="seo">Seo</TabTrigger>
                        <TabTrigger value="social_media">Social media</TabTrigger>
                        <TabTrigger value="user_account">User account</TabTrigger>
                        <TabTrigger value="notification">Notification</TabTrigger>
                    </TabsList>
                    <Separator  className="-mt-[1px] mb-5"/>

                    <TabsContent value="general">General</TabsContent>
                    <TabsContent value="currency">
                        <CurrencySetting settings={{currency_code: "USD", currency_format: "en-US"}} />
                    </TabsContent>
                </Tabs>
            </div>
        </AdminLayout>
     </>
  )
}



function TabTrigger({value, children}){
    return (
        <TabsTrigger
            value={value}
            className="rounded-none px-5 rounded-t-md border border-transparent bg-transparent data-[state=active]:border-border data-[state=active]:border-b-primary data-[state=active]:bg-neutral-50"
        >
            {children}
        </TabsTrigger>
    )
}
