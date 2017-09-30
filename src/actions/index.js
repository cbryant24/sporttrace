import types from './types';
import axios from 'axios';
import test from '../test/test_data'

const BASE_URL = 'getdata.php'

export function get_active_games() {
    // const active_games = axios.get('./test_server/index.js')
    const active_games = test

    return {
        type: types.GET_ACTIVE_GAMES,
        payload: active_games
    }

}

export function get_single_game(game_id = 0) {
    // const single_game = axios.get(`${BASE_URL}/${game_id}`);
    const single_game = test.filter( (game) => game.game_id === game_id)

    return {
        type: types.GET_SINGLE_GAME,
        payload: single_game
    }
}

