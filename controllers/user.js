const User = require("../models/user.js");

module.exports.renderSignupForm = (req,res) => {
    res.render("./users/signup.ejs");
};


module.exports.signupUser = async(req,res) => {
    try{
    let {username, email, password} = req.body;
    const newUser = new User({username , email});
    const registeredUser = await User.register(newUser, password);

    req.login(registeredUser, (err) => {
        if(err){
            return next(err);
        }
        req.flash("success", "Welcome to ExploreWorld");
        res.redirect("/listings");
    });
   
} catch(err){
    req.flash("error", `${err.message}`);
    res.redirect("/signup");
};
};


module.exports.renderLoginForm = (req,res) => {
    res.render("./users/login.ejs");
};


module.exports.loginUser = (req,res) => {
    req.flash("success", "Welcome back to Exploreworld");
    let redirectUrl = res.locals.redirectUrl || "/listings" ;
    res.redirect(redirectUrl);

};

module.exports.logoutUser =  (req,res,next) => {
    req.logout((err) => {
        if(err){
           return next(err);
        }
        req.flash("success", "you are logged out");
        res.redirect("/listings");
    });
};