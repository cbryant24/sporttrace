/**@module active_games_routes */

const models = require('../models');
const express = require('express');
const bodyParser = require('body-parser');
const { all_player_counts, selected_player_counts } = require('./helpers')
const router = express.Router();
let Games = models.games;
let Game_History = models.game_history;

let sequelize = models.sequelize;
router.use(bodyParser.json())

/**
 *  data from the games table that represents games greater than or equal to todays date
 * used for route /find_game route
 */
router.get('/', (req, res) => {
    /**
     * get current date for retrieval of current games from the database
     */
    var today = new Date().getTime()

    /**
     * sequelize library used to access the sql database to pull all current games user is not apart of
     */
    sequelize.query(`SELECT * FROM \`games\` WHERE game_date >= ${today}`, { model: Games })
        .then( tbl_games => {
            /**
             * in promise fullfillment of selecting current games from the games table
             */
            let games = tbl_games.map( item => item.dataValues)
            req.game_with_players = []
            selected_player_counts(games).then( (games_arr) =>{
                games_arr.forEach( (game, idx) => {
                    if(typeof game === 'object') {
                        req.game_with_players.push({...game, players: games_arr[idx + 1]})
                    }
                })
                res.status(200).send(req.game_with_players);
            })
        })
})

/**

 * data from the games table that represents games greater than or equal to todays date
 * that the user is not already associated with
 */


router.post('/user', (req, res) => {
    /**
     * get current date for retrieval of current games from the database
     */
    var today = new Date().getTime()
    
    sequelize.query(`SELECT * FROM \`games\` WHERE game_date >= ${today}`, { model: Games })
        .then( tbl_games => {
            let games = tbl_games.map( item => item.dataValues)
            req.game_with_players = []
            selected_player_counts(games).then( (games_arr) =>{
                games_arr.forEach( (game, idx) => {
                    if(typeof game === 'object') {
                        req.game_with_players.push({...game, players: games_arr[idx + 1]})
                    }
                })
                /**
                 * Joining the games together based on games the user is not apart of also returns 
                 * object filled with joinable games for user
                 */
                sequelize.query(`SELECT * FROM \`games\` JOIN \`game_history\` ON games.id=game_history.game_id`, { type: sequelize.QueryTypes.SELECT })
                .then( tbl_games => {
                    Game_History.findAll({ where: {fb_id: req.body.fb_id}}).then( user_games => {
                        let user_game_ids = user_games.map( item => item.dataValues.game_id)
                        req.filtered_games_list = req.game_with_players.filter( item => {
                            return user_game_ids.indexOf(item.id) === -1
                        })
                        res.status(200).send(req.filtered_games_list)
                    })
                })    
            })
            
        })
})


module.exports = router;