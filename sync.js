var filesytem = require("fs");

var data = filesytem.readFileSync("async.js", "utf8");
console.log(data);
console.log("Synced"); 

filesytem.readFile('demo.js','utf8',function(err,data){
    if(!err) {
       console.log(data);
    }
});
console.log("Asynced"); 


