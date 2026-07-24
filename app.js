if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}
const express=require("express");
const app=express();
const mongoose=require("mongoose");
const path=require("path");
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}));
const methodoverride=require("method-override");
app.use(methodoverride("_method"));
const engine=require('ejs-mate');
app.engine('ejs',engine);
const mongoUrl=process.env.MONGO_URI;
app.use(express.static(path.join(__dirname,"/public"))); 
const reviewsRouter=require("./routes/review.js");
const listingRouter= require("./routes/listing.js");
const userRouter=require("./routes/user.js");
const session=require("express-session");
const flash=require("connect-flash");
const passport=require("passport");
const LocalStrategy=require("passport-local");
const User=require("./models/user.js");


const sessionOptions={
    secret:process.env.SESSION_SECRET,
    resave:false,
    saveUninitialized:true,
    cookie:{
        expires:Date.now()+1000*60*60*24*7,
        maxAge:1000*60*60*24*7,
        httpOnly:true,
    }
};

app.use(session(sessionOptions));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());   

async function main(){
    await mongoose.connect(mongoUrl);
}
const wrapAsync=require("./utils/wrapAsyn.js");
const ExpressError=require("./utils/ExpressErrors.js");
const handleValidationErr = err => {
    return new ExpressError(400, err.message);
};
main()
.then(()=>{
    console.log("connected to db");
})
.catch((err)=>{
    console.log(err);
});

app.get("/",(req,res)=>{
    res.send("everything is working");
})
app.use((req,res,next)=>{ 
    res.locals.success=req.flash("success");
    res.locals.error=req.flash("error");
    res.locals.currentUser=req.user;
    next();
});

// app.get("/demouser", async(req,res)=>{
//     let fakeuser=new User({
//         email:"student@gmai.com",
//         username:"student"
//     });
//   let  registerUser=await User.register(fakeuser,"password");
//    res.send(registerUser);
// })



 app.use("/listings",listingRouter);
 app.use("/listings/:id/reviews",reviewsRouter); 
 app.use("/",userRouter);

// Catch-all for any unmatched route to generate a 404
app.use((req, res, next) => {
    next(new ExpressError(404, "Page Not Found"));
});

app.use((err, req, res, next) => {
    let { statusCode = 500, message = "something went wrong" } = err;
    res.status(statusCode).render("listings/error.ejs", { err });
});
if (process.env.NODE_ENV !== "production") {
    app.listen(8080, () => {
        console.log("listing port 8080");
    });
}

module.exports = app;