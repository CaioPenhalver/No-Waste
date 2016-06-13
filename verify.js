var User = require('./models/user.js');
var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
var config = require('./config.js');

//generates the token
exports.getToken = function (user) {
    return jwt.sign(user, config.secretKey, {
        expiresIn: "7d"//3600
    });
};


exports.verifyUser = function (req, res, next) {
    // check header or url parameters or post parameters for token
    var token = req.body.token || req.query.token || req.headers['x-access-token'];

    // decode token
    if (token) {
        // verifies secret and checks exp
        jwt.verify(token, config.secretKey, function (err, decoded) {
            if (err) {
                var err = new Error('You are not authenticated!');
                err.status = 401;
                return next(err);
            } else {
                // if everything is good, save to request for use in other routes
                req.decoded = decoded;
                //console.log('decoded variable:');
                //console.log(decoded);
                next();
            }
        });
    } else {
        // if there is no token
        // return an error
        var err = new Error('No token provided!');
        err.status = 403;
        return next(err);
    }
};

exports.getUserFromToken = function(req, res, next) {
    var token = req.body.token || req.query.token || req.headers['x-access-token'];
    
    if(token) {
        var decoded = jwt.decode(token, {complete: true});
        req.decoded = decoded;
        next();
    } else {
       return next(true);
    } 
}
