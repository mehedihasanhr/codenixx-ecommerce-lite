import { FormGroup } from "@/Components/FormGroup";
import { InputError } from "@/Components/InputError";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { useForm } from "@inertiajs/react";
import { useState } from "react";


export default function CurrencySetting({settings}) {
    const [isUpdateAble, setIsUpdatAble] = useState(false);

    const { data, setData, errors, processing } = useForm({
        currency_code: settings.currency_code,
        currency_format: settings.currency_format,
    });

    const showUpdateButton = (data) => {
        const updateAble = (data.currency_code !== settings.currency_code) || (data.currency_format!== settings.currency_format);
        setIsUpdatAble(updateAble)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
    }

    return (
        <form onSubmit={handleSubmit}>
            <h4 className="pt-3 mb-8 text-muted-foreground">Currency Settings</h4>
            <div className="grid grid-cols-12 gap-10">
                <FormGroup className="col-span-6">
                    <Label>Currency Code</Label>
                    <Input
                        type="text"
                        value={data.currency_code}
                        onChange={(e) => {
                            const _data = {
                                ...data,
                                currency_code: e.target.value
                            }
                            setData(_data);
                            showUpdateButton(_data);
                        }}
                    />
                    <InputError message={errors.currency_code} />
                </FormGroup>

                <FormGroup className="col-span-6">
                    <Label>Currency Format</Label>
                    <Input
                        type="text"
                        value={data.currency_format}
                        onChange={(e) => {
                            const _data = {
                                ...data,
                                currency_format: e.target.value
                            }
                            setData(_data);
                            showUpdateButton(_data);
                        }}
                    />
                    <InputError message={errors.currency_code} />
                </FormGroup>


            </div>
            {isUpdateAble ? <Button type="submit" disable={processing}> {processing ? 'processing...' : 'Update'} </Button> : null}
        </form>
    );
}
