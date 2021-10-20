const Gallery = require('../models/Gallery');
const {StatusCodes} = require('http-status-codes')
const {BadRequestError,NotFoundError} = require('../errors')

const getAllPics=async(req,res)=>{
    // return res.send('Get all pics');

    //we are sending all doctors belonging to this hospital
    if(!req.body.id){
        throw new BadRequestError('Provide hospital id');
    }
    const pics=await Gallery.find({hosp_id:req.body.id}); // it will be hosp id
    res.status(StatusCodes.OK).json({pics,count:pics.length});
}

const createPic=async(req,res)=>{
    // return res.send('Create Pic');
    const pic=await Gallery.create(req.body); 
    res.status(StatusCodes.CREATED).json({pic});
}
const deletePic=async(req,res)=>{
    // return res.send('delete pic');
    const {id}=req.body;

    const pic=await Gallery.findByIdAndRemove({
        _id:id,
    })
    if(!pic){
        throw new NotFoundError(`No pic with id ${id}`)
    }
    res.status(StatusCodes.OK).send();
}
const updatePic=async(req,res)=>{
    // return res.send('update pic');
    const {id}=req.body;
    if(!id ){
        throw new BadRequestError(`Provide value of doctor id`);
    }
    const pic=await Gallery.findByIdAndUpdate(
        {_id:id},
        req.body,
        {new:true,runValidators:true}
    )
    if(!pic){
        throw new BadRequestError(`No pic found`);
    }
    res.status(StatusCodes.OK).json(pic);
}

module.exports={
    getAllPics,
    createPic,
    deletePic,
    updatePic
}