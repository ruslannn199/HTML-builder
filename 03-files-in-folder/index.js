const path = require('path');
const fs = require('fs');
const { stdout } = process;

const secretFolder = path.join(__dirname, 'secret-folder');
fs.readdir(secretFolder, (err, folder) => {
  if (err) throw err;
  folder.forEach((data) => {
    fs.stat(path.join(secretFolder, data), (err, stats) => {
      if (err) throw err;
      else if (stats.isFile()) {
        const file = path.basename(data).slice(0, path.basename(data).lastIndexOf('.'));
        const ext = path.extname(data).slice(1);
        const size = parseFloat((stats.size / 1024)).toFixed(3);
        stdout.write(`${file} - ${ext} - ${size} KB\n`);
      }
    });
  });
});