module.exports= async function(req, res, next){
    if(!req.cookies.token){
        req.flash("error","you must be logged in to access this page");
        return res.redirect('/');
    }
    try{
        let decoded= jwt.verify(req.cookies.token, process.env.JWT_SECRET_KEY);
    let user= await userModel.
    findOne({email:decoded.email})
    .select("-password");
    req.user=user;
    next();

  }
  catch(err){
    req.flash("error","you must be logged in to access this page");

    return res.redirect('/');
  } 
};