// server.js serves all files and have a webhook for automatic updates through GitHub.

var express = require("express");
var app = express();
var exec = require("child_process").exec;

app.use(express.static("public"));

app.post("/github-webhook", function(req, res) {
	exec("./update_from_git.sh");
	res.sendStatus(200);
});

app.listen(80);