const Department = require('../models/Departments');
const {StatusCodes} = require('http-status-codes')
const {BadRequestError,NotFoundError} = require('../errors')

const getAllDepartments=async(req,res)=>{
    //we are sending all departments belonging to this hospital
    // return res.send('Get all department');
    if(!req.body.id){
        throw new BadRequestError('Provide hospital id');
    }
    const departments=await Department.find({hosp_id:req.body.id}); // it will be hosp id
    res.status(StatusCodes.OK).json({departments,count:departments.length});
}

const createDepartment=async(req,res)=>{
    // res.send('Create department');
    const department=await Department.create(req.body); 
    res.status(StatusCodes.CREATED).json({department});
}
const deleteDepartment=async(req,res)=>{
    const {id}=req.body;

    const department=await Department.findByIdAndRemove({
        _id:id,
    })
    if(!department){
        throw new NotFoundError(`No department with id ${id}`)
    }
    res.status(StatusCodes.OK).send();
}
const updateDepartment=async(req,res)=>{
    const {id,hosp_id,dept}=req.body;
    if(!id || !hosp_id || !dept){
        throw new BadRequestError(`Provide id,hosp_id and department values`);
    }
    const department=await Department.findByIdAndUpdate(
        {_id:id,hosp_id:hosp_id},
        req.body,
        {new:true,runValidators:true}
    )
    if(!department){
        throw new BadRequestError(`No department found`);
    }
    res.status(StatusCodes.OK).json(department);
}

module.exports={
    getAllDepartments,
    createDepartment,
    updateDepartment,
    deleteDepartment
}