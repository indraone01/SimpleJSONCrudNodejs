const fs = require('fs');

module.exports = (sourcePath, callback) => {
    var record = new Array();
    // made read the stream of json per line
    var readLine = require('readline').createInterface({
        input: fs.createReadStream(sourcePath, { flags: 'r', encoding: 'utf-8' }),
        terminal: false
    });

    readLine.on('line', (line) => {
        //remove all space before and after the line
        line = line.trim();
        // check if the end of line is comma, then grab the string {"text":"value"}
        if (line.charAt(line.length - 1) === ',') {
            line = line.substr(0, line.length - 1);
        }
        //after that, used the line to put it on parse process
        if (line.charAt(0) === '{') {
            // some function to process the parsing
            parseProcessing(line);
        }
    }).on('close', () => {
        callback(record);
    });

    function parseProcessing(line) {
        try {
            record[record.length] = JSON.parse(line);
            //console.log(record);
        } catch (e) {
            console.log(e);
        }
    }
}