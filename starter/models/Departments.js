const mongoose=require('mongoose');

const DepartmentSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,'Please provide name'],
        minlength:3,
        maxlength:50,
    }
})

module.exports = mongoose.model('Department',DepartmentSchema);