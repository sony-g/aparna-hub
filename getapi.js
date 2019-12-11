var express = require('express');
var mysql = require('mysql');
var app = express();
var bodyParser = require('body-parser');

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'test'
});


app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
  }); 
// app.use((req, res, next) => {
//     //console.log(req);
//     res.append('Access-Control-Allow-Origin', ['*']);
//     res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
//     res.header("Content-Type", "application/json");
//     res.append('Access-Control-Allow-Headers', 'Content-Type');
//     next();
// });


app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));

connection.connect(function (err) {
    if (!err) {
        console.log("DB connected successfully");
    } else {
        console.log("Connection failed");
    }
});

app.get("/getEmployee", function (req, res) {
    console.log("GET");
    connection.query('SELECT * FROM emp', function (err, rows, fields) {
        if (!err) {
            res.send(rows)
        } else {
            console.log("Error while performing");
        }
        //  connection.end();

    });
});
app.get("/getCountrys", function (req, res) {
    console.log("GET");
    connection.query('SELECT * FROM country', function (err, rows, fields) {
        if (!err) {
            res.send(rows)
        } else {
            console.log("Error while performing");
        }
        //  connection.end();

    });
});

app.post('/emailVerify', function (req, res) {
    console.log(req.body);
    var data = req.body;
    connection.query("SELECT COUNT(*) AS count FROM `citizen` WHERE `email`=?", [data.email], function (error, results, fields) {
        if (error) throw error;

        const count = results[0].count;
        res.send(results);
             
        if (count >= 1) {
            console.log("Record already exists");
        } else {
            console.log("INSERT INTO citizen",data);
            connection.query('INSERT INTO citizen SET ?', data, function (error, results, fields) {
                if (error) {
                    console.log("error",error);
                }else{
                    console.log("Record inserted successfully");
                    console.log(results);
                }                
            });
        }
       
    });
});

app.post('/login', function (req, res) {
    console.log(req.body);
    var data = req.body;
    connection.query("SELECT * FROM `citizen` WHERE `email`=? AND `password`=?", [data.email, data.password], function (error, results, fields) {
        if (error) throw error;
        res.send(results);
        console.log(results);
      //  res.end(JSON.stringify(results));

    });
});

app.post('/getStates', function (req, res) {
    console.log(req.body);
    var data = req.body;
    connection.query("SELECT * FROM `states` WHERE `countryCode`=?", [data.countryCode], function (error, results, fields) {
        if (error) throw error;
        res.send(results);

    });
});

app.post('/getCities', function (req, res) {
    console.log(req.body);
    var data = req.body;
    connection.query("SELECT * FROM `cities` WHERE `stateCode`=?", [data.stateCode], function (error, results, fields) {
        if (error) throw error;
        res.send(results);
        // res.end(JSON.stringify(results));

    });
});

app.get("/getCitizen", function (req, res) {
    console.log("GET");
    connection.query('SELECT * FROM citizen', function (err, rows, fields) {
        if (!err) {
            res.send(rows)
        } else {
            console.log("Error while performing");
        }
        //  connection.end();

    });
});

app.get("/getJoins", function (req, res) {
    connection.query(`SELECT emp.id, emp.name, emp.gender,employees_form_update.changedat FROM emp INNER JOIN employees_form_update ON emp.name=employees_form_update.name`, function (err, rows, fields) {
        console.log(rows);
        if (!err) {
            res.send(rows)
        } else {
            if (err) throw err;
            console.log("Error while performing");
        }

    });
    // });
});



app.post('/customer', function (req, res) {
    console.log(req.body);
    var params = req.body;
    connection.query('INSERT INTO emp SET ?', params, function (error, results, fields) {
        if (error) throw error;

        res.send(JSON.stringify({ "status": 200, "error": null, "response": results }));
        res.end(JSON.stringify(results));

    });
});


app.post('/reactiveForm', function (req, res) {
    console.log(req.body);
    var params = req.body;
    connection.query('INSERT INTO citizen SET ?', params, function (error, results, fields) {
        if (error) throw error;
        res.send(JSON.stringify({ "status": 200, "error": null, "response": results }));
        res.end(JSON.stringify(results));

    });
});

app.put('/updateData', function (req, res) {
    console.log("UPDATE");
    connection.query('UPDATE `emp` SET `name` =?, `address`=?, `technology` =?, where `emp`.`id`=?', [req.body.name, req.body.address, req.body.technology, req.body.id],
        function (error, rows, fields) {
            if (error) {
                console.log("Eoorrrr:", error);
            } else {
                console.log(rows, "res::::", connection)
                //  res.send(JSON.stringify(rows));
                res.end(JSON.stringify(rows));
            }


        });
});


app.put('/updateCitizenData', function (req, res) {
    console.log('testing')
    connection.query('UPDATE `citizen` SET `firstName`=?,`countryName`=?,`stateName`=?,`cityName`=?,`technology`=? where `citizen`.`id`=?', 
    [req.body.firstName,req.body.countryName, req.body.stateName, req.body.cityName,req.body.technology,req.body.id], function (error, rows, fields) {
	  if (error) throw error;
	  res.end(JSON.stringify(rows));
	});
}); 



app.put('/data', function (req, res) {
    console.log(req.body);
    connection.query('UPDATE `emp` SET `status` = ? where `emp`.`id`=?', [req.body.status, req.body.id],
        function (error, results, fields) {
            if (error) throw error;
            res.end(JSON.stringify(results));
        });
});
// app.put('/updateForEmployeeData', function (req, res) {
//     console.log('testing')
//    dbConnection.query('UPDATE `employee` SET `firstname`=?,`isMarried`=?,`remarks`=?,`status`=? where `employee`.`id`=?', 
//                     [req.body.firstname,req.body.isMarried, req.body.remarks, req.body.status,req.body.id], function (error, rows, fields) {
// 	  if (error) throw error;
// 	  res.end(JSON.stringify(rows));
// 	});
// }); 

app.post('/getOneUser', function (req, res) {
    console.log(req.body);
    var data = req.body;
    connection.query("SELECT * FROM `citizen` WHERE `email`=?", [data.email], function (error, results, fields) {
        if (error) throw error;
        res.send(results);
        // res.end(JSON.stringify(results));

    });
});
app.listen(4600);
