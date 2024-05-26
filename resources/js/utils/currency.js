export class Currency {
    currencyCode = "USD";

    constructor(currencyCode) {
        this.currencyCode = currencyCode;
    }

    formatter = (amount) => {
        const f = new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: this.currencyCode,
            currencySign: "accounting",
            currencyDisplay: "narrowSymbol",
            minimumFractionDigits: 2,
        });

        const parts = f.formatToParts(amount);
        const currencySymbol =
            parts.find((part) => part.type === "currency")?.value ??
            this.currencyCode;

        const formattedAmount = f.format(amount);
        const amountText = formattedAmount
            .substring(currencySymbol.length)
            .trim();

        return {
            currencyCode: this.currencyCode,
            currencySymbol,
            formattedAmount,
            amountText,
        };
    };

    // format
    format(amount) {
        const { currencySymbol, amountText } = this.formatter(amount);
        return `${currencySymbol} ${amountText}`;
    }

    getCurrencySymbol() {
        const { currencySymbol } = this.formatter(0);
        return currencySymbol;
    }

    getFormattedAmountWithoutSymbol(amount) {
        const { amountText } = this.formatter(amount);
        return amountText;
    }
}
