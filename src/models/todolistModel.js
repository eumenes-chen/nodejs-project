const dayjs = require("dayjs");

const { model } = require("../db/connect");
const todolistSchema = require("../schemas/todolistSchema");
const todolistModel = model("todolistlist", todolistSchema, "todolistlist");

class TodolistModel {
  constructor(db) {
    this.db = todolistModel;
  }
  getTimeStamp() {
    return dayjs().valueOf();
  }
  /**
   * 获取待办数据(开始结束日期)
   * @param {start:YYYY-MM-DD,end:YYYY-MM-DD} data
   * @returns array
   */
  getTodolist(data) {
    let start = dayjs(data.start).valueOf();
    let end = dayjs(data.end).valueOf();
    let list = this.db
      .find({ todolistStamp: { $gte: start, $lte: end } })
      .sort({ todolistStamp: 1 });
    return list;
  }
  /**
   * 获取日期数据(页数)
   * @param {curPage:number,pageSize:number,value:string} data
   * @returns array
   */
  searchTodolist(data) {
    let res = "";
    if (data.value) {
      let params = [
        { date: { $regex: eval("/" + str + "/") } },
        { dateStamp: { $regex: eval("/" + str + "/") } },
        { weight: { $regex: eval("/" + str + "/") } },
        { content: { $regex: eval("/" + str + "/") } },
        
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
  addTodolist() {
    let timeStamp = dayjs().valueOf().substr(5,-1)
    console.log('1timeStamp',timeStamp);
    let params = {
      dataid:timeStamp + Math.random()*100
    }
    console.log('1params',params);
    let res = this.db.insertMany(params);
    return res;
  }
}

module.exports = new TodolistModel();
