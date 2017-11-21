import React, { Component } from 'react';
import {Route, withRouter} from 'react-router-dom';
import Home_Page from './home_page';
import Find_Game from './find_game';
import Post_Game from './post_game';
import Your_Games from './your_games';
import style from '../assets/css/sportsfinder.css';
import Nav_Bar from './nav_bar';
import { connect } from 'react-redux';
import { sign_in } from '../actions';
import Modal from './sports_modal';
import Side_Nav from './side_nav'




class App extends Component {
    
    /**
     * @function componentWillMount
     * @returns verifiys if the user is signed in previously
     * verify across every component the user 
     * has a profile and is signed in through the 
     */
    componentWillMount() {
        this.props.sign_in();
    }

    render() {
        return (
            <div>
                <Side_Nav/>
                <Modal history={this.props.history}/>
                <Nav_Bar history={this.props.history}/>
                <Route exact path="/" component={Home_Page}/>
                <Route path="/find_game" component={Find_Game}/>
                <Route path="/post_game" component= {Post_Game} />
                <Route path='/your_games' component={ Your_Games} />
            </div>

        )
    }
}

export default withRouter(connect(null, { sign_in})(App))