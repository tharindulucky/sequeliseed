#!/usr/bin/env node
const program = require('commander');

const filesMgmt = require('./lib/files');
const database = require('./lib/database');

async function run(table = null) {
    console.log('\x1b[36m%s\x1b[0m',"Generating seeds...");
    const path = await filesMgmt.createDir();

    if(table !== null){
        await database.readTable();
    }else{
        await database.readAllTables();
    }
    console.log('\x1b[32m%s\x1b[0m',"Seeds Generated Successfully!");
    
}



program
.version("1.0.0")
.description("Generate Seeder files from the data in the tables. ");

program
.command('generate:all')
.description('Generate a single seeder file from the specified table')
.action(async () => {
    await run();
});

program
.command('generate <tablenames...>')
.description('Generate a single seeder file from the specified table')
.action(async (tablename) => {
    await run(tablename);
});

program.parse(process.argv);