const Sequelize = require('sequelize');
const fs = require('fs');
const path = require('path');
const util = require('util');

const generate = require('../generate');
const fsPromises = fs.promises;

async function readConfigs(){
    const sequelize_config_file = path.join(process.cwd(), "config", "config.json");
    const configs = await fsPromises.readFile(sequelize_config_file, 'utf8');
    return configs;
}

async function connect(){
    const configs = await readConfigs();
    
    obj = JSON.parse(configs);

    const DB = obj.development && obj.development.database ? obj.development.database : null;
    const USER = obj.development && obj.development.username ? obj.development.username : null;
    const PASSWORD = obj.development && obj.development.password ? obj.development.password : null;
    const HOST = obj.development && obj.development.host ? obj.development.host : null;

    console.log(DB,USER,PASSWORD,HOST);

    const sequelize = new Sequelize(DB, USER, PASSWORD, {
        host: HOST,
        dialect: 'mysql',
    
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        },
    
        // SQLite only
        storage: 'path/to/database.sqlite',
    
        // http://docs.sequelizejs.com/manual/tutorial/querying.html#operators
        operatorsAliases: 0
    });

    return sequelize;
    
}



module.exports = {
    connect: connect
}