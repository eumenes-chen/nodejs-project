

const { Schema } = require('../db/connect.js');
const characterSchema = new Schema({
    name: {
        type: String,
        require: true,
    },
    birth: {
        type: Number,
    },
    death: {
        type: Number,
    },
    country: {
        type: String
    }
})



module.exports = characterSchema