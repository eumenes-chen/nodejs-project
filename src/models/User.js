const mongoose = require('../db/connect')

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
  },
  password: {
    type:String,
  }
})

const User = mongoose.model('User',UserSchema)
module.exports = { User }