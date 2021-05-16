#!/usr/bin/env node
const program = require('commander');

const filesMgmt = require('./lib/files');
const query = require('./lib/database/query');

async function run(table = null) {
    try{
        console.log('\x1b[36m%s\x1b[0m',"Generating seeds...");
        const path = await filesMgmt.createDir();
        await query.runQueries(table);
    }catch(err){
        throw err;
    }
    
}



program
.version("1.0.0")
.description("Generate Seeder files from the data in the tables. ");

program
.command('generate <tablenames...>')
.description('Generate a single seeder file from the specified table')
.action(async (tablename) => {
    await run(tablename);
});

program.parse(process.argv);