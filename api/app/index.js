var app = require('express')();
var compression = require("compression");
var db = require("./middleware/db.js");

app.use(compression());
app.use(db.connectAndAddCollections);

app.use(require("./data/router"));

module.exports = app;
