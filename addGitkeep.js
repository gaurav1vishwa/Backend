

const fs = require('fs');
const path = require('path');

const rootDir = __dirname; // or you can set the porject root directory manually here

function ensureGitkeepInEmptyFolders(dir) {
  const files = fs.readdirSync(dir);

  // if the folder is empty, create a .gitkeep file
  if (files.length === 0) {
    fs.writeFileSync(path.join(dir, '.gitkeep'), '');
  } else {
    // if the folder has content, check each subfolder
    files.forEach(file => {
      const fullPath = path.join(dir, file);
      if (fs.statSync(fullPath).isDirectory()) {
        ensureGitkeepInEmptyFolders(fullPath);
      }
    });
  }
}

// run this function at the root of your project
ensureGitkeepInEmptyFolders(rootDir);
