import types from './types';
import axios from 'axios';
import test from '../test/test_data'

const BASE_URL = 'getdata.php'

export function get_active_games(user_zipcode) {
    const active_games = axios.post('/php/data.php?action=read', { user_zipcode })
    // const active_games = test

    return {
        type: types.GET_ACTIVE_GAMES,
        payload: active_games
    };
};

export function get_single_game(game_id = 0) {
    // const single_game = axios.get(`${BASE_URL}/${game_id}`);
    const single_game = test.filter( (game) => game.game_id === game_id)

    return {
        type: types.GET_SINGLE_GAME,
        payload: single_game
    };
};

export function update_lat_long(new_lat_lon) {
    const lat_lon_zip = new_lat_lon;

    return {
        type: types.UPDATE_LAT_LON,
        payload: lat_lon_zip
    };
};

export function get_users_history(user_id = 0) {
    const user_history = axios.get('php/data.php?action=read-p');
    // const user_history = test.filter( (game) => game.user_id === user_id)
    
    
    return {
        type: types.GET_USER_HISTORY,
        payload: user_history
    }
}

export function signed_in() {
    const sign_in = axios.post(`/php/navLogin.php`);

    return {
        type: types.SIGNED_IN,
        payload: sign_in
    }
}