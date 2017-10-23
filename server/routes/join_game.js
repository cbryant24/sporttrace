const models = require('../models');
const express = require('express');
const bodyParser = require('body-parser');

const router = express.Router();
debugger
let Games_History = models.game_history;

router.use(bodyParser.json())

router.post('/', (req, res) => {
    console.log('this is the join game server req', req.body)
    Games_History.findOrCreate( {where: {
        game_id: req.body.game_id,
        fb_id: req.body.fb_id
    }}).spread( (game_joined, created) => {
        if(created) res.send(created)
    })
})

module.exports = router