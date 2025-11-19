const express=require('express');
const router=express.Router();
const User=require('../models/user');
const wrapAsync = require('../utils/wrapAsync');
const passport = require('passport');
const {savedRedirectUrl}=require("../middleware");
const userController=require("../controllers/users")

router.route("/signup")
.get(userController.renderSignup)
.post(wrapAsync(userController.signUp)
);
 
router.route("/login")
.get(userController.renderLogin)
.post(savedRedirectUrl,passport.authenticate('local',{
    failureFlash:true,
    failureRedirect:'/login'
}),userController.login
);
router.get("/logout",userController.logout);
module.exports=router;