exports.sanitizeUser = user => ({id : user.id, role : user.role});

exports.sanitizeLoggedInUser = user => ({id : user.id, name : user.name, addresses : user.addresses})