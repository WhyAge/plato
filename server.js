// server.js serves all files and have a webhook for automatic updates through GitHub.

var express = require("express");
var app = express();

app.use(express.static("public"));

app.post("/github-webhook", function(req, res) {
	exec("sudo update_from_git.sh");
	res.sendStatus(200);
});

app.listen(80);