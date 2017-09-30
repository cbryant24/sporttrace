import types from '../actions/types'

const DEFAULT_STATE= {
    active_games: [],
    single_game: {}
};

export default function (state = DEFAULT_STATE, action) {
    switch (action.type){
        case types.GET_ACTIVE_GAMES:
            return {...state, active_games: action.payload}
        case types.GET_SINGLE_GAME:
            return {...state, single_game: action.payload}
        default:
            return state
    }
}