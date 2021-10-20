const express=require('express');
const router = express.Router();
const authenticationUser=require('../middleware/authentication');

const {getAllReviews,createReview,deleteReview,updateReview}=require('../controllers/review');

router.route('/').post(authenticationUser,createReview).get(getAllReviews); //we will send hospital id in req body
router.route('/').delete(authenticationUser,deleteReview).patch(authenticationUser,updateReview); //we will send department id  (_id waala)

module.exports=router