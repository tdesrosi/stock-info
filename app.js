//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
const mongoose = require("mongoose");
require('dotenv').config();

const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

//Set constant height of vertical monitor that's hooked up to the pi.
//This calculates the height of each graph to make sure they're all
const screen_height = 1830;

//mongodb connection. I am using a free tier of mondodb's cloud Atlas.
//Store connection vars in environment
mongoose.connect("mongodb+srv://" + process.env.DB_USER + ":" + process.env.DB_PASSWORD + "@cluster0.9ehbo.mongodb.net/stocks",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

console.log(process.env.DB_PASSWORD);

//set up schema and define a test item.
//  the "code" field is a mystery to me, TradingView widgets don't wory without it,
//  but there seems to be no methodology to its creation. A random collection of
//  five characters works just fine and makes the widget work.
const itemsSchema = {
  exchange: String,
  stock: String,
  code: String
};
const Stock = mongoose.model("Stock", itemsSchema);
const testStock = new Stock({
  exchange: "NASDAQ",
  stock: "AAPL",
  code: "582a9"
});
const defaultItems = [testStock];

//Main Display
//This is what the Raspberry Pi loads upon startup
app.get("/", function (req, res) {
  Stock.find({}, (err, items) => {
    res.render("main", { trackedPositions: items, screenHeight: screen_height });
  });
  
});


//configuration get route. Will check to see if database is empty, in which case it
//will add a default stock.
app.get("/configure", function (req, res) {

  Stock.find({}, function (err, foundItems) {

    if (foundItems.length === 0) {
      Stock.insertMany(defaultItems, function (err) {
        if (err) {
          console.log(err);
        } else {
          console.log("Successfully initialized list");
        }
      });
      res.redirect("/configure");
    } else {
      res.render("configure", { trackedPositions: foundItems });
    }
  });

});


//Configuration
app.post("/configure", function (req, res) {
  //make random code
  var result = '';
  var chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
  var charsLength = chars.length;
  var length = "5";
  for ( var i = 0; i < length; i++ ) {
    result += chars.charAt(Math.floor(Math.random() * charsLength));
  }

  //save new stock into database
  const new_stock = req.body.newStockName;
  const new_exchange = req.body.newStockExchange;
  const stock = new Stock({
    exchange: new_exchange,
    stock: new_stock,
    code: result
  });
  stock.save();
  res.redirect("/configure");
});

app.post("/delete", function (req, res) {
  const checkedItemId = req.body.checkbox;
  Stock.findByIdAndRemove(checkedItemId, function (err) {
    if (!err) {
      console.log("Successfully deleted checked item.");
      res.redirect("/configure");
    }
  });
});

app.listen(process.env.PORT || 3000, function () {
  console.log("Server started on port 3000");
});
