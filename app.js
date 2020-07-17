//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");

const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

const screen_height = 1800;
const tracked_positions = 
[
  "NYSE:DG:d9f84", 
  "NYSE:WPM:3dv40", 
  "NASDAQ:CSCO:5h30r", 
  "NYSE:AZN:2a872",
  "NASDAQ:ACIA:587a2",
  "NASDAQ:MRNA:473b3" 
];

//Home
app.get("/", function(req, res){
  res.render("main", {trackedPositions: tracked_positions, screenHeight: screen_height});
});


app.get("/configure", function(req, res){
  res.render("configure", {aboutContent: aboutContent});
});


app.listen(process.env.PORT || 3000, function() {
  console.log("Server started on port 3000");
});
