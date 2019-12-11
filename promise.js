//function Add(){
//	var p,q,r;
//	p=1; q= 4;
//	r=p+q;
//	console.log(r);
//}
//var promise = Add;
//promise.then(
//console.log("Addition Completed"));

//const fs = require('fs');
//const crypto = require('crypto');
//
//var data = fs.writeFileSync( "p2.js", crypto.randomBytes(2048).toString('base64') );
//console.log(data);


var request = require('request');
var userDetails;

function initialize() {
    // Setting URL and headers for request
    var options = {
        url: 'http://dummy.restapiexample.com/api/v1/employee/1',
        headers: {
            'User-Agent': 'request'
        }
    };
    
    return new Promise(function(resolve, reject) {
    	
        request.get(options, function(err, resp, body) {
            if (err) {
                reject(err);
            } else {
                resolve(JSON.parse(body));
            }
        })
    })

}

function main() {
    var initializePromise = initialize();
    initializePromise.then(function(result) {
        userDetails = result;
        console.log("Initialized user details");
        
        console.log(userDetails)
    }, function(err) {
        console.log(err);
    })
}

main();