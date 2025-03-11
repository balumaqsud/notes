const http = require("http");
const mongodb = require("mongodb");
require("dotenv").config();

//mongo connection
const MONGO_URL = process.env.MONGO_URI;

mongodb.connect(
  MONGO_URL,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err, client) => {
    if (err) {
      console.log(`this the error ${err}`);
    } else {
      console.log("mongo successfully connected");
      module.exports = client;
      let PORT = process.env.PORT;
      const app = require("./app");
      const server = http.createServer(app);
      server.listen(PORT, () => {
        console.log(`server is running in port ${PORT}`);
      });
    }
  }
);
