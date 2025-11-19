const express=require('express');
const router=express.Router({mergeParams:true});
const Listing=require('../models/listing');
const wrapAsync=require('../utils/wrapAsync');
const multer = require('multer');
const upload = multer(); // Initialize multer
const Review=require('../models/review');
const {validateReview, isLoggedIn ,isauthor}=require("../middleware");
const reviewController=require("../controllers/review");


router.post('/' ,isLoggedIn,upload.none(),validateReview,wrapAsync(reviewController.createReview));

router.delete('/:reviewId',isLoggedIn,isauthor,wrapAsync(reviewController.destroyReview));

module.exports=router;