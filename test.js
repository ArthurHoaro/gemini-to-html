const fs = require('fs')

const parse = require('./parse')

const text = fs.readFileSync('./example.gmi', 'utf8')

const parsed = parse(text)

console.log(parsed)

const render = require('./render')

parsed[0].className = 'lol lil';

const listIndex = parsed.findIndex(item => item.type === 'list');
if (listIndex !== -1) {
  parsed[listIndex].className = 'xss" attempt';
} else {
  console.error('Error: List index not found!');
}

const rendered = render(parsed)

console.log(rendered)
