const path = require('path');
const { createWriteStream, createReadStream } = require('fs');
const { readdir } = require('fs/promises');

const dist = createWriteStream(path.join(__dirname, 'project-dist', 'bundle.css'));

const createStyles = async (src) => {
  const dataArr = await readdir(path.join(__dirname, src), { withFileTypes: true });

  for (const data of dataArr) {
    if (data.isFile() && path.extname(data.name).slice(1) === 'css') {
      createReadStream(path.join(__dirname, src, data.name)).pipe(dist);
    }
  }
};

createStyles('styles');
