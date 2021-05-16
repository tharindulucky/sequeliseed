const fs = require('fs');
const path = require('path');

async function createDir(){
    const dir = path.join(process.cwd(), "seeders");
    try {
        await fs.promises.mkdir(dir);
    } catch (error) {
        if (error.code === 'EEXIST') {
          // Something already exists, but is it a file or directory?
          const lstat = await fs.promises.lstat(dir);
          if (!lstat.isDirectory()) {
            throw error;
          }
        } else {
          throw error;
        }
    }
    return dir;
}


module.exports = {
  createDir: createDir
};