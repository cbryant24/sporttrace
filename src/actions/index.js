import types from './types';
import axios from 'axios';
import test from '../test/test_data'

const BASE_URL = 'getdata.php'


export function sign_in() {
    return dispatch => {
        axios.get('/api/user_info').then( (res) =>{
            dispatch({
                type: types.SIGN_IN,
                payload: res.data
            })
        })
    }
}

export function sign_out() {
    return dispatch => {
        axios.get('/api/signout').then( (res) =>{
            dispatch({
                type: types.SIGN_OUT,
                payload: res.data
            })
        })
    }
}

export function get_active_games(user_zipcode) {
    return dispatch => {
        axios.get('/api/games').then( res => {
            dispatch({
                type: types.GET_ACTIVE_GAMES,
                payload: res.data.data
            })
        })
    }
    
};

export function get_single_game(game_id = 0) {
    
};

export function update_lat_long(new_lat_lon) {
    const lat_lon_zip = new_lat_lon;

    return {
        type: types.UPDATE_LAT_LON,
        payload: lat_lon_zip
    };
};

export function get_users_history(user_id = 0) {
    
}

export function update_zip(zip) {

    return {
        type: types.UPDATE_ZIPCODE,
        payload: zip
    }
}

export function update_game_id(game_id) {
    
    return {
        type: types.UPDATE_GAME_ID,
        payload: game_id
    }

}

export function sign_up() {

}