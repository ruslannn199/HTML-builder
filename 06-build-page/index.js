const path = require('path');
const { rm ,copyFile, mkdir, readdir, readFile, writeFile } = require('fs/promises');
const { createWriteStream, createReadStream } = require('fs');

const dist = path.join(__dirname, 'project-dist');

const createProjectFolder = async() => {
  try {
    await rm(dist, { recursive: true });
  }
  catch (err) {
    console.log('Папка project-dist создана');
  }
  finally {
    await mkdir(dist, { recursive: true });
  }
};

const copyDir = async(src, input = __dirname, output = dist) => {
  const folder = path.join(input, src);
  const copyFolder = path.join(output, src);
  try {
    await rm(copyFolder, { recursive: true });
  }
  catch (err) {
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


const createStyles = async(src) => {
  const styles = createWriteStream(path.join(dist, 'style.css'));
  const dataArr = await readdir(path.join(__dirname, src), { withFileTypes: true });

  for (const data of dataArr) {
    if (data.isFile() && path.extname(data.name).slice(1) === 'css') {
      createReadStream(path.join(__dirname, src, data.name)).pipe(styles);
    }
  }
};

const createHTML = async(src) => {
  let templateHTML = await readFile(path.join(__dirname, 'template.html'), 'utf-8');
  const componentsArr = templateHTML.matchAll(/{{(.*?)}}/gi);

  for (const component of componentsArr) {
    const componentHTML = await readFile(path.join(__dirname, src, `${component[1]}.html`), 'utf-8');
    templateHTML = templateHTML.replace(component[0], componentHTML);
  }
  await writeFile(path.join(dist, 'index.html'), templateHTML, 'utf-8');
};

const createBundle = async() => {
  await createProjectFolder();
  await copyDir('assets');
  await createStyles('styles');
  await createHTML('components');
};

createBundle();
