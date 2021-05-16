const connection = require('./connection');

async function readAllTables(){
    console.log('\x1b[36m%s\x1b[0m',"Reading all tables...");

 
    const sequelize = await connection.connect();
    console.log(sequelize);
    sequelize.query('show tables').then(function(rows) {
        console.log(JSON.stringify(rows));
    });

}

async function readTable(){
    console.log('\x1b[36m%s\x1b[0m',"Reading table(s)...");
    //await generate.generateSeederCode();
}

module.exports = {
    readAllTables: readAllTables,
    readTable: readTable
}