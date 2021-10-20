const Doctor = require('../models/Doctors');
const {StatusCodes} = require('http-status-codes')
const {BadRequestError,NotFoundError} = require('../errors')

const getAllDoctors=async(req,res)=>{
    // return res.send('Get all doctors');

    //we are sending all doctors belonging to this hospital
    if(!req.body.id){
        throw new BadRequestError('Provide hospital id');
    }
    const doctors=await Doctor.find({hosp_id:req.body.id}); // it will be hosp id
    res.status(StatusCodes.OK).json({doctors,count:doctors.length});
}

const createDoctor=async(req,res)=>{
    // return res.send('Create doctor');
    const doctor=await Doctor.create(req.body); 
    res.status(StatusCodes.CREATED).json({doctor});
}
const deleteDoctor=async(req,res)=>{
    // return res.send('delete doctor');
    const {id}=req.body;

    const doctor=await Doctor.findByIdAndRemove({
        _id:id,
    })
    if(!doctor){
        throw new NotFoundError(`No doctor with id ${id}`)
    }
    res.status(StatusCodes.OK).send();
}
const updateDoctor=async(req,res)=>{
    // return res.send('update doctor');
    const {id}=req.body;
    if(!id ){
        throw new BadRequestError(`Provide value of doctor id`);
    }
    const doctor=await Doctor.findByIdAndUpdate(
        {_id:id},
        req.body,
        {new:true,runValidators:true}
    )
    if(!doctor){
        throw new BadRequestError(`No doctor found`);
    }
    res.status(StatusCodes.OK).json(doctor);
}

module.exports={
    getAllDoctors,
    createDoctor,
    deleteDoctor,
    updateDoctor
}