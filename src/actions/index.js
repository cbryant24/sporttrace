import types from './types';
import axios from 'axios';
import test from '../test/test_data'

export function get_active_games() {
    // const active_games = axios.get('./test_server/index.js')
    const active_games = test

    return {
        type: types.GET_ACTIVE_GAMES,
        payload: active_games
    }

}