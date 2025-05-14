const fs = require('fs').promises;
const queue = require('../classes/readWriteQueue.js');

async function readFileQueue(path){
    const file = await queue.enqueue(()=>fs.readFile(path, 'utf-8'));
    return JSON.parse(file);
}
async function writeFileQueue(file, path){
    queue.enqueue(fs.writeFile(()=>path, JSON.stringify(file), 'utf-8'));
}

module.exports = {
    readFileQueue,
    writeFileQueue
}