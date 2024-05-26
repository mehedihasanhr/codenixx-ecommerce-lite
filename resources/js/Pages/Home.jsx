import { Button } from "@/Components/ui/button";
import { Head, Link, useForm } from "@inertiajs/react";

export default function Home(props) {
    const { post } = useForm();

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
