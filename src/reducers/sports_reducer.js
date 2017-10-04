import types from '../actions/types'

const DEFAULT_STATE= {
    active_games: [],
    single_game: {},
    lat_lon: {},
    user_game_history: [],
    auth: false
};

export default function (state = DEFAULT_STATE, action) {
    switch (action.type){
        case types.GET_ACTIVE_GAMES:
            return {...state, active_games: action.payload}
        case types.GET_SINGLE_GAME:
            return {...state, single_game: action.payload}
        case types.UPDATE_LAT_LON:
            console.log('LAT LON UPDATE:', action);
            return {...state, lat_lon: action.payload}
        case types.GET_USER_HISTORY:
            return {...state, user_game_history: action.payload}
        case types.SIGNED_IN:
            return {...state, auth: action.payload}
        default:
            return state 
    }
}
