import {combineReducers} from 'redux';
import sports from './sports_reducer'

import {reducer as form} from 'redux-form';


export default combineReducers({
    sports,
    form,
});