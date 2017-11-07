const models = require('../models');
const express = require('express');
const bodyParser = require('body-parser');

const router = express.Router();
debugger
let Games_History = models.game_history;
const Games = models.games;

router.use(bodyParser.json())

router.post('/', (req, res) => {
    Games_History.findOrCreate( {where: {
        game_id: req.body.selected_game[0].id,
        fb_id: req.body.joining_fb_id,
        creator: req.body.selected_game[0].fb_id === req.body.joining_fb_id ? 1:0
    }}).spread( (game_joined, created) => {
        const message = created ? 'Game Has Been Successfully Joined!':'Error, Game Not Joined Please Try Again'
        res.send({created, game_joined, message})
    })
    
})

module.exports = router