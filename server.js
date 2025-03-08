const mongodb = require("mongodb");
const http = require("https");
const app = require("./app");
const { servers } = require("mongodb/lib/core/topologies/server");
require("dotenv").config();

//mongo connection
MONGO_URL = process.env.MONGO_URI;

mongodb.connect(MONGO_URL, (err, client) => {
  if (err) {
    console.log("mongo could not connect");
  } else {
    PORT = process.env.PORT;
    module.exports = client;
    const server = http.createServer(app);
    server.listen(PORT, () => {
      console.log(`successfully connected to mongo and running in ${PORT}`);
    });
  }
});
