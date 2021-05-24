const connection = require('./connection');
const helpers = require('../helpers');
const generate = require('../generate');

function readOptions(options, key){
    return (key in options) ? options[key] : null;
}

async function runQueries(tables, options){
    try{
        if(tables.length > 1){
            await readMultipleTables(tables, options);
        }else{
            await readSingleTable(tables, options);
        }
    }catch(err){
        throw err;
    }
}

async function readSingleTable(tables, options){
    try{
        const table = tables[0];

        const env = readOptions(options, "env");
        const config = readOptions(options, "config");
        
        const sequelize = await connection.connect({env: env, config: config});
        await sequelize.authenticate();
        
        const rows = await sequelize.query('SELECT * FROM '+table, {type: sequelize.QueryTypes.SELECT});
        helpers.showLog('info', 'Reading table...');
        generate.generateSeederCode(table, rows);
        
    }catch(err){
        throw err;
    }
}


async function readMultipleTables(tables, options){

    const errors = [];

    try{
        const env = readOptions(options, "env");
        const config = readOptions(options, "config");

        const sequelize = await connection.connect({env: env, config:config});
        await sequelize.authenticate();

        for(let i = 0; i < tables.length; i++){
            try{
                const rows = await sequelize.query('SELECT * FROM '+tables[i], {type: sequelize.QueryTypes.SELECT});
                helpers.showLog('info', 'Reading tables...');
                generate.generateSeederCode(tables[i], rows);
            }catch(err){
                helpers.showLog('error', err.message);
            }
        }
    }catch(err){
        throw err;
    }
}


module.exports = {
    runQueries: runQueries
}