const models = require('../models');
const express = require('express');
const bodyParser = require('body-parser');

const router = express.Router();

sequelize = models.sequelize;

router.use(bodyParser.json())

router.post('/', (req, res) => {
    console.log('this is the request body from history route', req.body)
    sequelize.query(`SELECT * FROM \`games\` JOIN \`game_history\` ON games.id = game_history.game_id WHERE game_history.fb_id = ${req.body.fb_id}`, { type: sequelize.QueryTypes.SELECT})
        .then( (games) => {
            res.send(games)
            console.log(games)
        })
})

module.exports = router;