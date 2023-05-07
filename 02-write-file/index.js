const path = require('path');
const fs = require('fs');
const { stdin, stdout, exit } = process;

const output = fs.createWriteStream(path.join(__dirname, 'dest.txt'), 'utf-8');
stdout.write('Введите текст:\n');
stdin.on('data', data => {
  if (data.toString().slice(0, -2) === 'exit'){
    process.exit();
  }
  output.write(data);
});

process.on('exit', () => {
  stdout.write('Всего доброго!\n');
});

process.on('SIGINT', exit);