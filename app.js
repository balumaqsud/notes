const express = require("express");
const app = express();

//middlewares
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//fronted engine
app.set("view engine", "ejs");
app.set("views", "views");
