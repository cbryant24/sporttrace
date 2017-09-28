import types from '../actions/types'

const DEFAULT_STATE= {
    active_games: []
};

export default function (state = DEFAULT_STATE, action) {
    switch (action.type){
        case types.GET_ACTIVE_GAMES:
            console.log('this is the action at reducer::', action.payload)
            return {...state, active_games: action.payload}
        default:
            return state
    }
}