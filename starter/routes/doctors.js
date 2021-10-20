const express=require('express');
const router = express.Router();

const {getAllDoctors,createDoctor,deleteDoctor,updateDoctor}=require('../controllers/doctors');

router.route('/').post(createDoctor).get(getAllDoctors); //we will send hospital id in req body
router.route('/').delete(deleteDoctor).patch(updateDoctor); //we will send department id  (_id waala)

module.exports=router