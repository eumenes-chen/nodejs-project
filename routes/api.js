var express = require('express');
var router = express.Router();
const CharacterModel = require('../db/models/characterModel')
const ViewModel = require('../db/models/viewModel')
const qs = require('qs')
// const queryString = require('query-string')


/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

//获取角色数据
router.get('/character', async (req, res) => {
  let data = await CharacterModel.character();
  res.send(data)
})
//通过姓名数组获取大量角色
router.post('/getcharacter', async (req, res) => {
  let params = req.body.arr
  let data = await CharacterModel.getCharacter(params);
  res.send(data)
})
// 根据关键词查询角色
router.post('/searchCharacter', async (req, res) => {
  let params = req.body.str
  let data = await CharacterModel.searchCharacter(params);
  res.send(data)
})
//添加角色
router.post('/addcharacter', async (req, res) => {
  let data = await CharacterModel.addCharacter(req.body);
  res.send(data)
})
//编辑角色
router.post('/editcharacter', async (req, res) => {
  let data = await CharacterModel.editCharacter(req.body);
  res.send(data)
})
//删除角色
router.post('/deletecharacter', async (req, res) => {
  let data = await CharacterModel.deleteCharacter(req.body);
  res.send(data)
})

//获取name数据
router.get('/view', async (req, res) => {
  let data = await ViewModel.getView();
  res.send(data)
})
//添加name
router.post('/addview', async (req, res) => {
  let data = await ViewModel.addView(req.body);
  res.send(data)
})
//删除name
router.post('/deleteview', async (req, res) => {
  let data = await ViewModel.deleteView(req.body);
  res.send(data)
})
//删除全部name
router.post('/deleteallview', async (req, res) => {
  let data = await ViewModel.deleteAllView();
  res.send(data)
})


module.exports = router;

// const express = require('express');
// const router = express.Router();
// const StuModel = require('../db/models/stuModel')
// const LessonModel = require('../db/models/lessonModel')
// const jwt = require('jsonwebtoken')
// const path = require('path')
// const fs = require('fs')
// const qs = require('querystring')

// //读取jwt密钥
// const secret = fs.readFileSync(path.join(__dirname,'../.env'),'utf8')

// //获取学生用户
// router.get('/stu',async (req,res) => {
//     let data = await StuModel.getStu();
//     res.send(data)
// })

// //学生登录
// router.post('/stu',async (req,res) => {
//     let {username, password} = req.body
//     let data = await StuModel.postStu(req.body);
//     if(data.length === 1){
//         res.send({
//             code:0,
//             msg:'ok',
//             data:{
//                 token:jwt.sign({userid:data[0].id,name:data[0].username},secret),
//                 lessonList:data[0].lessonList,
//                 avatar:data[0].avatar,
//                 name:data[0].username
//             },
//         })

//     }else{
//         res.send({
//             code:403,
//             msg:'用户名密码不正确',
//             data:{token:''}
//         })
//     }
// })
// //学生购买课程
// router.put('/stuaddlesson',async (req,res) => {
//     let {token,list} = req.body
//     let info = {username:jwt.verify(token,secret).name}
//     let ret = await StuModel.addStuLesson(info,{lessonList:list})
//     res.send(ret)
// })



// //获取后台课程
// router.get('/lesson',async (req,res) => {
//     let data = await LessonModel.getLesson();
//     res.send(data)
// })

// //获取课程详情
// router.post('/lessondetail',async (req,res) => {
//     let data = await LessonModel.getLesson(req.body);
//     res.send(data)
// })

// //添加课程
// router.post('/lesson',async (req,res) => {
//     let data = await LessonModel.addLesson(req.body);
//     res.send(data)
// })

// //删除课程
// router.delete('/lesson',async (req,res) => {
//     let data = await LessonModel.deleteLesson(req.body);
//     res.send(data)
// })


// module.exports = router