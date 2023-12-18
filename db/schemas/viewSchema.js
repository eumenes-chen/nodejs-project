const { Schema } = require('../connect');

const viewSchema = new Schema({
    name:{
        type:String,
        require:true,
    }
})

module.exports = viewSchema