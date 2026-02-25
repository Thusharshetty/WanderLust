if(process.env.NODE_ENV!="production"){
    require('dotenv').config();
}
// console.log(process.env.SCERET);
const express=require('express');
const app=express();
const mongoose=require('mongoose');
const path=require("path");
const ejsMate=require('ejs-mate');
app.engine('ejs',ejsMate);
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"/views"));
app.use(express.urlencoded({ extended: true })); 
const methodOverride=require('method-override');
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname,"/public")));
const ExpressError=require('./utils/ExpressError');
const listingsRoutes=require('./Routes/listing');
const reviewsRoutes=require('./Routes/reviews');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');
const passport=require('passport');
const LocalStrategy=require('passport-local');
const User=require('./models/user');
const userRoutes=require('./Routes/user');


const dburl=process.env.ATLASDB_URL;

main().then(()=>console.log("connected to db")).catch(err=>console.log(err));

async function main(){
    await mongoose.connect(dburl);
}
const store=MongoStore.create({
    mongoUrl:dburl,
    touchAfter:24*3600
})
store.on("error",(e)=>{
    console.log("session store error",e);
})

const sessionOptions={
    store:store,
    secret:process.env.SECERT,
    resave:false,
    saveUninitialized:true,
    cookie:{
        expires: Date.now()+7*24*60*60*1000,
        maxAge:7*24*60*60*1000,
        httpOnly:true
    },
}





app.get('/',(req,res)=>{
   res.redirect('/listings');
});

app.use(session(sessionOptions));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req,res,next)=>{
    res.locals.success=req.flash('success');
     res.locals.error=req.flash('error');
     res.locals.currentUser=req.user;
    next();
})
app.use('/listings',listingsRoutes);
app.use('/listings/:id/reviews',reviewsRoutes);
app.use('/',userRoutes);

app.use((req,res,next)=>{
    next(new ExpressError(404,'Page Not Found'));
})
app.use((err,req,res,next)=>{
    let {statusCode=500, message='Something went wrong'}=err;
    res.status(statusCode).render("listings/error.ejs",{err});
});
 app.listen(8080,()=>{
    console.log("server is running on port 8080");
 });