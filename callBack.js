

// FIRST

// callback add
function add(a, b){
  console.log(a+b);
}

// Main function
function getInput(cb) {
  c = 5+5;
  d = 6+6;
 
    cb(c, d);
    
}

getInput(add)






// SECOND

function print( ans ){
    console.log(ans) ; // 7
}
function add(a, b){
    print(a+b) ;
}

function higherOrderFunction(x, add) {
	console.log("higherOrderFunction");
  return print();
}

add(2,5);


// THIRD

function doHomeWork(subject,callback){
  console.info("study: "+subject);
  callback();
}

alertMsg = function(){
  console.info("alert");
}

doHomeWork('math',alertMsg);