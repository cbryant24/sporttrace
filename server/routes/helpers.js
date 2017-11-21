const models = require('../models');

const Game_History = models.game_history;
const Games = models.games;

const sequelize = models.sequelize

/**
 * @module player_count
 * @function
 * @param {Object} game represents a single game from the joined game and game_history table
 * @returns {Object} game object with the total number of users associated with that game
 */
exports.get_player_count = game => {
    return Game_History
    .findAndCountAll({
        where: { game_id: game.game_id || game.id}
    }).then( results => {
        return results.count
    })
}

/**
 * @module selected_player_counts
 * @function 
 * @param {Array} games array of specified game objects joined from the game and game_history table
 * @returns {Array} of game objects with promises for game counts to be added for each game
 */
exports.selected_player_counts = (games) => {
    let selected_games = [];
    const add_player_counts = games.map( get_game =>  {
        return {
            game: get_game, 
            count: exports.get_player_count(get_game)
        };
    })
    /**
     * resolves all the promises from the get_player_count module
     * Promise.all takes an array to flatten the array the reduce higher order function is used
     * on each promise resolution
     */
    return selected_games = Promise.all(
        add_player_counts.reduce((acc, curr) => {
            return [...acc, curr.game, curr.count];
        }, []))
}

/**
 * @module all_player_counts
 * @function 
 * @param {Array} games array of all game objects from the game and game_history table
 * @returns {Array} of game objects with promises for game counts to be added for each game
 */
exports.all_player_counts = (next, req, res) => {
    req.all_player_counts = [];
    /**
     * runs a sql query of the database games table in the promise resolution each game is passed
     * to the get_player_count module to add the total of players associated with each game
     */
    return Games
    .findAll().then( games => {
        let all_games = games.map( game => game.dataValues)
        let zero_players = all_games.map( game =>  {
        return {
            game, 
            count: exports.get_player_count(game)
        };
    })
    /**
     * resolves all the promises from the get_player_count module
     * Promise.all takes an array to flatten the array the reduce higher order function is used
     * on each promise resolution a foreach loop is used to create the array of games with player
     * counts added to each game
     */
    const game_counts_arr = Promise.all(
        zero_players.reduce((acc, curr) => {
            return [...acc, curr.game, curr.count];
        }, [])
        ).then( (vals) => {
            vals.forEach( (game, idx) => {
                if(typeof game === 'object') {
                        req.all_player_counts.push({...game, players: vals[idx + 1]})
                }
            })
        })
    })
}