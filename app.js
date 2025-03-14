const express = require("express");
const mongodb = require("mongodb");
//app
const app = express();

//to use client in app
const db = require("./server").db();

//middlewares
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//fronted engine
app.set("views", "views");
app.set("view engine", "ejs");

//routing
app.post("/create-item", (req, res) => {
  const title = req.body.title;
  const body = req.body.body;
  db.collection("notes_collection").insertOne(
    { title: title, body: body },
    (err, data) => {
      res.json(data.ops[0]);
    }
  );
});

app.get("/", (req, res) => {
  db.collection("notes_collection")
    .find()
    .toArray((err, data) => {
      if (err) {
        console.log(er);
      } else {
        res.render("notes", { items: data });
      }
    });
});

module.exports = app;
