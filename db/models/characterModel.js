const { model } = require('../connect');
const characterSchema = require('../schemas/characterSchema');

const characterModel = model('sanguocharacter', characterSchema, 'sanguocharacter');

class CharacterModel {
    constructor(db) {
        this.db = characterModel;
    }
    //获取角色数据
    character() {
        let res = this.db.find({})
        return res
    }
    // 通过姓名数组获取大量角色
    getCharacter(arr) {
        let res = []
        if (arr.length) {
            let params = {
                '$or': arr
            }
            res = this.db.find(params)
        }
        return res;
    }
    // 根据关键词查询角色
    searchCharacter(str) {
        let params = {
            name:eval('/'+str+'/i')
        }
        let res = this.db.find(params)
        return res;
    }
    // 添加角色
    addCharacter(data) {
        let res = this.db.insertMany(data)
        return res;
    }
    // 编辑角色
    editCharacter(data) {
        return this.db.updateMany({ _id: data._id }, { $set: data })
    }
    // 删除角色
    deleteCharacter(_id) {
        return this.db.deleteMany({ _id })
    }
}


module.exports = new CharacterModel()