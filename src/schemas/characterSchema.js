const { Schema } = require("../db/connect.js");
const characterSchema = new Schema({
  name: {
    type: String,
    require: true,
  },
  birth: {},
  death: {},
  country: {
    type: String,
  },
  view: {
    type: Boolean,
  },
});

module.exports = characterSchema;
