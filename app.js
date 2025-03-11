const express = require("express");
const mongodb = require("mongodb");
//app
const app = express();

//to use client in app
const db = require("./server").db();
console.log("this is ", db);

//middlewares
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//fronted engine
app.set("views", "views");
app.set("view engine", "ejs");

//routing
app.get("/", (req, res) => {
  res.render("notes");
});

module.exports = app;
