const models = require('../models');
const express = require('express');
const bodyParser = require('body-parser');

const router = express.Router();

let Games_History = models.game_history;
const Games = models.games;

router.use(bodyParser.json())

/**
 * @module join_game_routes
 * @function
 * @param {Object} req client request object to add user association to a game on the games_history table
 * @param {Object} res server response object with database response
 * @returns {Object} object with boolean on association creation with success or failure message
 */

router.post('/', (req, res) => {
    Games_History.findOrCreate( {where: {
        game_id: req.body.selected_game.id,
        fb_id: req.body.joining_fb_id,
        creator: req.body.selected_game.fb_id === req.body.joining_fb_id ? 1:0
    }}).spread( (game_joined, created) => {
        const msg = created ? 'Game Has Been Successfully Joined!':'Error, Game Not Joined Please Try Again'        
        res.send({created, game_joined, msg})
    })
})

module.exports = router