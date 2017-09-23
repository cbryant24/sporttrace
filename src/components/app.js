import React from 'react';
import {Route} from 'react-router-dom'
import HomePage from './home_page';
import FindGame from './find_game';
import PostGame from './post_game';
import LoginPage from './login';


export default () => {
    return(
        <div>
            <Route exact path="/" component={HomePage}/>
            <Route path="/find_game" component={FindGame}/>
            <Route path="/post_game" component= {PostGame} />
            <Route path="/login_page" component= {LoginPage} />
        </div>
    )
}