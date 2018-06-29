var express = require('express');
var router = express.Router();
var db = require('../models');
var passport = require('passport');
require('../config/passport')(passport);


router.get('/', passport.authenticate('jwt', { session: false }), function (req, res, next) {
    var token = getToken(req.headers);
    if (token) {
        db.User.findAll({})
            .then(function (user) {
                res.json(user)
            });
        // .catch(function (error) {

        // })
    }
});

router.post('/', passport.authenticate('jwt', { session: false }), function (req, res, next) {
    var token = getToken(req.headers);
    if (token) {
        // TODO: Validate req.body.
        const newUser = req.body;
        db.User.create(req.body)
            .then(function (result) {
                console.log(result);
            });
        // .catch(function (error) {

        // })
    }
});

getToken = function (headers) {
    if (headers && headers.authorization) {
        var parted = headers.authorization.split(' ');
        if (parted.length === 2) {
            return parted[1];
        } else {
            return null;
        }
    } else {
        return null;
    }
};


module.exports = router;