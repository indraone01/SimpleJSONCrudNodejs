const fs = require('fs');
var lineReader = require('readline').createInterface({
    input: fs.createReadStream('./json/contact.json')
});
lineReader.on('line', function(line) {
    line = line.trim();
    if (line.charAt(line.length - 1) === ',') {
        line = line.substr(0, line.length - 1);
    }
    if (line.charAt(0) === '{') {
        processRecord(JSON.parse(line));
    }
});

function processRecord(record) {
    // Process the records one at a time here!
    console.log(record);
}

////////////////////////////////////////////////////////////////////////////////////////
var stream = fs.createReadStream('./json/simplecontact.csv', { flags: 'r', encoding: 'utf-8' });
var buf = '';
stream.on('data', function(d) {
    buf += d.toString(); // when data is read, stash it in a string buffer
    pump(); // then process the buffer
});

function pump() {
    var pos;
    while ((pos = buf.indexOf('\n')) >= 0) { // keep going while there's a newline somewhere in the buffer
        if (pos == 0) { // if there's more than one newline in a row, the buffer will now start with a newline
            buf = buf.slice(1); // discard it
            continue; // so that the next iteration will start with data
        }
        processLine(buf.slice(0, pos)); // hand off the line
        buf = buf.slice(pos + 1); // and slice the processed data off the buffer
    }
}

function processLine(line) { // here's where we do something with a line
    if (line[line.length - 1] == '\r') line = line.substr(0, line.length - 1); // discard  CR(0x0D)
    if (line.length > 0) { // ignore empty lines
        // var obj = JSON.parse(line); // parse the JSON
        var obj = line;
        console.log(obj); // do something with the data here!
    }
}