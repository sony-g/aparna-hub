const app = require('express')();

const parseData = require('body-parser');

app.use(parseData.json());


//GET method
app.get('/empData', (req, res) => {
    res.send('Software Engineer');
});


//POST method

app.post('/postingEmpData', (req, res) => {

    var data = req.body;
    
  //  var names = [ {'firstNmae' : 'AP'}, {'lastName' : 'PA'}]
    
     data.empId = 1789;
     data.empSalary = '10000';
	 data.empPanNo = 'DF1234GH0';
	 data.empDesignation = 'Software Engineer';
	 console.log(data);
    res.send(data);
});

app.listen(4100); 



