import types from './types';
import axios from 'axios';

const BASE_URL = 'getdata.php'

/**
 * @function sign_in
 * @returns api get data from database of user info for updating redux auth state
 */
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
/**
 * @function signout
 * @returns api get request to clear user local storage for persistent login and logs user out updates redux auth state with empty object
 */
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

/**
 * @function get_active_games
 * @param {object} filter 
 * @returns updates redux state of active_games with data from the database of all active 
 * joinable games that user is apart of or if no user all joinable games
 */
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

/**
 * @function update_selected_game
 * @param {object} game_info 
 * @returns updates redux state selected_game with the user selected game info
 */
export function update_selected_game(game_info) {
    return {
        type: types.SELECTED_GAME,
        payload: game_info
    }
    
};

/**
 * @function update_lat_long
 * @param {object} new_lat_lon 
 * @returns updates redux state lat_lon with the user selected location info from search or game selection
 */

export function update_lat_long(new_lat_lon) {
    const lat_lon_zip = new_lat_lon;

    return {
        type: types.UPDATE_LAT_LON,
        payload: lat_lon_zip
    };
};

/**
 * @function get_users_history
 * @param {string} fb_id 
 * @returns updates redux state user_history with database games only associated with the user fb_id
 */
export function get_users_history(fb_id) {
    return dispatch => {
        axios.post('/api/history', {fb_id} ).then( res => {
            dispatch({
                type: types.GET_USER_HISTORY,
                payload: res.data
            })
        })
    }    
}

/**
 * @function update_zip
 * @param {string} zip 
 * @returns updates redux state zip code with user selected zip code from Google Maps Searchbar or user selected game
 */
export function update_zip(zip) {

    return {
        type: types.UPDATE_ZIPCODE,
        payload: zip
    }
}

/**
 * @function update_game_id
 * @param {string} game_id 
 * @returns update redux state selected_game_id with user selected game_id from games view click
 */
export function update_game_id(game_id) {
    
    return {
        type: types.UPDATE_GAME_ID,
        payload: game_id
    }

}

/**
 * @function reset_game_id
 * @returns clears currently selected game_id from redux state selected_game_id
 */
export function reset_game_id() {

    return {
        type: types.RESET_GAME_ID,
        payload: ''
    }
}

/**
 * @function clear_user_history
 * @returns clears redux state user_game_history of any games in current state
 */
export function clear_user_history() {
    return {
        type: types.CLEAR_USER_HISTORY,
        payload: {
            games: [],
            resp: false
        }
    }
}

/**
 * @function leave_game
 * @param {string} game_id 
 * @param {string} fb_id 
 * @returns posts to the database the user and the game the user has selected to leave updates redux state user_game_history
 */
export function leave_game(game_id, fb_id) {
    return dispatch => {
        axios.post('/api/leave_game', {game_id, fb_id}).then( res => {

            dispatch({
                type: types.LEAVE_GAME,
                payload: res.data
            })
        })
    }
}

/**
 * @function open_close_modal
 * @param {object} modal_info
 * @returns updates redux state modal with data or message to display for the user
 */

export function open_close_modal(modal_info) {
    return {
        type: types.OPEN_CLOSE_MODAL,
        payload: modal_info
    }
}

/**
 * @function open_close_form
 * @param {boolean} boolean 
 * @returns updates redux state open_close form with boolean to open or close form
 */
export function open_close_form(boolean) {
    return {
        type: types.OPEN_CLOSE_FORM,
        payload: boolean
    }
}