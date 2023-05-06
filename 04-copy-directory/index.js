const path = require('path');
const fs = require('fs');
const { rm ,copyFile, mkdir } = require('fs/promises');

const copyDir = async(src, input = __dirname, output = __dirname) => {
  const folder = path.join(input, `${src}`);
  const copyFolder = path.join(output, input === __dirname ? `${src}-copy` : `${src}`);
  try {
    await rm(copyFolder, { recursive: true });
    console.log(`Папка ${src} реинициализирована`);
  }
  catch (err) {
    console.log(`Папка ${src} создана`);
  }
  finally {
    await mkdir(copyFolder, { recursive: true });
  }

  fs.readdir(folder, (err, arr) => {
    if (err) throw err;
    else {
      arr.forEach((data) => {
        fs.stat(path.join(folder, data), (err, stats) => {
          if (err) throw err;
          else if (stats.isFile()) {
            copyFile(path.join(folder, data), path.join(copyFolder, data));
          }
          else if(stats.isDirectory()) {
            copyDir(data, folder, copyFolder);
          }
        });
      });
    }
  });
};

copyDir('files');
