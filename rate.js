const conversion_rates = [
    { from: "USD", to: "AZN", rate: 0.78 },
    { from: "USD", to: "EUR", rate: 0.82 },
    { from: "EUR", to: "CZK", rate: 26.8 },
    { from: "CZK", to: "JPY", rate: 36 }
];

const conversion_map = new Object();


conversion_rates.forEach(({ from, to, rate }) => {
    if (!conversion_map[from]) conversion_map[from] = new Object();
    conversion_map[from][to] = rate;
});


function convert(from, to, amount) {
    const fromObj = conversion_map[from];
    if (fromObj.hasOwnProperty(to)) return fromObj[to] * amount;

    const secondObj = Object.keys(fromObj).find(i => conversion_map[i] && conversion_map[i].hasOwnProperty(to));

    if (secondObj) {
        const result = amount * conversion_map[from][secondObj] * conversion_map[secondObj][to];
        return result;
    }

    return "No rate found";

}

console.log(convert("USD", "JPY", 1));