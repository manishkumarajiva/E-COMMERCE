const jwt = require('jsonwebtoken');

exports.sanitizeUser = user => ({id : user.id, role : user.role});


exports.generateToken = async (user) => {
    const payload = {
        id : user.id,
        role : user.role
    }

    const secretKey = 'skeecyrset';

    const options = {
        expiresIn : "1d",
        issuer : 'MKD'
    }

    const token = await jwt.sign(payload, secretKey, options);
    return token;
}

