var express = require('express');
var router = express.Router();

var Models = require('../models');

// Huom! Kaikki polut alkavat polulla /users

// POST /users
router.post('/', function (req, res, next) {
    // Lisää tämä käyttäjä (Vinkki: create), muista kuitenkin sitä ennen varmistaa, että käyttäjänimi ei ole jo käytössä! (Vinkki: findOne)
    var userToAdd = req.body;

    Models.User.findOne({where: {username: userToAdd.username}}).then(function(user) {
        if (user !== null) {
            res.status(400).json({error: "Käyttäjätunnus on jo käytössä!"});
            return;
        } else {
            Models.User.create({username: userToAdd.username,
                                password: userToAdd.password}).then(function (newUser) {
                res.send(newUser);
            });
        }
    });
});

// POST /users/authenticate
router.post('/authenticate', function (req, res, next) {
    // Tarkista käyttäjän kirjautuminen tässä. Tee se katsomalla, löytyykö käyttäjää annetulla käyttäjätunnuksella ja salasanalla (Vinkki: findOne ja sopiva where)
    var userToCheck = req.body;
    
    if (userToCheck === null || !("username" in userToCheck) || !("password" in userToCheck)) {
        res.sendStatus(403);
        return;
    }
    
    Models.User.findOne({where: {username: userToCheck.username,
                                 password: userToCheck.password}}).then(function(user) {
        if (user !== null) {
            req.session.userId = user.id;
            res.send(user);
        } else {
            res.sendStatus(403);
        }
    });
});

// GET /users/logged-in
router.get('/logged-in', function (req, res, next) {
    var loggedInId = req.session.userId ? req.session.userId : null;

    if (loggedInId == null) {
        res.json({});
    } else {
        Models.User.findOne({where: {id: loggedInId}}).then(function(user) {
            res.send(user);
        });
    }
});

// GET /users/logout
router.get('/logout', function (req, res, next) {
    req.session.userId = null;

    res.sendStatus(200);
});

module.exports = router;
