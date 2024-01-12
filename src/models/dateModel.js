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
   * @param {curPage:number,pageSize:number,value:string} data
   * @returns array
   */
  searchDate(data) {
    let res = "";
    if (data.value) {
      let params = [
        { date: { $regex: eval("/" + str + "/") } },
        { dateStamp: { $regex: eval("/" + str + "/") } },
        { weight: { $regex: eval("/" + str + "/") } },
      ];
      res = this.db.find({ $or: params });
    } else {
      res = this.db.find();
    }
    if (data.curPage) {
      res = res
        .sort({ dateStamp: 1 })
        .skip((data.curPage - 1) * (data.pageSize || 10))
        .limit(data.pageSize || 10);
    }
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
    } else {
      res = this.db.find().count();
    }
    return res;
  }
  addDate(data) {
    let res = this.db.insertMany(data);
    return res;
  }
  editDate(data) {
    let date = {};
    let info = {};
    let timeStamp = dayjs().valueOf();
    for (let prop in data) {
      if (prop === "date") {
        date = { date: data[prop] };
      } else {
        info[prop] = data[prop];
      }
    }
    info = { ...info, et: timeStamp };
    return this.db.updateMany(date, { $set: info });
  }
  deleteDate(data) {
    return this.db.deleteOne({ date: data.date });
  }
}

module.exports = new DateModel();
