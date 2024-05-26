import { Currency } from "@/utils/currency";
import { Input } from "./ui/input";

export default function PriceInputField({
    value = "",
    onChange,
    onBlur,
    currencyCode = "USD",
    readOnly = false,
    ...props
}) {
    const currency = new Currency(currencyCode);

    return (
        <>
            <div className="relative">
                <span className="absolute top-1/2 left-3 -translate-y-1/2 text-muted-foreground font-medium">
                    {currency.getCurrencySymbol()}
                </span>
                <Input
                    readOnly={readOnly}
                    value={value}
                    onChange={onChange}
                    onBlur={() =>
                        onBlur?.(
                            value && !isNaN(Number(value))
                                ? currency.getFormattedAmountWithoutSymbol(
                                      Number(value)
                                  )
                                : ""
                        )
                    }
                    type="text"
                    placeholder={currency.getFormattedAmountWithoutSymbol(0)}
                    className="pl-8"
                    {...props}
                />
            </div>
        </>
    );
}
