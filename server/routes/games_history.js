const models = require('../models');
const express = require('express');
const bodyParser = require('body-parser');

const router = express.Router();

sequelize = models.sequelize;

router.use(bodyParser.json())

router.post('/', (req, res) => {
    sequelize.query(`SELECT * FROM \`games\` JOIN \`game_history\` ON games.id = game_history.game_id WHERE game_history.fb_id = ${req.body.fb_id}`, { type: sequelize.QueryTypes.SELECT})
        .then( (games) => {
            games.forEach( game => game.formatted_date = new Date(game.game_date).toLocaleString().replace(/:\d+(?= ) /, '').toLowerCase())
            console.log('this is the tble_games object', games)            
            res.send({games, resp: true})
        })
})

module.exports = router;