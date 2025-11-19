
const Listing=require('./models/listing');
const Review=require('./models/review');
const ExpressError=require('./utils/ExpressError');
const {listingSchema}=require('./schema');
const {reviewSchema}=require('./schema');

module.exports.isLoggedIn=(req,res,next)=>{
    if(!req.isAuthenticated()){
        req.session.redirectUrl=req.originalUrl;
        req.flash('error','You must be signed in first!');
        return res.redirect('/login');
    }
    next();
}
module.exports.savedRedirectUrl=(req,res,next)=>{
    if(req.session.redirectUrl){
        res.locals.redirectUrl=req.session.redirectUrl;
    }
    next();
}
module.exports.isOwner=async(req,res,next)=>{
    const {id}=req.params;
    const listing=await Listing.findById(id);
    if(!listing.owner.equals(res.locals.currentUser._id)){
        req.flash('error','You do not have permission to do that!');
        return res.redirect(`/listings/${id}`);
    }
    next();
}

module.exports.validaeListing=(req,res,next)=>{
    let {error}=listingSchema.validate(req.body);
    if(error){
        let msg=error.details.map(el=>el.message).join(',');
        throw new ExpressError(400,msg);
    }else{
        next();
    }
}

module.exports. validateReview=(req,res,next)=>{
    let {error}=reviewSchema.validate(req.body);
    if(error){
        let msg=error.details.map(el=>el.message).join(',');
        throw new ExpressError(400,msg);
    }else{
        next();
    }
}

module.exports.isauthor=async(req,res,next)=>{
    const {id ,reviewId}=req.params;
    const review=await Review.findById(reviewId);
    if(!review.author.equals(res.locals.currentUser._id)){
        req.flash('error','you are not the author of this review!');
        return res.redirect(`/listings/${id}`);
    }
    next();
}