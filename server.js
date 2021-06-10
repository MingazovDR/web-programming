var express = require("express");
http = require("http");
mongoose = require("mongoose"),
app = express();
var toDos = require('./client/todos.json');
app.use(express.static(__dirname + "/client"));
app.use(express.urlencoded({ extended: true }));
mongoose.connect('mongodb://localhost/amazeriffic');

var ToDoSchema = mongoose.Schema({
	description: String,
	tags: [ String ]
});

var ToDo = mongoose.model("ToDo", ToDoSchema);

http.createServer(app).listen(3000);
app.get("/todos", function (req, res) {
	ToDo.find({}, function (err, toDos) {
		res.json(toDos);
	});
});
app.post("/todos", function (req, res) {
	console.log(req.body);
	var newToDo = new ToDo({"description":req.body.description,
		"tags":req.body.tags});
	newToDo.save(function (err, result) {
		if (err !== null) {
			console.log(err);
			res.send("ERROR");
		} else {
			ToDo.find({}, function (err, result) {
				if (err !== null) {
					res.send("ERROR");
					}
				res.json(result);
			});
		}
	});


	//var newToDo = req.body;
	//console.log(newToDo);
	//toDos.push(newToDo);
	//res.json(toDos);
});