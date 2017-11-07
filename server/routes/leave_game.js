const models = require('../models');
const express = require('express');
const bodyParser = require('body-parser');

const router = express.Router();
let Games_History = models.game_history;
let sequelize = models.sequelize

router.use(bodyParser.json())

router.post('/', (req, res) => {
    Games_History.destroy( { where: {id: req.body.game_id, fb_id: req.body.fb_id}})
        .then(
            sequelize.query(`SELECT * FROM \`games\` JOIN \`game_history\` ON games.id = game_history.game_id WHERE game_history.fb_id = ${req.body.fb_id}`, { type: sequelize.QueryTypes.SELECT})
            .then( (games) => {
                res.send(games)
            })
        )
})

module.exports = router