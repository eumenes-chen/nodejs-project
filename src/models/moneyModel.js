const dayjs = require("dayjs");

const { model } = require("../db/connect");
const moneySchema = require("../schemas/moneySchema");
const moneyModel = model("moneylist", moneySchema, "moneylist");

class MoneyModel {
  constructor(db) {
    this.db = moneyModel;
  }
  getTimeStamp() {
    return dayjs().valueOf();
  }
  /**
   * 获取金额数据(开始结束日期)
   * @param {start:YYYY-MM-DD,end:YYYY-MM-DD} data
   * @returns array
   */
  getMoney(data) {
    let start = dayjs(data.start).valueOf();
    let end = dayjs(data.end).valueOf();
    let list = this.db
      .find({ dateStamp: { $gte: start, $lte: end } })
      .sort({ dateStamp: 1 });
    return list;
  }
  /**
   * 获取金额数据(页数)
   * @param {curPage:number,pageSize:number,value:string} data
   * @returns array
   */
  searchMoney(data) {
    let res = "";
    if (data.value) {
      let params = [
        { date: { $regex: eval("/" + str + "/") } },
        { dateStamp: { $regex: eval("/" + str + "/") } },
        { money: { $regex: eval("/" + str + "/") } },
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
  // 金额数量
  totalMoney(str) {
    let res = "";
    if (str) {
      let params = [
        { date: { $regex: eval("/" + str + "/") } },
        { dateStamp: { $regex: eval("/" + str + "/") } },
        { money: { $regex: eval("/" + str + "/") } },
      ];
      res = this.db.find({ $or: params }).count();
    } else {
      res = this.db.find().count();
    }
    return res;
  }
  addMoney(data) {
    let res = this.db.insertMany(data);
    return res;
  }
  editMoney(data) {
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
  deleteMoney(data) {
    return this.db.deleteOne({ date: data.date });
  }
}

module.exports = new MoneyModel();
