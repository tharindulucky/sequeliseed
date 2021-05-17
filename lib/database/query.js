const connection = require('./connection');
const helpers = require('../helpers');
const generate = require('../generate');

function readOptions(options, key){
    return (key in options) ? options[key] : null;
}

async function runQueries(tables, options){
    if(tables.length > 1){
        await readMultipleTables(tables, options);
    }else{
        await readSingleTable(tables, options);
    }
}

async function readSingleTable(tables, options){
    try{
        helpers.showLog('info', 'Reading table...');

        const table = tables[0];

        const env = readOptions(options, "env");
        const sequelize = await connection.connect({env: env});
        
        sequelize.query('SELECT * FROM '+table, {type: sequelize.QueryTypes.SELECT}).then(function(rows) {
            generate.generateSeederCode(table, rows);
        }).catch((err) => {
            helpers.showLog('error', "Table does not exists.");
        });
    }catch(err){
        throw err;
    }
}


async function readMultipleTables(tables, options){
    try{
        helpers.showLog('info', 'Reading tables...');

        const env = readOptions(options, "env");
        const sequelize = await connection.connect({env: env});

        tables.map((table) =>{
            sequelize.query('SELECT * FROM '+table, {type: sequelize.QueryTypes.SELECT}).then(function(rows) {
                generate.generateSeederCode(table, rows);
            }).catch((err) => {
                helpers.showLog('error', "One or more table(s) does not exists.");
            });
        });
    }catch(err){
        throw err;
    }
}


module.exports = {
    runQueries: runQueries
}