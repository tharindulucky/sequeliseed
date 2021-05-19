const path = require('path');
const fs = require('fs');
const fsPromises = fs.promises;
const prompt_answers = require('../cli/prompt_answers');

async function readConfigs(options){

    if(options.config)
        return readConfigsFromPrompts(options);
    else
        return readDefaultConfigs(options);
}

async function readDefaultConfigs(options){
    try{
        let env = 'development'
        if(options.env){
            env = options.env;
        }
        const sequelize_config_file = path.join(process.cwd(), "config", "config.json");
        const configs = await fsPromises.readFile(sequelize_config_file, 'utf8');
        const config_obj = JSON.parse(configs);

        if(!config_obj[env]){
            throw new Error('Enviroment not found in sequelize configs.');
        }
        return config_obj[env];
    }catch(err){
        throw err;
    }
}

async function readConfigsFromPrompts(options){
    const user_configs = prompt_answers.getters.getConfigs();
    if(!user_configs.dialect || 
        !user_configs.host || 
        !user_configs.username || 
        !user_configs.database
    ){
        throw new Error('Invalid database credentials!');
    }
    return user_configs;
}

module.exports = {
    readConfigs:readConfigs
};