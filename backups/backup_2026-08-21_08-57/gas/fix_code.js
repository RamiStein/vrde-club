const fs = require('fs');
let code = fs.readFileSync('gas/Code.gs', 'utf8');

code = code.replace("return HtmlService.createHtmlOutputFromFile('index')", "return HtmlService.createTemplateFromFile('index').evaluate()");

fs.writeFileSync('gas/Code.gs', code, 'utf8');
console.log('Fixed Code.gs');
