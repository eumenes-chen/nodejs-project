var express = require('express');
var router = express.Router();
const CharacterModel = require('../db/models/characterModel')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

//获取角色数据
router.get('/character',async (req,res) => {
  let data = await CharacterModel.getCharacter();
  res.send(data)
})

module.exports = router;
