const Sequelize = require('sequelize');
const dbconfigs = require('./configs');


async function connect(options){
    
    try{
        const configs = await dbconfigs.readConfigs(options);

        const DB = configs ? configs.database : "";
        const USER = configs ? configs.username : "";
        const PASSWORD = configs ? configs.password : "";
        const HOST = configs ? configs.host : "localhost";
        const DIALECT = configs ? configs.dialect : "mysql";

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