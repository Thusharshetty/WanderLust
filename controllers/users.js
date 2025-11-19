const User=require('../models/user');
module.exports.renderSignup=(req,res)=>{
    res.render("user/signup.ejs");
}

module.exports.signUp=async(req,res,next)=>{
    try{
    let {username,email,password}=req.body;
    const newUser=new User({username,email});
    const registeredUser=await User.register(newUser,password);
    console.log(registeredUser);
    req.login(registeredUser,(err)=>{
        if(err)return next(err);
        req.flash('success','Welcome to Wanderlust!');
        res.redirect('/listings');
    })
    }catch(e){
        req.flash('error',e.message);
        res.redirect('/signup');
    }
};

module.exports.renderLogin=(req,res)=>{
    res.render("user/login.ejs");
}

module.exports.login=(req,res)=>{
    req.flash('success','Welcome back to Wanderlust!');
    res.redirect(res.locals.redirectUrl || '/listings');
}

module.exports.logout=(req,res,next)=>{
    req.logout((err)=>{
        if(err){
            return next(err);
        }
        req.flash('success','you have logged out successfully!');
        res.redirect('/listings');
    })
}