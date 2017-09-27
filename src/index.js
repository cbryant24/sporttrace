import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import App from './components/app';
import {BrowserRouter as Router} from 'react-router-dom'
import {createStore, applyMiddleware} from 'redux'
import rootReducer from './reducers';
import logger from './middleware/logger';
import redux_promise from 'redux-promise';


const createStoreWithMiddleware = applyMiddleware(logger, redux_promise)(createStore);

ReactDOM.render(
    <Provider store={createStoreWithMiddleware(rootReducer)}>
        <Router>
            <App/>
        </Router>
    </Provider>,
    document.getElementById('root')
);
