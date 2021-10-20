const Review = require('../models/Reviews');
const {StatusCodes} = require('http-status-codes')
const {BadRequestError,NotFoundError, UnauthenticatedError} = require('../errors')

const getAllReviews=async(req,res)=>{
    // return res.send('Get all reviews');

    //we are sending all reviews belonging to this hospital
    if(!req.body.id){
        throw new BadRequestError('Provide hospital id');
    }
    const reviews=await Review.find({hosp_id:req.body.id}); // it will be hosp id
    res.status(StatusCodes.OK).json({reviews,count:reviews.length});
}

const createReview=async(req,res)=>{
    // return res.send("Create");
    //req is getting 'user' object from the auth middleware if token is verified
    //req mein hosp_id add karke bhejna front end se

    req.body.createdBy = req.user.userId; //we add one more property
    console.log(req.body);
    const review=await Review.create(req.body); //then create
    res.status(StatusCodes.CREATED).json({review});
}
const deleteReview=async(req,res)=>{
    const {body:{id},user:{userId}}=req;  //id of that review (_id) (to be added by the front end)
    if(!id || !userId ){
        throw new BadRequestError(`Provide value of review id and user id`);
    }

    let review=await Review.findById(id);

    if(!review){
        throw new BadRequestError(`No review found`);
    }
    
    if(review.createdBy != userId){
        throw new UnauthenticatedError("Not authorized to delete this review");
    }

    const deleted_review=await Review.deleteOne({_id:id});

    res.status(StatusCodes.OK).send();
}
const updateReview=async(req,res)=>{
    const {body:{id},user:{userId}}=req;  //id of that review (_id) (to be added by the front end)
    if(!id || !userId ){
        throw new BadRequestError(`Provide value of review id and user id`);
    }

    let review=await Review.findById(id);

    if(!review){
        throw new BadRequestError(`No review found`);
    }

    if(review.createdBy != userId){
        throw new UnauthenticatedError("Not authorized to update this review");
    }

    const updated_review=await Review.updateOne({_id:id},req.body,
        {new:true,runValidators:true});

    res.status(StatusCodes.OK).json({updated_review});
}

module.exports={
    getAllReviews,
    createReview,
    deleteReview,
    updateReview
}