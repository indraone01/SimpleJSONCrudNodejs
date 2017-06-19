const fs = require('fs');
const readline = require('./readContact.js');

module.exports = (sourcePath, sourceDest) => {
    var newcontact = new Array();
    var writePath = sourceDest;
    writePath = './json/test.json'; // for test purpose only
    var buffer = '';
    var stream = fs.createReadStream(sourcePath, { flags: 'r', encoding: 'utf-8' });
    stream.on('data', (chunk) => {
        // when the chunk of data is read, put it to the buffer
        buffer += chunk.toString() + '\n';
        //console.log(buffer);
        readBuff();
    });

    function readBuff() {
        var linelength;
        // loop until the buff no has the line
        //console.log(buffer.indexOf('\n'));
        while ((linelength = buffer.indexOf('\n')) >= 0) {
            //console.log(linelength);
            // if the line of buffer no have any length of string, discard it
            if (linelength == 0) {
                buffer = buffer.slice(1);
                continue;
            }

            //check if the buff has one or more line, 
            //if have than one line just grab the first line to processing and left the other
            // and do it again with the same condition for the new line.
            //console.log(buffer.slice(0, linelength));
            lineProcessing(buffer.slice(0, linelength));

            //renew buffer without line processed
            buffer = buffer.slice(linelength + 1);
            //console.log(buffer);
        }

        // get the old data of contact, comparing data between the new and old
        // update old data of contact when the id is same, and add new one if the id never exist
        var currcontact;
        readline(sourceDest, (rest) => {
            currcontact = rest;
            //console.log(newcontact);
            //console.log(currcontact);
            newcontact.forEach((obj, idx, arr) => {
                //console.log(obj.id);
                var newid = obj.id;
                var newname = obj.name;
                var newemail = obj.email;
                var isupdate = 0;
                currcontact.forEach((currobj, curridx, currarr) => {
                    //console.log(obj.id);
                    var currid = currobj.id;
                    if (newid === currid) {
                        currobj.name = newname;
                        currobj.email = newemail;
                        isupdate = 1;
                    }
                });
                //console.log(isupdate);
                if (isupdate == 0) {
                    currcontact[currcontact.length] = newcontact[idx];
                }
            });
            //console.log(newcontact);
            //console.log(JSON.stringify(currcontact));

            //write the new data contact into contact.json; re-write and append foreach row;
            fs.createWriteStream(writePath, { flags: 'w', encoding: 'utf-8' }).write("[\n");
            currcontact.forEach((currobj, curridx, currarr) => {
                //console.log(JSON.stringify(currobj));
                if (curridx == currcontact.length - 1) {
                    fs.createWriteStream(writePath, { flags: 'a+', encoding: 'utf-8' })
                        .write(JSON.stringify(currobj) + '\n');
                } else {
                    fs.createWriteStream(writePath, { flags: 'a+', encoding: 'utf-8' })
                        .write(JSON.stringify(currobj) + ',' + '\n');
                }
            });
            fs.createWriteStream(writePath, { flags: 'a', encoding: 'utf-8' }).write("]");
        });
    }

    function lineProcessing(strline) {
        // check to get line of string is not empty and row of record only
        if (strline != '' && strline != 'id,name,email') {
            //console.log(strline);
            var arrstr = strline.split(',');
            var obj = new Object;
            obj['id'] = arrstr[0];
            obj['name'] = arrstr[1];
            obj['email'] = arrstr[2];
            newcontact[newcontact.length] = obj;
        }
    }

}