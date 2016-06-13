var router = require('express').Router();
var passport = require('passport');
var Verify = require('../verify');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var User = require('../models/user');

router.use(bodyParser.json());

router.post('/', Verify.verifyUser, Verify.getUserFromToken,
function(req, res){
    var username = req.decoded.payload._doc.username;
    var timeline = req.body.timeline;
    if(username){
        if(timeline){
            User.update({'username': username}, {timeline: timeline},
            function(err, raw){
                if (err) return handleError(err);
                console.log('The raw response from Mongo was ', raw);
                res.json({
                    saved:true
                });
            });
        }
    }
    
    
});

router.get('/', Verify.verifyUser, Verify.getUserFromToken, 
function(req, res){
    var username = req.decoded.payload._doc.username;
        if(username){
            User.findOne({'username' : req.decoded.payload._doc.username}, 'timeline', function(err, user){
                res.json({'timeline': user.timeline});
            });
            console.log(req.decoded.payload._doc.hash);
        }
});

router.get('/getName', Verify.verifyUser, Verify.getUserFromToken, 
function(req, res){
    var token = req.decoded.payload._doc.OauthToken;
        if(token){
            User.findOne({'OauthToken' : token}, 'username', function(err, user){
                res.json({
                    'oauthToken' : token,
                    'username': user.username
                });
            });

        }
});

module.exports = router;

