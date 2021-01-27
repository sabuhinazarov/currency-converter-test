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
    const firstObj = conversion_map[from];
    if (firstObj && firstObj.hasOwnProperty(to)) return firstObj[to] * amount;

    const finalObj = findRelation(firstObj, to);
    if (finalObj) return amount * finalObj;
    return "No rate found";
}


function findRelation(obj, to, value = 1) {
    let localValue = value;
    for(let key in obj) {
        if(key === to)  return obj[key] * localValue;

        for(let subKey in conversion_map[key]) {

            if(subKey === to) {
                return conversion_map[key][subKey] * localValue *  obj[key];
            } else localValue *=  conversion_map[key][subKey] *  obj[key];
            
            return findRelation(conversion_map[subKey], to, localValue);
        }
    }
}

console.log(convert("XXX", "AZN", 1));