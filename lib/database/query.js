const connection = require('./connection');
const helpers = require('../helpers');
const generate = require('../generate');

async function runQueries(tables){
    if(tables.length > 1){
        await readMultipleTables(tables);
    }else{
        await readSingleTable(tables);
    }
}

async function readSingleTable(tables){
    try{
        helpers.showLog('info', 'Reading table...');

        const table = tables[0];
        const sequelize = await connection.connect();
        
        sequelize.query('SELECT * FROM '+table, {type: sequelize.QueryTypes.SELECT}).then(function(rows) {
            generate.generateSeederCode(table, rows);
        }).catch((err) => {
            helpers.showLog('error', "Table does not exists");
        });
    }catch(err){
        throw err;
    }
}


async function readMultipleTables(tables){
    try{
        helpers.showLog('info', 'Reading tables...');

        const sequelize = await connection.connect();
        tables.map((table) =>{
            sequelize.query('SELECT * FROM '+table, {type: sequelize.QueryTypes.SELECT}).then(function(rows) {
                generate.generateSeederCode(table, rows);
            }).catch((err) => {
                helpers.showLog('error', "Table does not exists");
            });
        });
    }catch(err){
        throw err;
    }
}


module.exports = {
    runQueries: runQueries
}