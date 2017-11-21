import React, { Component } from 'react';
import NavBar from './nav_bar';
import { connect } from 'react-redux';
import { get_users_history, clear_user_history } from '../actions';
import Game from './game';
import ReactDom from 'react-dom';
import Game_Details_Box from './game_details_box';
import MapWithAMarker from './display_games_map';
import Location_Display from './location_display';


/**
 * @class 
 * @classdesc Holds the all game information games user has created or joined
 * @returns a class component with all games listed that user is apart of
 */

class Your_Games extends Component {
    /**
     * @function componentWillMount
     * @returns action creator call to update state with users games if signed in or clear games if user is not signed in
     */
    componentWillMount() {
        const { games, resp } = this.props.user_game_history
        if(!this.props.auth && games.length > 0) {
            this.props.clear_user_history()
        }
        if(this.props.auth) {
            this.props.get_users_history(this.props.auth.fb_id)
        }
        
    }
    /**
     * @function componentWillReceiveProps
     * @param {object} nextProps 
     * @returns signed in users will update the state with their games for display
     */
    componentWillReceiveProps(nextProps) {
        if(nextProps.auth.fb_id) {
            const {games, resp} = nextProps.user_game_history
            if(games.length === 0 && !resp) {
                this.props.get_users_history(nextProps.auth.fb_id)
                return
            }
            return
        }
    }

    /**
     * @function render_games
     * @returns an array of jsx elements of the users games for display
     */
    render_games() {
        const { games } = this.props.user_game_history
        if(games.length > 0) {
            let history_list = games.map( (item, idx) => <Game key={idx} game_info={item}/> )

            return history_list
        }
        return
    }


    render() {
        return (
            <div>
                <MapWithAMarker
                user_game_history={this.props.user_game_history.games}
                history={this.props.history}
                lat_lon={this.props}
                />
                <header className="masthead">
                    <div className="row">
                        <Location_Display history={this.props.history}/>
                        <Game_Details_Box 
                        history={this.props.history}/>
                        <div className="col-lg-8 col-12">
                            <div className="game-list-header">
                                <div className="row">
                                    <div className="col-3">Title</div>
                                    <div className="col-3">Time</div>
                                    <div className="col-3">Vibe/Total Players</div>
                                </div>
                                <div className="game-list-container">
                                    {this.render_games()}
                                </div>
                            </div>
                        </div>
                    </div>
                </header>
            </div>
        )
    }
}


/**
 * @function mapStateToProps
 * @param {object} state 
 * @returns user games from the databse to display and latitude longitutude form map location and markers
 */
function mapStateToProps(state) {
    return {
        user_game_history: state.sports.user_game_history,
        lat_long: state.sports.lat_lon,
        modal: state.sports.modal,
        auth: state.sports.auth
    }
}

export default connect(mapStateToProps, { get_users_history, clear_user_history })(Your_Games)