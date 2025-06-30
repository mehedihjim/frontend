const fs = require('fs-extra');
const path = require('path');

async function copyFiles() {
  const buildDir = path.join(__dirname, '.next/standalone');
  const publicDir = path.join(__dirname, 'public');
  const staticDir = path.join(__dirname, '.next/static');

  // Copy public directory
  await fs.copy(publicDir, path.join(buildDir, 'public'));
 

  // Copy static directory if it exists
  if (fs.existsSync(staticDir)) {
    await fs.copy(staticDir, path.join(buildDir, '.next/static'));
   
  } else {
      }
}

copyFiles().catch(err => {

});
