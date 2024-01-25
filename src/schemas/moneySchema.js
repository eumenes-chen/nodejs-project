const { Schema } = require("../db/connect.js");
const moneySchema = new Schema({
  date: {},
  dateStamp: {},
  ct: {},
  et: {},
  money: {}, // 金额
  type: {}, // 类型：收入/支出
  detail: {}, // 详情：衣服/饮食/房租/出行/娱乐/购物/其他支出/工资/红包/其他收入
});

module.exports = moneySchema;