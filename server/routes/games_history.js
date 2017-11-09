const models = require('../models');
const express = require('express');
const bodyParser = require('body-parser');

const router = express.Router();

sequelize = models.sequelize;
const Games_History = models.game_history

router.use(bodyParser.json())

router.post('/', (req, res) => {
    sequelize.query(`SELECT * FROM \`games\` JOIN \`game_history\` ON games.id = game_history.game_id WHERE game_history.fb_id = ${req.body.fb_id}`, { type: sequelize.QueryTypes.SELECT})
        .then( (games) => {
            games.forEach( game => game.formatted_date = new Date(game.game_date).toLocaleString().replace(/:\d+(?= ) /, '').toLowerCase())
            res.send({games, resp: true})
        })
})

router.put('/update', (req, res) => {
    Students
    .update( 
        {first_name: req.body.update_data.update_first_name,
        last_name: req.body.update_data.update_last_name},
        {where: {
            id: req.body.update_data.id
        }})
    .spread( (affectedCount, affectedRows) => {
        Students
        .findAll({ where: {
            fb_id: req.body.update_data.fb_id
        }})
        .then( students => {
            res.status(200).send({affectedCount, affectedRows, students})
        })
    })
})

router.post('/leave', (req, res) => {
    console.log('this is the req body from delete', req.body)
    Games_History.destroy( { where: {id: req.body.selected_game.id, fb_id: req.body.leaving_fb_id}})
        .then(
            sequelize.query(`SELECT * FROM \`games\` JOIN \`game_history\` ON games.id = game_history.game_id WHERE game_history.fb_id = ${req.body.selected_game.id}`, { type: sequelize.QueryTypes.SELECT})
            .then( () => {
                const msg = 'You Have Successfully Left The Game'
                res.send({created: true, game_joined, msg})
            })
        )
})

module.exports = router;