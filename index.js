const filesMgmt = require('./lib/files');
const generate = require('./lib/generate');

exports.run = async function() {
    console.log("Generating iSeeds...");
    const path = await filesMgmt.createDir();
    await filesMgmt.generateSeedFiles(path);
    await generate.generateSeederCode();
    console.log("iSeeds Generated Successfully");
}