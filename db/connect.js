const mongoose = require('mongoose');
const { host,opts } =require('../config/mongodb');
mongoose.connect(host,opts).then(res=>console.log('成功连接mongodb'))

module.exports = mongoose