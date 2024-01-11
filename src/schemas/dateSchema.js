const { Schema } = require("../db/connect.js");
const dateSchema = new Schema({
  date: {},
  dateStamp: {},
  weight: {},
  ct: {},
  et: {},
});

module.exports = dateSchema;
