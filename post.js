//var request = require('request');
//request.post({
//    url: 'http://localhost/test2.php',
//    body: "mes=heydude"
//}, function(error, response, body){
//    console.log("+++++++")
//    console.log(body);
//});


const app = require('express')();
const parseData = require('body-parser');

app.use(parseData.json());
var request = require('request');
request.post({
  headers: {'content-type' : 'application/x-www-form-urlencoded'},
  url:     'http://dummy.restapiexample.com/api/v1/create',
  body:    "mes=heydude"
}, function(error, response, body){
     console.log("+++++++")
  console.log(body);
});