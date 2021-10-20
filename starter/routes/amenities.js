const express=require('express');
const router = express.Router();

const {getAllAmenities,createAmenity,deleteAmenity,updateAmenity}=require('../controllers/amenities');

router.route('/').post(createAmenity).get(getAllAmenities); //we will send hospital id in req body
router.route('/').delete(deleteAmenity).patch(updateAmenity); //we will send department id  (_id waala)

module.exports=router