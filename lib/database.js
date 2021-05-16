const Sequelize = require('sequelize');
const fs = require('fs');
const path = require('path');

const generate = require('./generate');

async function readAllTables(){
    console.log('\x1b[36m%s\x1b[0m',"Reading all tables...");

    const sequelize_config_file = path.join(process.cwd(), "config", "config.json");
    fs.readFile(sequelize_config_file, 'utf8', function (err, data) {
        if (err) throw err;
        obj = JSON.parse(data);
        console.log(obj);
    });


    

    // const sequelize = new Sequelize('nodejs_ecommerce', 'root', '', {
    //     host: 'localhost',
    //     dialect: 'mysql',
      
    //     pool: {
    //       max: 5,
    //       min: 0,
    //       acquire: 30000,
    //       idle: 10000
    //     },
      
    //     // SQLite only
    //     storage: 'path/to/database.sqlite',
      
    //     // http://docs.sequelizejs.com/manual/tutorial/querying.html#operators
    //     operatorsAliases: false
    //   });
      
    //   sequelize.query("SELECT * from users").then(results => {
    //     console.log(results);
    // });
  

    //await generate.generateSeederCode();
}

async function readTable(){
    console.log('\x1b[36m%s\x1b[0m',"Reading table(s)...");
    //await generate.generateSeederCode();
}

module.exports = {
    readAllTables: readAllTables,
    readTable: readTable
}