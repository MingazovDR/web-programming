var express = require("express");
http = require("http");
app = express();
var toDos = require('./client/todos.json');
app.use(express.static(__dirname + "/client"));
app.use(express.urlencoded({ extended: true }));
http.createServer(app).listen(3000);
app.get("/todos", function (req, res) {
	res.json(toDos);
});
app.post("/todos", function (req, res) {
	var newToDo = req.body;
	console.log(newToDo);
	toDos.push(newToDo);
	res.json(toDos);
});