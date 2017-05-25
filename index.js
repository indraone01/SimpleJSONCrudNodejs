const express = require('express');
const app = express();
const fs = require('fs');
/*const contact = [
    { 'id': '1', 'name': 'Andri', 'email': 'andri@testmail.com' },
    { 'id': '2', 'name': 'Indrawan', 'email': 'indrawan@testmail.com' }
];*/
const readjson = require('./utils/readContact.js');
var contact;
readjson('./json/contact.json', (result) => {
    //console.log(result);
    contact = result;
    //console.log(contact);
});

var css = '<style>#contact {font-family: "Trebuchet MS", Arial, Helvetica, sans-serif;border-collapse: collapse;width: 100%;}';
css = css + '#table td,#contact th {border: 1px solid #ddd;padding: 8px;}';
css = css + '#table tr:nth-child(even) {background-color: #f2f2f2;}';
css = css + '#table tr:hover {background-color: #ddd;}';
css = css + '#table th {padding-top: 12px;padding-bottom: 12px;text-align: left;background-color: #4e8af5;color: white;}</style>';
var output = '';

app.get('/images/toolbar_find.png', (req, res) => {
    fs.readFile('./images/toolbar_find.png', (err, file) => {
        res.writeHead(200, { 'Content-Type': 'image/png' });
        (err) ? console.log(err): res.end(file);
    });
});

app.get('/css/form.css', (req, res) => {
    fs.readFile('./css/form.css', (err, file) => {
        res.writeHead(200, { 'Content-Type': 'text/css' });
        (err) ? console.log(err): res.end(file);
    });
});

app.get('/', (req, res) => {
    //res.send('Hello World!');
    //res.sendFile('./index.html');
    fs.readFile('./index.html', (err, file) => {
        (err) ? console.log(err): res.end(file);
    });
});

app.get('/contact', (req, res) => {
    //res.send(contact);
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write(css);
    output = '';
    contact.forEach((obj, idx, arr) => {
        //res.write(`No.${idx+1} `);
        output = output + `<tr><td>${obj.id}</td><td>${obj.name}</td><td>${obj.email}</td></tr>`;
        //res.write('<br/>');
    }, this);
    (output == '') ? output = '<tr><td colspan="3" style="text-align:center">No Data Found</td></tr>':
        output = '<tr><th>ID</th><th>Name</th><th>Email</th></tr>' + output;
    var table = '<table id="contact">';
    table = table + output + '</table>';
    res.write(table);
    res.send();
});

app.get('/contact/:id', (req, res) => {
    //res.send(req.params.id);
    //res.send(arr[idx]);
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write(css);
    output = '';
    contact.forEach((obj, idx, arr) => {
        for (var key in obj) {
            if (key == 'id' && obj[key] == req.params.id) {
                //output = obj.name;
                //output = `${key} = ${obj[key]}: name = ${obj.name}: email = ${obj.email} `;
                output = output + `<tr><td>${obj[key]}</td><td>${obj.name}</td><td>${obj.email}</td></tr>`;
            }
        }
    }, this);
    (output == '') ? output = '<tr><td colspan="3" style="text-align:center">No Data Found</td></tr>':
        output = '<tr><th>ID</th><th>Name</th><th>Email</th></tr>' + output;
    var table = '<table id="contact">';
    table = table + output + '</table>';
    res.write(table);
    res.send();
});

app.listen(8000, () => {
    console.log('App is Run on port:8000');
});