fs = require('fs');
const readFile = (fileName, callback) => {
    return fs.readFile(fileName, 'utf8', callback);
};

exports.readFile = readFile;