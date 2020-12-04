fa = require('../tools/file-access');

const fileName = 'day4/passports.txt';

const passports = (error, data) => {
    const dataRows = data.split('\n\n');

    // Fixing problem with last \n in last passport
    dataRows[dataRows.length - 1] = dataRows[dataRows.length - 1].substring(0, dataRows[dataRows.length - 1].length - 1);

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
    const filtered = json.filter(passport => new Filter(passport).filter()
    );

    console.log("answer: " + filtered.length);
};

class Filter {

    constructor (passeport) {
        this.passport = passeport
    }

    filter () {
        return this.birthYear()
            && this.issueYear()
            && this.expirationYear()
            && this.height()
            && this.hairColor()
            && this.eyeColor()
            && this.passportID()
            && this.countryID()
            ;
    }

    birthYear () {
        const byr = this.passport["byr"];

        return byr !== undefined && byr >= 1920 && byr <= 2002;
    }

    issueYear () {
        const iyr = this.passport["iyr"]

        return iyr !== undefined && iyr >= 2010 && iyr <= 2020;
    }

    expirationYear () {
        const eyr = this.passport["eyr"]

        return eyr !== undefined && eyr >= 2020 && eyr <= 2030;
    }

    height () {
        const hgt = this.passport["hgt"];

        if (hgt === undefined) {
            return false;
        }
        const results = hgt.match(/(\d+)(cm|in)/i);
        if (results === null) {
            return false;
        }
        const size = results[1];
        const unit = results[2];

        if (unit === 'cm') {
            return size >= 150 && size <= 193;
        } else {
            return size >= 59 && size <= 76;
        }
    }

    hairColor () {
        const hcl = this.passport['hcl'];
        let regex = new RegExp('^#([a-f0-9]{6})$');

        return hcl !== undefined && regex.test(hcl);
    }

    eyeColor () {
        const ecl = this.passport['ecl'];
        let regex = new RegExp('^(amb|blu|brn|gry|grn|hzl|oth)$');

        return ecl !== undefined && regex.test(ecl);
    }

    passportID () {
        const pid = this.passport['pid'];
        let regex = new RegExp('^[0-9]{9}$');

        return pid !== undefined && regex.test(pid);
    }

    countryID () {
        // ignored
        return true;
    }
}

fa.readFile(fileName, passports);
