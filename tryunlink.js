/*I tested this on my server and it worked.
It was from a GET call but I don 't see why it wouldn't work with a POST.*/
res.setHeader('Content-disposition', 'attachment; filename=theDocument.txt');
res.setHeader('Content-type', 'text/plain');
res.charset = 'UTF-8';
res.write("Hello, world");
res.end();

/*
fs.unlink takes a single file, so unlink each element:
*/

const fs = require('fs');
var list_of_files = ["/images/a1.jpg", "/images/a2.jpg", "/images/a3.jpg"]
list_of_files.forEach(function(filename) {
    fs.unlink(filename);
});

//or

(function next(err, result) {
    if (err) return console.error("error in next()", err);
    if (list_of_files.length === 0) return;
    var filename = list_of_files.splice(0, 1)[0];
    fs.unlink(filename, next);
}());