const Sequelize = require('sequelize');
const fs = require('fs');
const path = require('path');
const util = require('util');

const generate = require('../generate');
const helpers = require('../helpers');
const fsPromises = fs.promises;

async function readConfigs(){
    try{
        const sequelize_config_file = path.join(process.cwd(), "config", "config.json");
        const configs = await fsPromises.readFile(sequelize_config_file, 'utf8');
        return configs;
    }catch(err){
        helpers.showLog('error', "Cannot find Sequelize config.json");
    }
}

async function connect(options){
    try{
        const configs = await readConfigs();
        let env = 'development'
        if(options.env){
            env = options.env;
        }

        obj = JSON.parse(configs);

        if(!obj[env]){
            helpers.showLog('error', 'Enviroment not found in sequelize configs.');
            throw new Error();
        }

        const DB = obj[env] && obj[env].database ? obj[env].database : null;
        const USER = obj[env] && obj[env].username ? obj[env].username : null;
        const PASSWORD = obj[env] && obj[env].password ? obj[env].password : null;
        const HOST = obj[env] && obj[env].host ? obj[env].host : null;
        const DIALECT = obj[env] && obj[env].dialect ? obj[env].dialect : null;

        const sequelize = new Sequelize(DB, USER, PASSWORD, {
            host: HOST,
            dialect: DIALECT,
            logging: false,
        
            pool: {
                max: 5,
                min: 0,
                acquire: 30000,
                idle: 10000
            },
            dialectOptions: {
                dateStrings: true,
                typeCast: true
            },
        
            // SQLite only
            storage: 'path/to/database.sqlite',
        
            // http://docs.sequelizejs.com/manual/tutorial/querying.html#operators
            operatorsAliases: 0
        });

        return sequelize;

    }catch(err){
        throw err;
    }
}



module.exports = {
    connect: connect
}