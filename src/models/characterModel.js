const { model } = require("../db/connect");
const characterSchema = require("../schemas/characterSchema");
const qs = require("qs");

const characterModel = model(
  "sanguocharacter",
  characterSchema,
  "sanguocharacter"
);

class CharacterModel {
  constructor(db) {
    this.db = characterModel;
  }
  //根据页数获取角色数据
  // {page,pageSize}
  character(data) {
    let curPage = data.curPage || 1;
    let pageSize = data.pageSize || 1000;
    let list = this.db
      .find()
      .skip((curPage - 1) * pageSize)
      .limit(pageSize);
    return list;
  }
  // 获取角色数据总量
  totalCharacter(str) {
    let res = "";
    if (str) {
      let params = [
        { name: { $regex: eval("/" + str + "/") } },
        { birth: { $regex: eval("/" + str + "/") } },
        { death: { $regex: eval("/" + str + "/") } },
        { country: { $regex: eval("/" + str + "/") } },
      ];
      res = this.db.find({ $or: params }).count();
    } else {
      res = this.db.find().count();
    }

    return res;
  }
  // 根据姓名查询角色
  searchCharacter(str) {
    console.log("str:", str);
    let params = [
      { name: { $regex: eval("/" + str + "/") } },
      { birth: { $regex: eval("/" + str + "/") } },
      { death: { $regex: eval("/" + str + "/") } },
      { country: { $regex: eval("/" + str + "/") } },
    ];
    let res = this.db.find({ $or: params });
    return res;
  }
  // 添加角色
  addCharacter(data) {
    let res = this.db.insertMany({ ...data, view: false });
    return res;
  }
  // 编辑角色
  editCharacter(data) {
    console.log("data:", data);
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
  // 删除角色
  deleteCharacter(_id) {
    return this.db.deleteMany({ _id });
  }
  // 增加展示在框中的角色
  addViewCharacter(data) {
    return this.db.updateMany({ _id: data.id }, { $set: { view: true } });
  }
  // 移除展示在框中的角色
  deleteViewCharacter(data) {
    return this.db.updateMany({ _id: data.id }, { $set: { view: false } });
  }
  // 清空展示在框中的角色
  clearViewCharacter() {
    return this.db.updateMany({}, { $set: { view: false } });
  }
}

module.exports = new CharacterModel();
