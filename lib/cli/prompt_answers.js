let answers = {
    configs: {}
}

let setters = {
    setConfigs: (configs) =>{
        answers.configs = configs
    }
}

let getters = {
    getConfigs: (key) => {
        return key ? answers.configs[key] : answers.configs;
    }
}

module.exports = {
    setters:setters,
    getters:getters
}