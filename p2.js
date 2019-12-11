const fs = require('fs');

process.on('unhandledRejection', (err)=>{
 console.error(err);
})

function synchronous() {
 console.time("sync");
 fs.readFileSync("test.txt")
 console.timeEnd("sync")
}

async function asynchronous() {
 console.time("async");
 let p0 = fs.promises.readFile("./test.txt");
 await Promise.all([p0])
 console.timeEnd("async")
}

synchronous()
asynchronous()