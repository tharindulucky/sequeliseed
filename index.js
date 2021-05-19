#!/usr/bin/env node
const program = require('commander');
const {prompt} = require('inquirer');

const filesMgmt = require('./lib/files');
const query = require('./lib/database/query');
const helpers = require('./lib/helpers');
const prompts_questions = require('./lib/cli/prompts.json');
const prompts_ans = require('./lib/cli/prompt_answers');

const config_prompts = prompts_questions['prompts']['configs'];

async function run(table, options = null, answers) {
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
.option('--config [config]', 'Allows to manually enter the DB credentials and configuration.')
.description('Generate seeder file(s) from specified table(s). Add tables seperated by a space.')
.action(async (tablenames, options) => {

    if(options.config){
        prompt(config_prompts).then( answers => {
             prompts_ans.setters.setConfigs(answers);
             run(tablenames, options);
        });
    }else{
        run(tablenames, options);
    }
    
});

program.parse(process.argv);