#!/usr/bin/env node
const program = require('commander');

const filesMgmt = require('./lib/files');
const generate = require('./lib/generate');

async function run() {
    console.log("Generating iSeeds...");
    const path = await filesMgmt.createDir();
    await filesMgmt.generateSeedFiles(path);
    await generate.generateSeederCode();
    console.log("iSeeds Generated Successfully");
}



program
.version("1.0.0")
.description("Generate Seeder files from the data in the tables. ");

program
.command('generate <tablename>')
.description('Generate a single seeder file from the specified table')
.action(async () => {
    await run();
});

program.parse(process.argv);