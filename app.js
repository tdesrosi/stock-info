//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");

const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

//Home
app.get("/", function(req, res){
  res.render("home", {
    startingContent: homeStartingContent,
    posts: posts
    });
});


app.get("/configure", function(req, res){
  res.render("about", {aboutContent: aboutContent});
});


app.listen(3000, function() {
  console.log("Server started on port 3000");
});
