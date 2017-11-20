const models = require('../models');
const express = require('express');
const bodyParser = require('body-parser');

const router = express.Router();
let Games = models.games;
let Games_History = models.game_history

router.use(bodyParser.json())


router.post('/', function(req, res){
    console.log('this is the req body from post game', req.body)
    const string_address = JSON.stringify(req.body.address_elements)
    Games
    .findOrCreate({where: {
        game_date: req.body.game_date,
        game_description: req.body.game_description ? req.body.game_description.match(/[\w!'# ]/g).join(''):'',
        game_title: req.body.game_title.match(/[\w!'# ]/g).join(''),
        game_vibe: req.body.game_vibe.match(/[\w]/g).join(''),
        longitude: req.body.lon,       
        latitude: req.body.lat, 
        zipcode: req.body.zip,
        city: req.body.city,
        fb_id: req.body.fb_id,
        address_elements: string_address,
        google_place_id: req.body.google_place_id,
        ball: req.body.ball,
        formatted_date: req.body.formatted_date
        }
    })
    .spread( (game, created) => {
        if(created) {
            console.log('this is the game before history', game, created)
            Games_History.findOrCreate( {where: {
                game_id: game.id,
                fb_id: req.body.fb_id,
                creator: 1
            }}).spread( (game_history, created) => {

            })
            let msg = 'Game Has Been Successfully Created!'       
            res.status(200).send({created, game, msg})
            return
        }
        let msg = 'Error, Game Not Created Please Try Again' 
        res.status(200).send({msg})
        return

    }) 
})

module.exports = router;