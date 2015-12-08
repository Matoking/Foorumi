var express = require('express');
var router = express.Router();

var authentication = require('../utils/authentication');
var Models = require('../models');

// Huom! Kaikki polut alkavat polulla /topics

// GET /topics
router.get('/', function (req, res, next) {
    Models.Topic.findAll().then(function (topics) {
        res.send(topics);
    });
});

// GET /topics/:id
router.get('/:id', function (req, res, next) {
    // Hae aihealue tällä id:llä tässä (Vinkki: findOne)
    var topicId = req.params.id;

    Models.Topic.findOne({where: {id: topicId},
                          include: {model: Models.Message}}).then(function (topic) {
        if (topic === null) {
            res.sendStatus(400);
            return;
        }
        
        res.send(topic);
    });
});

// POST /topics
router.post('/', function (req, res, next) {
    // Lisää tämä aihealue
    var topicToAdd = req.body;
    
    if (!("name" in topicToAdd) || !("description" in topicToAdd)) {
        res.sendStatus(400);
        return;
    }
    
    Models.Topic.create({name: topicToAdd.name,
                         description: topicToAdd.description}).then(function (topic) {
        res.send(topic);
    });
});

// POST /topics/:id/message
router.post('/:id/message', function (req, res, next) {
    // Lisää tällä id:llä varustettuun aihealueeseen...
    var topicId = req.params.id;
    // ...tämä viesti (Vinkki: lisää ensin messageToAdd-objektiin kenttä TopicId, jonka arvo on topicId-muuttujan arvo ja käytä sen jälkeen create-funktiota)
    var messageToAdd = req.body;
    
    if (!("title" in messageToAdd) || !("content" in messageToAdd)) {
        console.log("Necessary fields missing");
        res.sendStatus(400);
        return;
    }
    
    Models.Topic.findOne({where: {id: topicId}}).then(function(topic) {
        if (topic === null) {
            console.log("Topic not found");
            res.sendStatus(400);
            return;
        }
        
        Models.Message.create({TopicId: topicId,
                               title: messageToAdd.title,
                               content: messageToAdd.content}).then(function(message) {
            res.send(message);
        });
    });
});

module.exports = router;
