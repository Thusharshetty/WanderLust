const express=require('express');
const router=express.Router();
const Listing=require('../models/listing');
const wrapAsync=require('../utils/wrapAsync');
const {isLoggedIn, isOwner}=require("../middleware");
const {validaeListing}=require("../middleware");
const listingControllers=require("../controllers/listing");
const multer=require('multer');
const{storage}=require('../cloudConfig');
const upload=multer({storage})

router.route("/")
.get(wrapAsync(listingControllers.index))
.post(isLoggedIn,upload.single('listing[image]'),validaeListing,wrapAsync(listingControllers.createListing));


router.get('/new',isLoggedIn,listingControllers.renderNewform);

router.route("/:id")
.get(wrapAsync(listingControllers.showListing))
.put(isLoggedIn,isOwner,upload.single('listing[image]'),validaeListing,wrapAsync(listingControllers.updateListing))
.delete(isLoggedIn,isOwner,wrapAsync(listingControllers.destroyListing));


router.get('/:id/edit',isOwner,isLoggedIn,wrapAsync(listingControllers.renderEditform));

module.exports=router;