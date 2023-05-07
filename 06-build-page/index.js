const path = require('path');
const { rm ,copyFile, mkdir, readdir } = require('fs/promises');

const dist = path.join(__dirname, 'project-dist');

try {
  rm(dist, { recursive: true });
}
catch (err) {
}
finally {
  mkdir(dist, { recursive: true });
}

copyDir = async(src, input = dist, output = dist) => {
  const folder = path.join(input, src);
  const copyFolder = path.join(output, src);
  try {
    await rm(copyFolder, { recursive: true });
  }
  catch (err) {
    console.log(err);
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

copyDir('assets');
