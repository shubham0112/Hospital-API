const express=require('express');
const router = express.Router();

const {getAllDepartments,createDepartment,deleteDepartment,updateDepartment}=require('../controllers/departments');

router.route('/').post(createDepartment).get(getAllDepartments); //we will send hospital id in req body
router.route('/').delete(deleteDepartment).patch(updateDepartment); //we will send department id  (_id waala)

module.exports=router