//store all require elements
const editor = document.getElementById("editor");
const runBtn = document.getElementById("submit");
const output = document.getElementById("output");
const reset = document.getElementById("reset");

//reset editor and console on click
reset.addEventListener("click", function() {
  editor.value = "";
  output.value = "";
})

//initiate code compile on click
runBtn.addEventListener("click", function() {
  const code = editor.value;
  
  compileCode(code);
})


//send code to server and receive output
function compileCode(code) {

  //creating object to send to server
  const object = {
    code: code,
  };

  //initializing ajax call
  const request = new XMLHttpRequest();
  
  request.open("POST","/");
  request.setRequestHeader("content-Type","application/json");
  request.send(JSON.stringify(object));

  request.addEventListener("load", function() {
  
    //storing output
    const result = JSON.parse(request.response);

    displayOutput(result);
  })

}

//display output on console
function displayOutput(result) {
  if(result.status === "successful") {
    if(result.result) {
      output.value = result.result.join("\n");
    }
    else {
      output.value = "";
    }
    console.log(output);
  }
  else {
    output.value = result.error;
  }
}