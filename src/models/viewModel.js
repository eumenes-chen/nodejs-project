

// const { model } = require('../db/connect');
// const viewSchema = require('../schemas/viewSchema');

// const viewModel = model('view',viewSchema,'viewlist');

// class ViewModel{
//     constructor(db){
//         this.db = viewModel;
//     }
//     getView(data={}){
//         console.log('data:',data);
//         return this.db.find(data)
//     }
//     addView(data){
//         let res =  this.db.insertMany(data)
//         return res;
//     }
//     deleteView(data){
//         return this.db.deleteOne({name:data.name})
//     }
//     deleteAllView(data){
//         return this.db.deleteMany({})
//     }
// }


// module.exports = new ViewModel()