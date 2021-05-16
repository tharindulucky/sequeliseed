const fs = require('fs');
const path = require('path');

async function createDir(){
    const dir = path.join(path.dirname(require.main.filename), "seeders");
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


async function generateSeedFiles(path){
    try {
        fs.writeFile(path+'/helloworld.js', 'console.log("Hello World!")', function (err) {
            if (err) return console.log(err);
            console.log('Hello World > helloworld.txt');
        });
    } catch (error) {

    }
}

module.exports = {
  createDir: createDir,
  generateSeedFiles: generateSeedFiles
};