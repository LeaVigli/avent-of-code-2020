fa = require('../tools/file-access');

const fileName = 'day4/passports.txt';

const passports = (error, data) => {
    const dataRows = data.split('\n\n');

    // Fixing problem with last \n in last passport
    dataRows[dataRows.length-1] = dataRows[dataRows.length-1].substring(0, dataRows[dataRows.length-1].length-1);

    // JSON parsing preparation
    const dataObjects = dataRows.map(object =>
        object
            .replace(/[ \n]+/g, ',') // all elements are separated by ','
            .replace(/(.[^\n]*)/gs, '{$1}') // all objects are between '{}'
            .replace(/(byr|iyr|eyr):([\d]+)/gm, '"$1":$2') // setting certain fields as numbers, not string, fields name are between ""
            .replace(/(\w+):([#\w]+)/gm, '"$1":"$2"') // setting fields and fields name as strings
    );
    // data is ready to parse, we only need to parse content in array
    const json = dataObjects.map(object => JSON.parse(object));

    // example
    console.log(json[0]);

    console.log("total passports: " + json.length);

    // Filtering non-conform passports
    const filtered = json.filter(passport =>
        passport["byr"] !== undefined
        && passport["iyr"] !== undefined
        && passport["eyr"] !== undefined
        && passport["hgt"] !== undefined
        && passport["hcl"] !== undefined
        && passport["ecl"] !== undefined
        && passport["pid"] !== undefined
    );

    console.log("answer: "+ filtered.length);
};

fa.readFile(fileName, passports);
