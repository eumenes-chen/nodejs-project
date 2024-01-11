const dayjs = require("dayjs");
var express = require("express");
var router = express.Router();
const DateModel = require("../models/dateModel");

const dataHandler = (data) => {
  return {
    code: "200",
    msg: "success",
    data: data,
  };
};
/**
 * 获取日期数据
 * params { start:YYYY-MM-DD , end:YYYY-MM-DD }
 * params { curPage: number, pageSize: number }
 */
router.get("/getdate", async (req, res) => {
  let query = req.query;
  console.log("query:", query);
  let list = [];
  let total = null;
  if (query.start && query.end) {
    // 请求数据
    list = await DateModel.getDate(query);
    // 查找无数据的日期
    let emptyList = [];
    let curDate = dayjs(query.start).format("YYYY-MM-DD");
    let timeStamp = dayjs().valueOf();
    while (curDate !== dayjs(query.end).add(1, "day").format("YYYY-MM-DD")) {
      if (
        !list.find((item) => {
          return item.date === curDate;
        })
      ) {
        emptyList.push({
          date: dayjs(curDate).format("YYYY-MM-DD"),
          dateStamp: dayjs(curDate).valueOf(),
          weight: null,
          ct: timeStamp,
          et: 0,
        });
      }
      curDate = dayjs(curDate).add(1, "day").format("YYYY-MM-DD");
    }
    // 若存在无数据日期，则创建数据并重新请求
    if (emptyList.length > 0) {
      console.log("存在无数据日期", emptyList);
      await DateModel.addDate(emptyList);
      list = await DateModel.getDate(query);
    }
  } else if (query.curPage) {
    list = await DateModel.getDateByPage(query);
    total = await DateModel.totalDate();
  }
  let data = { list, total };
  res.send(dataHandler(data));
});

//编辑日期数据
router.post("/editdate", async (req, res) => {
  let data = await DateModel.editDate(req.body);
  res.send(dataHandler(data));
});
// 删除日期
router.post("/deletedate", async (req, res) => {
  let data = await DateModel.deleteDate(req.body);
  res.send(dataHandler(data));
});
// 根据关键词查询日期
router.post("/searchdate", async (req, res) => {
  let params = req.body.str;
  let list = await DateModel.searchDate(params);
  let total = await DateModel.totalDate(params);
  let data = { list, total };
  res.send(dataHandler(data));
});

module.exports = router;
