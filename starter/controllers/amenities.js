const Amenity = require('../models/Amenity');
const {StatusCodes} = require('http-status-codes')
const {BadRequestError,NotFoundError} = require('../errors')

const getAllAmenities=async(req,res)=>{
    // return res.send('Get all amenities');

    //we are sending all amenities belonging to this hospital
    if(!req.body.id){
        throw new BadRequestError('Provide hospital id');
    }
    const amenities=await Amenity.find({hosp_id:req.body.id}); // it will be hosp id
    res.status(StatusCodes.OK).json({amenities,count:amenities.length});
}

const createAmenity=async(req,res)=>{
    // return res.send('Create amenity');
    const amenity=await Amenity.create(req.body); 
    res.status(StatusCodes.CREATED).json({amenity});
}
const deleteAmenity=async(req,res)=>{
    // return res.send('delete amenity');
    const {id}=req.body;

    const amenity=await Amenity.findByIdAndRemove({
        _id:id,
    })
    if(!amenity){
        throw new NotFoundError(`No amenity with id ${id}`)
    }
    res.status(StatusCodes.OK).send();
}
const updateAmenity=async(req,res)=>{
    // return res.send('update amenity');
    const {id}=req.body;
    if(!id ){
        throw new BadRequestError(`Provide value of amenity id`);
    }
    const amenity=await Amenity.findByIdAndUpdate(
        {_id:id},
        req.body,
        {new:true,runValidators:true}
    )
    if(!amenity){
        throw new BadRequestError(`No amenity found`);
    }
    res.status(StatusCodes.OK).json(amenity);
}

module.exports={
    getAllAmenities,
    createAmenity,
    deleteAmenity,
    updateAmenity
}