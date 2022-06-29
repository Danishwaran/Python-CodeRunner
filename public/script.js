//store all require elements
const editor = document.getElementById("editor");
const runBtn = document.getElementById("submit");
const output = document.getElementById("output");
const reset = document.getElementById("reset");
const save = document.getElementById("save");
const load = document.getElementById("load");

//reset editor and console on click
reset.addEventListener("click", function() {
  editor.value = "";
  output.value = "";
})

//save code 
save.addEventListener("click", function() {

  const content = editor.value;
  var element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(content));
  element.setAttribute('download', "pythonfile.py");

  element.style.display = 'none';
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
})

//load code
load.addEventListener("change", function() {
  var file = load.files[0];
  var reader = new FileReader();

  var pythonFile = /python.*/;

  if (file.type.match(pythonFile)) {
    reader.onload = function (event) {
      editor.value = event.target.result;
    }
  }
  else {
    editor.value = "It doesn't seem to be a python file!";
  }
  reader.readAsText(file);
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

  }
  else {
    output.value = result.error;
  }
}
