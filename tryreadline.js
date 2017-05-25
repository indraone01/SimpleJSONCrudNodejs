const readline = require('./utils/readContact.js');


readline('./json/contact.json', (result) => {
    console.log(result);
});