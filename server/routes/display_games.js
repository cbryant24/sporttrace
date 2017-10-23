const models = require('../models');
const express = require('express');
const bodyParser = require('body-parser');
// const test = require('./test');

const router = express.Router();
let Games = models.games;

let sequelize = models.sequelize;

router.use(bodyParser.json())

router.get('/', function(req, res){

    var today = new Date().toLocaleDateString()
    var today_formatted = today.replace(/(\d+)\/(\d+)\/(\d+)/, '$3$1$2' )

    sequelize.query(`SELECT * FROM \`games\` WHERE game_date >= ${today_formatted}`, { model: Games })
        .then( tbl_games => {
            let games = {
                success: true,
                data: tbl_games
            }
            res.status(200);
            res.send(games);
        })    
})

router.get('/zip', function(req, res) {

    Game.findAll( {where: { zipcode: req.data }}).then( tbl_games => {

        let games = {
            success: true,
            data: tbl_games
        }
    })
    res.status(200)
    res.send(games)
})



module.exports = router;