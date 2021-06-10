var express = require("express");
http = require("http");
app = express();
var toDos = [];
app.use(express.static(__dirname + "/client"));
http.createServer(app).listen(3000);
app.get("/todos.json", function (req, res) {
	res.json(toDos);
});