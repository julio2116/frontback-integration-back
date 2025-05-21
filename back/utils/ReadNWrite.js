const fs = require('fs').promises;
const queue = require('../classes/Queue.js');

async function readFileQueue(path){
    const file = await queue.enQueue(()=>fs.readFile(path, 'utf-8'));
    return JSON.parse(file);
}
async function writeFileQueue(file, path){
    await queue.enQueue(()=>fs.writeFile(path, JSON.stringify(file, null, 2), 'utf-8'));
}

module.exports = {
    readFileQueue,
    writeFileQueue
}