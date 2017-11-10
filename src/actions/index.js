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

export function get_active_games(filter = {}) {
    if(filter.type === 'user') {
        return dispatch => {
            axios.post('/api/games/user', {fb_id: filter.fb_id}).then( res => {
                dispatch({
                    type: types.GET_ACTIVE_GAMES,
                    payload: res.data
                })
            })
        }
    }
    return dispatch => {
        axios.get('/api/games').then( res => {
            dispatch({
                type: types.GET_ACTIVE_GAMES,
                payload: res.data
            })
        })
    }

};

export function update_selected_game(game_info) {
    return {
        type: types.SELECTED_GAME,
        payload: game_info
    }
    
};

export function update_lat_long(new_lat_lon) {
    const lat_lon_zip = new_lat_lon;

    return {
        type: types.UPDATE_LAT_LON,
        payload: lat_lon_zip
    };
};

export function get_users_history(fb_id) {
    return dispatch => {
        axios.post('/api/history', {fb_id} ).then( res => {
            console.log('this is history api res', res)
            dispatch({
                type: types.GET_USER_HISTORY,
                payload: res.data
            })
        })
    }    
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

export function reset_game_id() {

    return {
        type: types.RESET_GAME_ID,
        payload: ''
    }
}

export function clear_user_history() {
    return {
        type: types.CLEAR_USER_HISTORY,
        payload: {
            games: [],
            resp: false
        }
    }
}

export function leave_game(game_id, fb_id) {
    return dispatch => {
        axios.post('/api/leave_game', {game_id, fb_id}).then( res => {
            console.log('this be the res from unjoin_game', res)

            dispatch({
                type: types.LEAVE_GAME,
                payload: res.data
            })
        })
    }
}

export function open_close_modal(modal_info) {
    return {
        type: types.OPEN_CLOSE_MODAL,
        payload: modal_info
    }
}

export function open_close_form(boolean) {
    return {
        type: types.OPEN_CLOSE_FORM,
        payload: boolean
    }
}