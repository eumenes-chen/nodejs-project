const { Schema } = require("../db/connect.js");
const dateSchema = new Schema({
  date: {},
  dateStamp: {},
  ct: {},
  et: {},
  weight: {}, // 体重
  title: {}, // 标题
  content: {}, // 内容
});

module.exports = dateSchema;
