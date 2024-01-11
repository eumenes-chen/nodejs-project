const dayjs = require("dayjs");

const { model } = require("../db/connect");
const dateSchema = require("../schemas/dateSchema");
const dateModel = model("datelist", dateSchema, "datelist");

class DateModel {
  constructor(db) {
    this.db = dateModel;
  }
  getTimeStamp() {
    return dayjs().valueOf();
  }
  /**
   * 获取日期数据(开始结束日期)
   * @param {start:YYYY-MM-DD,end:YYYY-MM-DD} data
   * @returns array
   */
  getDate(data) {
    let start = dayjs(data.start).valueOf();
    let end = dayjs(data.end).valueOf();
    let list = this.db
      .find({ dateStamp: { $gte: start, $lte: end } })
      .sort({ dateStamp: 1 });
    return list;
  }
  /**
   * 获取日期数据(页数)
   * @param {curPage:number,pageSize:number} data
   * @returns array
   */
  getDateByPage(data) {
    let curPage = data.curPage;
    let pageSize = data.pageSize || 10;
    let list = this.db
      .find()
      .sort({ dateStamp: 1 })
      .skip((curPage - 1) * pageSize)
      .limit(pageSize);
    return list;
  }
  // 根据姓名查询
  searchDate(str) {
    let params = [
      { date: { $regex: eval("/" + str + "/") } },
      { dateStamp: { $regex: eval("/" + str + "/") } },
      { weight: { $regex: eval("/" + str + "/") } },
    ];
    let res = this.db.find({ $or: params });
    return res;
  }
  // 日期数量
  totalDate(str) {
    let res = "";
    if (str) {
      let params = [
        { date: { $regex: eval("/" + str + "/") } },
        { dateStamp: { $regex: eval("/" + str + "/") } },
        { weight: { $regex: eval("/" + str + "/") } },
      ];
      res = this.db.find({ $or: params }).count();
    }else{
      res = this.db.find().count();
    }
    return res;
  }
  addDate(data) {
    let res = this.db.insertMany(data);
    return res;
  }
  editDate(data) {
    let id = {};
    let info = {};
    for (let prop in data) {
      if (prop === "_id") {
        id = { _id: data[prop] };
      } else {
        info[prop] = data[prop];
      }
    }
    return this.db.updateMany(id, { $set: info });
  }
  deleteDate(data) {
    return this.db.deleteOne({ date: data.date });
  }
}

module.exports = new DateModel();
