const path = require('path');
const { rm ,copyFile, mkdir, readdir } = require('fs/promises');

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

  const dataArr = await readdir(folder, { withFileTypes: true });
  for (const data of dataArr) {
    if (data.isFile()) {
      copyFile(path.join(folder, data.name), path.join(copyFolder, data.name));
    }
    else if (data.isDirectory()) {
      copyDir(data.name, folder, copyFolder);
    }
  }
};

copyDir('files');
