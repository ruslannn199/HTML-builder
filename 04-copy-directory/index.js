const path = require('path');
const fs = require('fs');
const { rm ,copyFile, mkdir } = require('fs/promises');

const copyDir = async(src) => {
  try {
    const folder = path.join(__dirname, `${src}`);
    const copyFolder = path.join(__dirname, `${src}-copy`);
    try {
      await fs.promises.rm(copyFolder, { recursive: true });
      console.log(`Папка ${src}-copy реинициализирована`);
    }
    catch (err) {
      console.log(`Папка ${src}-copy создана`);
    }
    finally {
      await mkdir(copyFolder, { recursive: true });
    }
  
    fs.readdir(folder, (err, arr) => {
      if (err) throw err;
      else {
        arr.forEach(async(data) => {
          await copyFile(path.join(folder, data), path.join(copyFolder, data));
        })
      }
    });
  }
  catch (err) {
    throw err;
  }
}

copyDir('files');
