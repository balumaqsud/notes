const express = require("express");
const app = express();

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
