var express = require('express');
var router = express.Router();
const CharacterModel = require('../models/characterModel')
const ViewModel = require('../models/viewModel')
const qs = require('qs')
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
  let data = await CharacterModel.character();
  res.send(dataHandler(data))
})
//通过姓名数组获取大量角色
router.post('/getcharacter', async (req, res) => {
  console.log('前打印：',req.body);
  let params = req.body.list
  let data = await CharacterModel.getCharacter(params);
  res.send(dataHandler(data))
})
// 根据关键词查询角色
router.post('/searchCharacter', async (req, res) => {
  let params = req.body.str
  let data = await CharacterModel.searchCharacter(params);
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

//获取name数据
router.get('/view', async (req, res) => {
  let data = await ViewModel.getView();
  res.send(dataHandler(data))
})
//添加name
router.post('/addview', async (req, res) => {
  let data = await ViewModel.addView(req.body);
  res.send(dataHandler(data))
})
//删除name
router.post('/deleteview', async (req, res) => {
  let data = await ViewModel.deleteView(req.body);
  res.send(dataHandler(data))
})
//删除全部name
router.post('/deleteallview', async (req, res) => {
  let data = await ViewModel.deleteAllView();
  res.send(dataHandler(data))
})


module.exports = router;