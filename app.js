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

//Main Display
//This is what the Raspberry Pi loads upon startup
app.get("/", function(req, res){
  res.render("main", {trackedPositions: tracked_positions, screenHeight: screen_height});
});

//Configuration 
app.get("/configure", function(req, res){
  res.render("configure", {trackedPositions: tracked_positions});
});

//Configuration
app.post("/configure", function(req, res){
  var new_stock = req.body.newStock;
  var new_exchange = req.body.newStockExchange;
  trackedPositions.push(new_exchange + ":" + new_stock + ":" + "578a2");
  res.render("configure", {trackedPositions: tracked_positions});
});


app.listen(process.env.PORT || 3000, function() {
  console.log("Server started on port 3000");
});
