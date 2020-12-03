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

    dataList.some((item) => {
        if (item !== 0) {
            let sumToGoal = goal - item;
            const result = dataList.findIndex(element => Number(element) === sumToGoal);
            if (result > -1) {
                console.log(item + " + " + sumToGoal + " = " + goal);
                console.log("answer: " + item * sumToGoal);
                return true;
            }
        }
    });
});