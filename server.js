// server.js serves all files and have a webhook for automatic updates through GitHub.

var express = require("express");
var app = express();

app.use(express.static("public"));

app.listen(80);
