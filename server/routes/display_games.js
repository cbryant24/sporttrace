const models = require('../models');
const express = require('express');
const bodyParser = require('body-parser');
// const test = require('./test');
const {filter_joined_games} = require('./helpers');

const router = express.Router();
let Games = models.games;
let Game_History = models.game_history;

let sequelize = models.sequelize;
router.use(bodyParser.json())
router.get('/', function(req, res){
    var today = new Date().getTime()
    debugger
    sequelize.query(`SELECT * FROM \`games\` WHERE game_date >= ${today}`, { model: Games })
        .then( tbl_games => {
            res.status(200).send(tbl_games);
        })    
})

router.post('/user', function(req, res){
    sequelize.query(`SELECT * FROM \`games\` JOIN \`game_history\` ON games.id=game_history.game_id WHERE game_history.fb_id!=${req.body.fb_id}`, { type: sequelize.QueryTypes.SELECT })
        .then( tbl_games => {
            Game_History.findAll({ where: {fb_id: req.body.fb_id}}).then( user_games => {
                let user_game_ids = user_games.map( item => item.dataValues.game_id)
                let filtered_games = tbl_games.filter( item => {
                    return user_game_ids.indexOf(item.game_id) === -1
                })
                res.status(200).send(filtered_games)
            })
        })    
})

// router.get('/zip', function(req, res) {

//     Game.findAll( {where: { zipcode: req.data }}).then( tbl_games => {
//         let games = {
//             success: true,
//             data: tbl_games
//         }
//     })
//     res.status(200).send(games)
// })



module.exports = router;