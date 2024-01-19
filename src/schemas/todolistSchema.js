const { Schema } = require("../db/connect.js");
const dateSchema = new Schema({
  date: {},
  dateStamp: {},
  ct: {},
  et: {},
  dataid: {}, // id
  content: {}, // 内容
  status: {}, // 状态（0：未完成/1：已完成）
  type: {}, // 类型：（默认）
});

module.exports = dateSchema;
