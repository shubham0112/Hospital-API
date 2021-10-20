const express=require('express');
const router = express.Router();

const {getAllPics,createPic,deletePic,updatePic}=require('../controllers/gallery');

router.route('/').post(createPic).get(getAllPics); //we will send hospital id in req body
router.route('/').delete(deletePic).patch(updatePic); //we will send department id  (_id waala)

module.exports=router