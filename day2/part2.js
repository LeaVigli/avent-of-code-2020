fa = require('../tools/file-access');

const fileName = 'day2/passwords.txt';

const password = (error, data) => {
    if (error) {
        return console.log(error);
    }

    let dataList = data.split("\n");
    let counter = 0;

    dataList.forEach(item => {
        let match = item.match(/^([0-9]+)-([0-9]+) ([a-zA-Z]): ([a-zA-Z]+)$/);
        if (match !== null) {
            // match[0] returns the matching string
            const pos1 = Number(match[1]);
            const pos2 = Number(match[2]);
            const char = match[3];
            const pwd = match[4];

            if (pos2 < pos1 || pwd.length <= 0) {
                return;
            }

            const charPos1 = pwd.charAt(pos1 - 1);
            const charPos2 = pwd.charAt(pos2 - 1);

            // console.log(char + " " + charPos1 + " " + charPos2);

            if ((charPos1 === char && charPos2 !== char)
                || (charPos2 === char && charPos1 !== char)) {
                counter++;
            }
        }
    });

    console.log(counter);
};

fa.readFile(fileName, password);
