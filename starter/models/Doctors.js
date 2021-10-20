const mongoose=require('mongoose');

const DoctorSchema = new mongoose.Schema({
    hosp_id:{
        type:Number,
        required:[true,'Please provide hosp_id'],
    },
    name:{
        type:String,
        required:[true,'Please provide name'],
        minlength:3,
        maxlength:50,
    },
    img:{
        type:String,
    },
    specialization:{
        type:String,
        required:[true,'Please provide specialization'],
    },
    experience:{
        type:Number,
        required:[true,'Please provide years of experience'],
    }
})

module.exports = mongoose.model('Doctor',DoctorSchema);