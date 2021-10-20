const mongoose=require('mongoose');

const AmenitySchema = new mongoose.Schema({
    hosp_id:{
        type:Number,
        required:[true,'Please provide hosp_id'],
    },
    amenity:{
        type:String,
        required:[true,'Please provide name'],
        minlength:3,
        maxlength:50,
    }
})

module.exports = mongoose.model('Amenity',AmenitySchema);