const config: CurrencyConfig.Config = {
  currency: {
    label: "IDR",
    decimalDigits: 2,
    decimalSeparator: ".",
    thousandsSeparator: ",",
    currencySymbol: "Rp.",
    currencySymbolNumberOfSpaces: 0,
    currencySymbolPosition: "left",
  },

  availableCurrencies: [
    {
      label: "IDR",
      decimalDigits: 2,
      decimalSeparator: ".",
      thousandsSeparator: ",",
      currencySymbol: "Rp.",
      currencySymbolNumberOfSpaces: 0,
      currencySymbolPosition: "left",
    },
    {
      label: "USD",
      decimalDigits: 2,
      decimalSeparator: ".",
      thousandsSeparator: ",",
      currencySymbol: "$",
      currencySymbolNumberOfSpaces: 1,
      currencySymbolPosition: "left",
    },
  ],
};

export default config;
