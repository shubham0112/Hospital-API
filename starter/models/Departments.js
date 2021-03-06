const mongoose=require('mongoose');

const DepartmentSchema = new mongoose.Schema({
    hosp_id:{
        type:Number,
        required:[true,'Please provide hosp_id'],
    },
    dept:{
        type:String,
        required:[true,'Please provide department'],
        minlength:3,
        maxlength:50,
    }
})

module.exports = mongoose.model('Department',DepartmentSchema);