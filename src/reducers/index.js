import {combineReducers} from 'redux';
import sports from './sports_reducer'
import {reducer as formReducer} from 'redux-form';


export default combineReducers({
    sports: sports,
    form: formReducer
});