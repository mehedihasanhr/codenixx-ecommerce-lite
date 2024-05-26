import { FormGroup } from "@/Components/FormGroup";
import { AppleBrandIcon, GoogleBrandIcon } from "@/Components/icon";
import { InputError } from "@/Components/InputError";
import { Button } from "@/Components/ui/button";
import { Checkbox } from "@/Components/ui/checkbox";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { Separator } from "@/Components/ui/separator";
import AuthenticationLayout from "@/Layouts/AuthenticationLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { IconLock, IconMail } from "@tabler/icons-react";
import { useEffect } from "react";

export default function Login({ status, isAdminLogin, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: "",
        password: "",
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
            {status && (
                <div className="mb-4 font-medium text-sm text-primary">
                    {status}
                </div>
            )}

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

                {!isAdminLogin ? (
                    <>
                        <div className="text-sm text-muted-foreground">
                            {"Don't have an account? "}
                            <Link
                                href="#"
                                className="hover:underline text-primary"
                            >
                                Register here
                            </Link>
                        </div>

                        <div className="py-2.5">
                            <div className="relative">
                                <Separator />
                                <span className="px-2 py-0 block absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-background text-sm font-bold text-muted-foreground/50">
                                    OR
                                </span>
                            </div>
                        </div>

                        <div className="flex flex-col space-y-2">
                            <Button
                                variant="outline"
                                className="w-full space-x-2"
                            >
                                <GoogleBrandIcon />
                                <span>Continue with Gmail</span>
                            </Button>

                            <Button
                                variant="outline"
                                className="w-full space-x-2"
                            >
                                <AppleBrandIcon />
                                <span>Continue with Apple</span>
                            </Button>
                        </div>
                    </>
                ) : null}
            </form>
        </AuthenticationLayout>
    );
}
