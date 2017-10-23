const models = require('../models');
const express = require('express');
const bodyParser = require('body-parser');

const router = express.Router();
let Games = models.games;
debugger

router.use(bodyParser.json())


router.post('/', function(req, res){
    
    console.log('this is the body req parsed', req.body);
    Games
    .findOrCreate({where: {
        game_time: req.body.game_time,
        game_date: req.body.game_date,
        game_description: req.body.game_description,
        game_title: req.body.game_title,
        game_vibe: req.body.game_vibe,
        longitude: req.body.lon,        
        latitude: req.body.lat,
        zipcode: req.body.zip,
        ball: req.body.ball,
        fb_id: req.body.user_id
        }
    })
    .spread( (game, created) => {
        console.log('this is saying if its been created yet', game)
        if(created) return res.send({game, created})
        res.send(game)
    }) 
    // res.send(JSON.stringify(table));
})



module.exports = router;