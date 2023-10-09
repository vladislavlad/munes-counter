export class Currency {
    static RUB = new Currency('Russian Ruble', '₽', 'RUB');
    static USD = new Currency('US Dollar', '$', 'USD');
    static EUR = new Currency('Euro', '€', 'EUR');

    constructor(name, symbol, code) {
        this.name = name;
        this.symbol = symbol;
        this.code = code;
    }

    toString() {
        return `Currency.${this.code}`;
    }
}
