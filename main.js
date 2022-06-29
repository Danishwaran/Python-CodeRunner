//import neccessary libraries
const express = require("express");
const bodyParser = require("body-parser");
const {PythonShell} = require("python-shell");

//import neccessary functions
const errorFormatter = require("./utils/ErrorFormatter.js");

//initialize express
const app = express();
const port = 3000;

//middlewares
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json("application/json"));

//endpoints
app.get("/", function(req, res) {
  res.sendFile(__dirname + "/editor.html");
})

app.post("/", function(req, res) {

  const code = req.body.code;

  const output = {
    status : null,
    error: null,
    result: null,
  }

  //execute python code
  PythonShell.runString(code, null, function (err,result) {
    if (err) {
      output.error = errorFormatter.changeFormat(err);
      output.status = "failed";
    }
    else {
      output.status = "successful";
      output.result = result;
    }

    //send output to frontend
    res.send(JSON.stringify(output));
  });
})

app.listen(port, function() {
  console.log(`Compiler is running on port ${port}.`)
})