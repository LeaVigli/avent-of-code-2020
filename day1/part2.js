fs = require('fs');
const goal = 2020;

fs.readFile('day1/expense-report.txt', 'utf8', function (err, data) {
    if (err) {
        return console.log(err);
    }

    let dataList = data.split("\n");

    dataList = dataList.map(item => Number(item));

    dataList.sort((a, b) => a - b);

    console.log(dataList);

    dataList.some((item, index) => {
        if (item !== 0) {
            const subList = dataList.slice(index + 1);
            return subList.some((subItem) => {
                const nSubItem = Number(subItem);
                if (nSubItem) {
                    let sumToGoal = goal - item - nSubItem;
                    const result = subList.findIndex(element => Number(element) === sumToGoal);
                    if (result > -1) {
                        console.log(item + " + " + subItem + " + " + sumToGoal + " = " + goal);
                        console.log("answer: " + item * nSubItem * sumToGoal);
                        return true;
                    }
                }
            });
        }


    });
});