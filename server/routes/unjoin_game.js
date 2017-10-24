const models = require('../models');
const express = require('express');
const bodyParser = require('body-parser');

const router = express.Router();
debugger
let Games_History = models.game_history;

router.use(bodyParser.json())

router.post('/', (req, res) => {
    console.log('this is the unjoin game server req', req.body)
    Games_History.destroy( { where: {id: req.body.game_id, fb_id: req.body.fb_id}})
        .then( data => {
            res.send(true);
            console.log('the data is hopefully gone', data)
        })
})

module.exports = router