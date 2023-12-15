const { model } = require('../connect');
const characterSchema = require('../schemas/characterSchema');

const stuModel = model('character',characterSchema,'characters');

class CharacterModel{
    constructor(db){
        this.db = stuModel;
    }
    //获取角色数据
    getCharacter(){
        return this.db.find()
    }
    // //学生登录
    // postStu(data){
    //     return this.db.find(data)
    // }
    // //添加课程数据
    // addStuLesson(info,data){
    //     return this.db.updateOne(info,{$set:data})
    // }
    // store(data){
    //     return this.db.insertMany(data)
    // }
    // destory(_id){
    //     return this.db.deleteMany({_id})
    // }
    // edit(_id,data){
    //     return this.db.updateMany({_id},{$set:data})
    // }
}


module.exports = new CharacterModel()