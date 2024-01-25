const dayjs = require("dayjs");
var express = require("express");
var router = express.Router();
const MoneyModel = require("../models/moneyModel");

const dataHandler = (data) => {
  return {
    code: "200",
    msg: "success",
    data: data,
  };
};

/**
 * 获取金额数据
 * params { start:YYYY-MM-DD , end:YYYY-MM-DD }
 * params { curPage: number, pageSize: number }
 */
router.get("/getmoney", async (req, res) => {
  let query = req.query
  console.log('请求金额',query);
})
/**
 * 新增金额数据
 */
router.post('/addmoney', async (req, res) => {
  let data = await MoneyModel.addMoney(req.body);
  res.send(dataHandler(data))
})