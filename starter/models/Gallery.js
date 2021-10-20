const mongoose=require('mongoose');

const GallerySchema = new mongoose.Schema({
    hosp_id:{
        type:Number,
        required:[true,'Please provide hosp_id'],
    },
    img:{
        type:String,
    },
})

module.exports = mongoose.model('Gallery',GallerySchema);