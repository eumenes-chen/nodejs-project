var express = require('express');
var router = express.Router();
const CharacterModel = require('../models/characterModel')
// const ViewModel = require('../models/viewModel')
// const qs = require('qs')
// const queryString = require('query-string')

const dataHandler = (data) => {
  return {
    code:'200',
    msg:'success',
    data:data
  }
}

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

//获取角色数据
router.get('/character', async (req, res) => {
  let query = req.query
  console.log('获取',query);
  let list = await CharacterModel.character(query);
  let total = await CharacterModel.totalCharacter()
  let data = {list,total}
  res.send(dataHandler(data))
})
//通过姓名数组获取大量角色
router.post('/getcharacter', async (req, res) => {
  let params = req.body.list
  let data = await CharacterModel.getCharacter(params);
  res.send(dataHandler(data))
})
// 根据关键词查询角色
router.post('/searchcharacter', async (req, res) => {
  let params = req.body.str
  let list = await CharacterModel.searchCharacter(params);
  let total = await CharacterModel.totalCharacter(params)
  let data = {list,total}
  res.send(dataHandler(data))
})
//添加角色
router.post('/addcharacter', async (req, res) => {
  let data = await CharacterModel.addCharacter(req.body);
  res.send(dataHandler(data))
})
//编辑角色
router.post('/editcharacter', async (req, res) => {
  let data = await CharacterModel.editCharacter(req.body);
  res.send(dataHandler(data))
})
//删除角色
router.post('/deletecharacter', async (req, res) => {
  let data = await CharacterModel.deleteCharacter(req.body);
  res.send(dataHandler(data))
})
// 增加展示在框中的角色
router.post('/addviewcharacter',async (req,res) => {
  let data = await CharacterModel.addViewCharacter(req.body);
  res.send(dataHandler(data))
})
// 移除展示在框中的角色
router.post('/deleteviewcharacter',async (req,res) => {
  let data = await CharacterModel.deleteViewCharacter(req.body);
  res.send(dataHandler(data))
})
// 清空展示在框中的角色
router.post('/clearviewcharacter',async (req,res) => {
  let data = await CharacterModel.clearViewCharacter();
  res.send(dataHandler(data))
})


module.exports = router;