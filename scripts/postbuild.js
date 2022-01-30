const fs = require('node:fs');
const path = require('node:path');
const colors = require('picocolors');

const copyFile = async (srcFilePath, destFilePath) => {
  const fileName = path.basename(srcFilePath);
  try {
    const srcPath = path.resolve(process.cwd(), srcFilePath);
    const destPath = path.resolve(process.cwd(), 'dist/angular-paginator', destFilePath);
    await fs.promises.copyFile(srcPath, destPath);
    console.log(colors.green(`- File Copied: ${fileName}`));
  } catch (err) {
    console.log(colors.red(`Error while copying ${fileName}`), err);
  }
};

copyFile('README.md', 'README.md');
copyFile('CHANGELOG.md', 'CHANGELOG.md');
copyFile('LICENSE', 'LICENSE');
