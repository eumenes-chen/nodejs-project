const { Schema } = require('../connect');

const characterSchema = new Schema({
    name:{
        type:String,
        require:true,
    },
    birth:{
        type:Number,
    },
    death:{
        type:Number,
    },
    country:String,

})

module.exports = characterSchema