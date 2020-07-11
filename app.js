//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");

const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

const tracked_positions = ["NASDAQ:APPL:6ae20", "NASDAQ:AAPL:3dv40"];

//Home
app.get("/", function(req, res){
  res.render("main", {trackedPositions: tracked_positions});
});


app.get("/configure", function(req, res){
  res.render("configure", {aboutContent: aboutContent});
});


app.listen(3000 || process.env.PORT, function() {
  console.log("Server started on port 3000");
});
