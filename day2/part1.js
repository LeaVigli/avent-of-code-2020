fa = require('../tools/file-access');

const fileName = 'day2/passwords.txt';

const password = (error, data) => {
    if (error) {
        return console.log(error);
    }

    let dataList = data.split("\n");
    let counter = 0;

    // pattern
    // 1-5 x: jsdhksjhx
    // regex
    // ^[0-9]+-[0-9]+ [a-z]: [a-z]+$
    dataList.forEach(item => {
        let match = item.match(/^([0-9]+)-([0-9]+) ([a-zA-Z]): ([a-zA-Z]+)$/);
        if (match !== null) {
            // match[0] returns the matching string
            const min = Number(match[1]);
            const max = Number(match[2]);
            const char = match[3];
            const pwd = match[4];

            if (max < min || pwd.length <= 0) {
                return;
            }

            const regex = new RegExp(char, 'g');
            const matches = pwd.match(regex);
            if (matches && matches.length >= min && matches.length <= max) {
                counter++;
            }
        }
    });

    console.log(counter);
};

fa.readFile(fileName, password);
