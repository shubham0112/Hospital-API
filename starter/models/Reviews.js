const mongoose=require('mongoose');

const ReviewSchema = new mongoose.Schema({
    hosp_id:{
        type:Number,
        required:[true,'Please provide hosp_id'],
    },
    text:{
        type:String,
        required:[true,'Please provide your review'],
        minlength:3,
        maxlength:500,
    },
    createdBy:{
        type:mongoose.Types.ObjectId,
        ref:'User',
        required:[true,'Please provide user']
    }
},{timestamps:true}
)

module.exports = mongoose.model('Reviews',ReviewSchema);