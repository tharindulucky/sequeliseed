const fs = require("fs-extra")
const ejs = require("ejs");
const path = require('path');

const helpers = require('./helpers');

async function generateSeederCode(table,rows){
    try{
      const filename = path.join(__dirname, "./templates/seeder.ejs");

    const options = {};
    const modal_name = table.replace(/^(\w)(.+)/, (match, p1, p2) => p1.toUpperCase() + p2.toLowerCase())
    const currentdate = (new Date()).toISOString().replace(/\D/g, "");

    ejs.renderFile(filename, {table_name: modal_name, rows: rows}, options, function(err, str) {
        
        if (err) {
          console.error(err)
        }
  
        const outputFile = path.join(process.cwd(),'./seeders/'+currentdate+'-'+table+'-seeder.js');
        fs.ensureFileSync(outputFile);
        fs.outputFileSync(outputFile, str);

        helpers.showLog('success', "Seeds Generated Successfully!");
      });
    }catch(err){
      throw err;
    }
}

module.exports = {
    generateSeederCode: generateSeederCode
};