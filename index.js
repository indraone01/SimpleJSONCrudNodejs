const app = require('express')();
const fs = require('fs');
const readjson = require('./utils/readContact.js');
const favicon = require('serve-favicon');
const path = require('path');
var tablinks = require('./scripts/tablinks');
var contact;
readjson('./json/contact.json', (result) => {
    contact = result;
});

app.use(favicon(path.join(__dirname, 'images', 'favicon.ico')));

app.get('/', (request, response) => {
    response.writeHead(200, { 'Content-Type': 'text/html' });
    response.write('<meta charset="UTF-8">');
    response.write('<title>MY CONTACT LIST</title>');
    response.write('<link rel="stylesheet" type="text/css" href="css/form.css">');
    response.write('<script type="text/javascript" src="scripts/form.js"></script>');
    response.write('<div class="menutab"></div>');
    tablinks.forEach(function(element) {
        switch (element.name) {
            case 'ContactEntry':
                response.write('<div class="menutabcontent" style="display: block;">');
                response.write(fs.readFileSync('./contactentry.html'));
                response.write('</div>');
                break;
            case 'ContactList':
                response.write('<div class="menutabcontent" style="display: none;">');
                response.write(fs.readFileSync('./contactlist.html'));
                response.write('</div>');
                break;
            case 'SendEmail':
                response.write('<div class="menutabcontent" style="display: none;">');
                response.write(fs.readFileSync('./sendemail.html'));
                response.write('</div>');
                break;
            default:
                break;
        }

    }, this);
    response.send();
});

app.get('/images/toolbar_find.png', (req, res) => {
    fs.readFile(path.join(__dirname, req.url), (err, file) => {
        res.writeHead(200, { 'Content-Type': 'image/png' });
        (err) ? console.log(err): res.end(file);
    });
});

app.get('/css/form.css', (req, res) => {
    fs.readFile(path.join(__dirname, req.url), (err, file) => {
        res.writeHead(200, { 'Content-Type': 'text/css' });
        (err) ? console.log(err): res.end(file);
    });
});

app.get('/scripts/form.js', (req, res) => {
    fs.readFile(path.join(__dirname, req.url), (err, file) => {
        res.writeHead(200, { 'Content-Type': 'text/javascript' });
        res.write('var tablinks=' + JSON.stringify(tablinks) + ';\n');
        res.write('var contactjson=' + JSON.stringify(contact) + ';\n');
        res.write('var contactlistjson=' + JSON.stringify(contact) + ';\n');
        (err) ? console.log(err): res.end(file);
    });
});

app.listen(8000, () => {
    console.log('App is Run in on port:8000 ');
});