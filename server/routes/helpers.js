const models = require('../models');

const Game_History = models.game_history;
const Games = models.games;

const sequelize = models.sequelize

exports.get_player_count = game => {
    return Game_History
    .findAndCountAll({
        where: { game_id: game.game_id || game.id}
    }).then( results => {
        return results.count
    })
}


exports.selected_player_counts = (games) => {
    let selected_games = [];
    const add_player_counts = games.map( get_game =>  {
        return {
            game: get_game, 
            count: exports.get_player_count(get_game)
        };
    })
    return selected_games = Promise.all(
        add_player_counts.reduce((acc, curr) => {
            return [...acc, curr.game, curr.count];
        }, []))
}


exports.all_player_counts = (next, req, res) => {
    req.all_player_counts = [];
    return Games
    .findAll().then( games => {
        let all_games = games.map( game => game.dataValues)
        let zero_players = all_games.map( game =>  {
        return {
            game, 
            count: exports.get_player_count(game)
        };
    })
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

// module.selected_player_counts({},{},{}, game_things)