const conversion_rates = [
    { from: "USD", to: "AZN", rate: 1.70 },
    { from: "USD", to: "EUR", rate: 0.8255 },
    { from: "EUR", to: "CZK", rate: 26.025 },
    { from: "CZK", to: "JPY", rate: 4.838 },
    { from: "JPY", to: "TL", rate: 0.071 },

];

const conversion_map = new Object();


conversion_rates.forEach(({ from, to, rate }) => {
    if (!conversion_map[from]) conversion_map[from] = new Object();
    conversion_map[from][to] = rate;
});


function convert(from, to, amount) {
    console.log("WHAT IS OUR TO", to)
    const fromObj = conversion_map[from];
    if (fromObj.hasOwnProperty(to)) return fromObj[to] * amount;

    const finalObj = findRelation(fromObj, to);

    console.log("secondObj qaaardasim", finalObj);

    if (finalObj) {
        const result = amount * finalObj;
        return result;
    }
    return "No rate found";
}


function findRelation(obj, to, value = 1) {
    // const result = Object.keys(fromObj).find(i => conversion_map[i] && conversion_map[i].hasOwnProperty(to));
    let localValue = value;
    for(let key in obj) {
        console.log("KEY", key, "TO", to);
        if(key === to) {
            return obj[key] * localValue
        }
        for(let subKey in conversion_map[key]) {
            console.log("SUBKEY", subKey, "TO", to);
            if(subKey === to) {
                return conversion_map[key][subKey] * localValue *  obj[key];
            } else localValue *=  conversion_map[key][subKey] *  obj[key];
            return findRelation(conversion_map[subKey], to, localValue);
        }
    }
}

console.log(convert("USD", "TL", 1));