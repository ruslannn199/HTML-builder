const path = require('path');
const { stat, readdir } = require('fs/promises');

const readFiles = async() => {
  const secretFolder = path.join(__dirname, 'secret-folder');
  const secretFolderArr = await readdir(secretFolder, { withFileTypes: true });
  for (const data of secretFolderArr) {
    if (data.isFile()) {
      const file = path.basename(data.name).slice(0, path.basename(data.name).lastIndexOf('.'));
      const ext = path.extname(data.name).slice(1);
      const size = parseFloat((await stat(path.join(secretFolder, data.name))).size / 1024).toFixed(3);
      console.log(`${file} - ${ext} - ${size} KB`);
    }
  }
};

readFiles();
