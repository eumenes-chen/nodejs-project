const { model } = require('../connect');
const viewSchema = require('../schemas/viewSchema');

const viewModel = model('view',viewSchema,'viewlist');

class ViewModel{
    constructor(db){
        this.db = viewModel;
    }
    getView(data={}){
        return this.db.find(data)
    }
    addView(data){
        return this.db.insertMany(data)
    }
    deleteView(data){
        return this.db.deleteOne({name:data.name})
    }
    deleteAllView(data){
        return this.db.deleteMany({})
    }
}


module.exports = new ViewModel()