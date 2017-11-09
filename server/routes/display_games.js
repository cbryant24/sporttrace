const models = require('../models');
const express = require('express');
const bodyParser = require('body-parser');
// const test = require('./test');

const router = express.Router();
let Games = models.games;
let Game_History = models.games_history;

let sequelize = models.sequelize;
router.use(bodyParser.json())

router.get('/', function(req, res){
    var today = new Date().getTime()

    sequelize.query(`SELECT * FROM \`games\` WHERE game_date >= ${today}`, { model: Games })
        .then( tbl_games => {
            console.log('these are the games from no user', tbl_games)            
            let games = {
                success: true,
                data: tbl_games
            }
            res.status(200).send(games);
        })    
})

router.post('/user', function(req, res){
    sequelize.query(`SELECT * FROM \`games\` JOIN \`game_history\` ON games.id=game_history.game_id WHERE game_history.fb_id!=${req.body.fb_id}`, { type: sequelize.QueryTypes.SELECT })
        .then( tbl_games => {
            console.log('these are the games from user', tbl_games)
            let games = {
                success: true,
                data: tbl_games
            }
            res.status(200).send(games);
        })    
})

router.get('/zip', function(req, res) {

    Game.findAll( {where: { zipcode: req.data }}).then( tbl_games => {

        let games = {
            success: true,
            data: tbl_games
        }
    })
    res.status(200).send(games)
})



module.exports = router;