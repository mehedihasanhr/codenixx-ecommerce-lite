import { Button } from "@/Components/ui/button";
import { Head, Link } from "@inertiajs/react";

export default function Product(props) {
    return (
        <>
            <Head title="Home page" />
            <h2>Home page</h2>

            <Button asChild>
                <Link href={route("welcome")}>Go to welcome page</Link>
            </Button>
        </>
    );
}
