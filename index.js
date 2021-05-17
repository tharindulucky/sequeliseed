#!/usr/bin/env node
const program = require('commander');

const filesMgmt = require('./lib/files');
const query = require('./lib/database/query');
const helpers = require('./lib/helpers');

async function run(table, options = null) {
    try{
        helpers.showLog('info', "Generating seeds...");
        await filesMgmt.createDir();
        await query.runQueries(table, options);
    }catch(err){
        throw err;
    }
    
}



program
.version("1.0.0")
.description("Generate Seeder files from the data in the tables. ");

program
.command('generate <tablenames...>')
.option('--env [env]', 'Specify the environement (development, test or production)')
.description('Generate seeder file(s) from specified table(s). Add tables seperated by a space.')
.action(async (tablenames, options) => {
    await run(tablenames, options);
});

program.parse(process.argv);