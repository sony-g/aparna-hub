async function func() {

  let promise = new Promise((resolve, reject) => {
      console.log("Wait for few seconds");
    setTimeout(() => resolve("Result Came!"), 1000)
  });

  let result = await promise; 

  console.log(result); 
}

func();