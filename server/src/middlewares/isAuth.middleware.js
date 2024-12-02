exports.isAuth = (req, res, next) => {
    if(req.user){
        next();
    }else{
        res.send(401);
    }
}

