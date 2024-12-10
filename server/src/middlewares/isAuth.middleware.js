const passport = require("passport");

exports.isAuth = (req, res, done) => {
    if(req.user){
        done();
    }else{
        res.send(401);
    }
}


exports.isAuthToken = async (req, res, done) => {
    await passport.authenticate('jwt');
    done()
}






