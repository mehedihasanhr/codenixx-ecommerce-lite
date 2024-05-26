import { FormGroup } from "@/Components/FormGroup";
import { InputError } from "@/Components/InputError";
import { Button } from "@/Components/ui/button";
import { Checkbox } from "@/Components/ui/checkbox";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import AuthenticationLayout from "@/Layouts/AuthenticationLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { IconLock, IconMail } from "@tabler/icons-react";
import { useEffect } from "react";

export default function Login() {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: "mehedihasan.hr.324@gmail.com",
        password: "password",
        remember: false,
    });

    // reset form
    useEffect(() => {
        return () => {
            reset("password");
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();
        post(route("admin.login"));
    };

    // handle change
    const onChange = (e) => {
        e.preventDefault();
        setData((previousData) => ({
            ...previousData,
            [e.target.name]: e.target.value,
        }));
    };

    return (
        <AuthenticationLayout>
            <Head title="Log in" />

            <h1 className="text-center mb-8">Login your account</h1>

            <form className="flex flex-col space-y-3.5" onSubmit={submit}>
                <FormGroup>
                    <Label> Email </Label>
                    <div className="relative">
                        <Input
                            name="email"
                            type="email"
                            placeholder="Ex: jhon@example.com"
                            value={data.email}
                            onChange={onChange}
                            className="pr-16"
                        />
                        <IconMail
                            size={20}
                            stroke={1.5}
                            opacity={0.5}
                            className="absolute right-2 top-1/2 -translate-y-1/2"
                        />
                    </div>
                    <InputError message={errors.email} />
                </FormGroup>

                <FormGroup>
                    <Label> Password </Label>
                    <div className="relative">
                        <Input
                            name="password"
                            type="password"
                            placeholder="*******"
                            value={data.password}
                            onChange={onChange}
                        />
                        <IconLock
                            size={20}
                            stroke={1.5}
                            opacity={0.5}
                            className="absolute right-2 top-1/2 -translate-y-1/2"
                        />
                    </div>
                    <InputError message={errors.password} />
                </FormGroup>

                <FormGroup>
                    <div className="flex items-center mb-2.5">
                        <div className="flex items-center space-x-2 5">
                            <Checkbox
                                checked={data.remember}
                                onCheckedChange={(status) =>
                                    setData((prevData) => ({
                                        ...prevData,
                                        remember: status,
                                    }))
                                }
                            />
                            <Label> Remember me</Label>
                        </div>
                        <Link
                            href="#"
                            className="ml-auto text-sm text-muted-foreground hover:underline"
                        >
                            Forgot Password
                        </Link>
                    </div>
                    <InputError message={errors.remember} />
                </FormGroup>

                <Button disabled={processing}>
                    {!processing ? "Login" : "Processing..."}
                </Button>
            </form>
        </AuthenticationLayout>
    );
}
