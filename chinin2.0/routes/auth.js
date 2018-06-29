var db = require('../models');
var passport = require('passport');
var settings = require('../config/settings');
require('../config/passport')(passport);
var express = require('express');
var jwt = require('jsonwebtoken');
var router = express.Router();
var bcrypt = require('bcrypt-nodejs');

//Post to login
router.post('/register', function (req, res) {
    if (!req.body.email || !req.body.password) {
        res.json({ success: false, msg: 'Please pass email, full name and password.' });
    } else {

        db.User.findOne({
            where: {
                email: req.body.email
            }
        }).then(function () {
            if (user) {
                return res.json({ success: true, msg: 'Email already exist.' });
            }

            var newUser = new User({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                password: req.body.password,
                email: req.body.email,
                image: req.body.image
            });

            // save the user
            db.User.create(newUser)
                .then(function (user) {
                    if (!user) {
                        return res.json({ success: true, msg: 'Successful created new user.' });
                    }
                })
                .catch(function (err) {
                    return res.json({ success: false, msg: 'Something went wrong' });
                })
        })
    }
});

router.post('/login', function (req, res) {
    User.findOne({
        where: {
            email: req.body.email
        }
    }).then(function (err, user) {
        if (err) throw err;

        if (!user) {
            return res.status(401).send({ success: false, msg: 'Authentication failed. User not found.' });
        } else {
            // check if password matches
            const doPasswordsMatch = user.comparePassword(req.body.password, user.password);
            if (!doPasswordsMatch) {
                return res.status(401).send({ success: false, msg: 'Authentication failed. Wrong Passwprd.' });
            }

        }
    });
});

module.exports = router;