const fs = require("fs-extra")
const ejs = require("ejs");
const path = require('path');

async function generateSeederCode(){
    const filename = path.join(__dirname, "./templates/seeder.ejs");

    const options = {};

    const tablename = 'products';
    const modal_name = tablename.replace(/^(\w)(.+)/, (match, p1, p2) => p1.toUpperCase() + p2.toLowerCase())
    const currentdate = (new Date()).toISOString().replace(/\D/g, "");

    ejs.renderFile(filename, {table_name: modal_name, leftovers: 'fffff'}, options, function(err, str) {
        
        if (err) {
          console.error(err)
        }
  
        const outputFile = path.join(process.cwd(),'./seeders/'+currentdate+'-'+tablename+'-seeder.js');
        fs.ensureFileSync(outputFile)
        fs.outputFileSync(outputFile, str)
      });
}

module.exports = {
    generateSeederCode: generateSeederCode
  };