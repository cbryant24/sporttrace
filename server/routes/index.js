const express = require('express');


const post_game = require('./post_game');
const display_games = require('./display_games');
const join_game = require('./join_game')

const router = express.Router();

router.use('/api/games', display_games);
router.use('/api/post_game', post_game);
router.use('/api/join_game', join_game)



module.exports = router;