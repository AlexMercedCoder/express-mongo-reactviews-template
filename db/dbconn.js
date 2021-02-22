//////////////////////////////////////
// DEPENDENCIES
//////////////////////////////////////
const mongoose = require("mongoose");
require("dotenv").config();
const { MONGODB_URI, DB_NAME } = process.env;
const {log} = require("mercedlogger")

///////////////////////////////////////
// Config Object
//////////////////////////////////////
const dbconfig = { useUnifiedTopology: true, useNewUrlParser: true };

//////////////////////////////////////
// DATABASE CONNECTION
//////////////////////////////////////
mongoose.connect(`${MONGODB_URI}${DB_NAME}`, dbconfig);
mongoose.set("useCreateIndex", true);

///////////////////////////////////////
// DATABASE EVENTS
///////////////////////////////////////
const db = mongoose.connection;
db.on("open", () => {
  log.green("Mongo", "YOU ARE CONNECTED TO MONGO");
})
  .on("close", () => {
    log.cyan("Mongo", "YOU ARE DISCONNECTED TO MONGO");
  })
  .on("error", (err) => {
    log.red("Mongo", err);
  });

///////////////////////////////
// EXPORT CONNECTION TO USE IN OTHER SCRIPTS
//////////////////////////////
module.exports = mongoose;
