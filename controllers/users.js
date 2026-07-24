const User=require("../models/user");


module.exports.renderSignUpForm=(req,res)=>{
    res.render("users/signup.ejs");
};

module.exports.signUp=async(req,res)=>{
    try{
     let {username,email,password}=req.body;
    const newUser=new User({username,email});
    const registeredUser=await User.register(newUser,password); 
     req.login(registeredUser,(err)=>{
        if(err){
            return next(err);
        }   
    req.flash("success","Welcome to Wanderlust!");
    res.redirect("/listings"); 
    });
}
    catch(e){
        req.flash("error",e.message);
        res.redirect("/signup");
    }

};

module.exports.renderLoginForm=(req,res)=>{
    res.render("users/login.ejs");
};

module.exports.Login= async (req,res)=>{
   req .flash("success","Welcome Back!");    
   res.redirect(res.locals.redirectUrl || "/listings" );
};

module.exports.renderLogout=(req,res)=>{
    res.render("users/logout.ejs");
};

module.exports.logout=(req,res,next)=>{
    req.logout((err)=>{
        if(err){            
            return next(err);   
        };
        req.flash("success","Logged Out Successfully!");
         res.redirect("/listings");
    });
    };