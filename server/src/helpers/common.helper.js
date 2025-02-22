exports.sanitizeUser = user => ({id : user._id, role : user.role});

// exports.sanitizeLoggedInUser = user => ({id : user._id, name : user.name, role : user.role, email : user.email, addresses : user.addresses})



exports.cookieExtractor = function(req) {
    let token = null;
    if (req && req.cookies) {
        token = req.cookies['token'];
    }
    return token;
};

