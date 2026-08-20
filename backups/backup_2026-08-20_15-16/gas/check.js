const fs = require('fs');
const html = fs.readFileSync('gas/index.html', 'utf8');
const index = html.indexOf('`');
if (index > -1) {
  console.log('Found backtick at index ' + index);
  console.log('Context:', html.slice(index - 50, index + 50));
} else {
  console.log('NO BACKTICKS');
}
