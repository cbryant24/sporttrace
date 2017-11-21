/**@module game_history_routes */
const models = require('../models');
const express = require('express');
const bodyParser = require('body-parser');
const { selected_player_counts } = require('./helpers')

const router = express.Router();

sequelize = models.sequelize;
const Games_History = models.game_history
const Games = models.games



router.use(bodyParser.json())

/**
 * @function 
 * @param {Object} req client request object to retrieve game association data from game_history table
 * @param {Object} res server response object with games from the games history table with number of players for each game
 * @returns {Object} data from the joined games and games_history table that represents games with player couts
 * @returns {Object} message for the client to display to user for success or failure
 */

router.post('/', (req, res) => {
    sequelize.query(`SELECT * FROM \`games\` JOIN \`game_history\` ON games.id = game_history.game_id WHERE game_history.fb_id = ${req.body.fb_id}`, { type: sequelize.QueryTypes.SELECT})
        .then( (games) => {
            req.game_with_players = []
            /**
            * a foreach loop is used to create the array of games with player
            * counts added to each game
            */
            selected_player_counts(games).then( (games_arr) =>{
                games_arr.forEach( (game, idx) => {
                    if(typeof game === 'object') {
                        req.game_with_players.push({...game, players: games_arr[idx + 1]})
                    }
                })
                res.status(200).send({games: req.game_with_players, resp: true});
            })
        })
})

/**
 * @function 
 * @param {Object} req client request object to update a game info
 * @param {Object} res server response object with update info 
 * @returns {Object} number of records in the database affected and message for client to display to user on success or failure
 */

router.put('/update', (req, res) => {
    const string_address = JSON.stringify(req.body.address_elements)    
    Games
    .update( 
        {
        game_date: req.body.selected_game.game_date,
        /**
         * regex to sanitize data
         */
        game_description: req.body.selected_game.game_description.match(/[\w!'# ]/g).join(''),
        game_title: req.body.selected_game.game_title.match(/[\w!'# ]/g).join(''),
        game_vibe: req.body.selected_game.game_vibe.match(/[\w]/g).join(''),
        longitude: req.body.selected_game.lon,       
        latitude: req.body.selected_game.lat, 
        zipcode: req.body.selected_game.zip,
        city: req.body.selected_game.city,
        address_elements: string_address,
        google_place_id: req.body.selected_game.google_place_id,
        ball: req.body.selected_game.ball,
        formatted_date: req.body.selected_game.formatted_date
        },
        {where: {
            id: req.body.selected_game.game_id
        }})
    .spread( (affectedCount, affectedRows) => {
        res.status(200).send({data: affectedCount, msg: 'Game has been successfully updated'})
    })
})

/**
 * @function 
 * @param {Object} req client request object to delete user from a game
 * @param {Object} res server response object with database response
 * @returns {Object} number of records in the database affected and message for client to display to user on success or failure
 */

router.post('/leave', (req, res) => {
    Games_History.destroy( { where: {id: req.body.selected_game.id, fb_id: req.body.leaving_fb_id}})
        .then( () => {
            const msg = 'You Have Successfully Left The Game'
            res.send({destroyed: true,  msg})
        })
})

module.exports = router;