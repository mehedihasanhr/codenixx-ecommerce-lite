import { FormGroup } from "@/Components/FormGroup";
import { InputError } from "@/Components/InputError";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import AuthenticationLayout from "@/Layouts/AuthenticationLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { IconLock, IconMail } from "@tabler/icons-react";
import { useEffect } from "react";

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
    });

    useEffect(() => {
        return () => {
            reset("password", "password_confirmation");
        };
    }, []);

    // handle change
    const onChange = (e) => {
        e.preventDefault();
        setData((previousData) => ({
            ...previousData,
            [e.target.name]: e.target.value,
        }));
    };

    const submit = (e) => {
        e.preventDefault();

        post(route("register"));
    };

    return (
        <AuthenticationLayout>
            <Head title="Register" />

            <h1 className="text-center mb-8">Create your account</h1>

            <form className="flex flex-col space-y-3.5" onSubmit={submit}>
                <FormGroup>
                    <Label> Name </Label>
                    <div className="relative">
                        <Input
                            name="name"
                            type="text"
                            placeholder="Ex: Jhon Doe"
                            value={data.name}
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
                    <Label> Confirm Password </Label>
                    <div className="relative">
                        <Input
                            name="password_confirmation"
                            type="password"
                            placeholder="*******"
                            value={data.password_confirmation}
                            onChange={onChange}
                        />
                        <IconLock
                            size={20}
                            stroke={1.5}
                            opacity={0.5}
                            className="absolute right-2 top-1/2 -translate-y-1/2"
                        />
                    </div>
                    <InputError message={errors.password_confirmation} />
                </FormGroup>

                <Button disabled={processing}>
                    {!processing ? "Sign up" : "Processing..."}
                </Button>

                <div className="text-sm text-muted-foreground">
                    {"Have an account? "}
                    <Link href="#" className="hover:underline text-primary">
                        Login here
                    </Link>
                </div>
            </form>
        </AuthenticationLayout>
    );

    // return (
    //     <GuestLayout>
    //         <Head title="Register" />

    //         <form onSubmit={submit}>
    //             <div>
    //                 <InputLabel htmlFor="name" value="Name" />

    //                 <TextInput
    //                     id="name"
    //                     name="name"
    //                     value={data.name}
    //                     className="mt-1 block w-full"
    //                     autoComplete="name"
    //                     isFocused={true}
    //                     onChange={(e) => setData('name', e.target.value)}
    //                     required
    //                 />

    //                 <InputError message={errors.name} className="mt-2" />
    //             </div>

    //             <div className="mt-4">
    //                 <InputLabel htmlFor="email" value="Email" />

    //                 <TextInput
    //                     id="email"
    //                     type="email"
    //                     name="email"
    //                     value={data.email}
    //                     className="mt-1 block w-full"
    //                     autoComplete="username"
    //                     onChange={(e) => setData('email', e.target.value)}
    //                     required
    //                 />

    //                 <InputError message={errors.email} className="mt-2" />
    //             </div>

    //             <div className="mt-4">
    //                 <InputLabel htmlFor="password" value="Password" />

    //                 <TextInput
    //                     id="password"
    //                     type="password"
    //                     name="password"
    //                     value={data.password}
    //                     className="mt-1 block w-full"
    //                     autoComplete="new-password"
    //                     onChange={(e) => setData('password', e.target.value)}
    //                     required
    //                 />

    //                 <InputError message={errors.password} className="mt-2" />
    //             </div>

    //             <div className="mt-4">
    //                 <InputLabel htmlFor="password_confirmation" value="Confirm Password" />

    //                 <TextInput
    //                     id="password_confirmation"
    //                     type="password"
    //                     name="password_confirmation"
    //                     value={data.password_confirmation}
    //                     className="mt-1 block w-full"
    //                     autoComplete="new-password"
    //                     onChange={(e) => setData('password_confirmation', e.target.value)}
    //                     required
    //                 />

    //                 <InputError message={errors.password_confirmation} className="mt-2" />
    //             </div>

    //             <div className="flex items-center justify-end mt-4">
    //                 <Link
    //                     href={route('login')}
    //                     className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
    //                 >
    //                     Already registered?
    //                 </Link>

    //                 <PrimaryButton className="ms-4" disabled={processing}>
    //                     Register
    //                 </PrimaryButton>
    //             </div>
    //         </form>
    //     </GuestLayout>
    // );
}
