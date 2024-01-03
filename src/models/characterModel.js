const { model } = require("../db/connect");
const characterSchema = require("../schemas/characterSchema");

const characterModel = model(
  "sanguocharacter",
  characterSchema,
  "sanguocharacter"
);

class CharacterModel {
  constructor(db) {
    this.db = characterModel;
  }
  //获取角色数据
  character() {
    let res = this.db.find({});
    return res;
  }
  // 通过姓名数组获取大量角色
  getCharacter(arr) {
    console.log("arr:", arr);
    let res = [];
    if (arr.length) {
      let params = {
        $or: arr,
      };
      res = this.db.find(params);
    }
    return res;
  }
  // 根据关键词查询角色
  searchCharacter(str) {
    let params = {
      name: eval("/" + str + "/i"),
    };
    let res = this.db.find(params);
    return res;
  }
  // 添加角色
  addCharacter(data) {
    let res = this.db.insertMany({ ...data, view: false });
    return res;
  }
  // 编辑角色
  editCharacter(data) {
    console.log('data:',data);
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
