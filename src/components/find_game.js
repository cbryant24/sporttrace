import React, { Component } from 'react';
import NavBar from './nav_bar';
import { connect } from 'react-redux';
import { get_active_games, reset_game_id } from '../actions';
import Game from './game';
import Game_Details_Box from './game_details_box';
import MapWithAMarker from './display_games_map';
import Location_Display from './location_display'


/**
 * @class 
 * @classdesc Holds the all game information for joinable games user is not apart of
 * @returns a class component with all games listed that user is not apart of
 */
class Find_Game extends Component {

    componentWillMount() {
        /**
         * if the user is signed in call to database to pull games user is not apart of
         */
        if(this.props.auth) {
            this.props.get_active_games({type: 'user', fb_id: this.props.auth.fb_id})
            return
        }
        /**
         * if user is not signed in call to database to pull all games
         */
        this.props.get_active_games()
    }

    componentWillReceiveProps(nextProps) {
        /**
         * Determing if all games for the user have already been retrieved
         */
        if(nextProps.auth.fb_id !== this.props.auth.fb_id) {
            this.props.get_active_games({type: 'user', fb_id: nextProps.auth.fb_id})
            return
        }
    }

    render() {
        const { active_games } = this.props;
        var games_list = <div>No Actice Games</div>
        if(active_games.length > 0) {
            games_list = active_games.map( (item, idx) => <Game key={idx} game_info={item}/>  )
        }
        return (
            <div>
                <div>
                    <MapWithAMarker
                    history={this.props.history}
                    lat_lon={this.props}/>
                </div>
                <header className="masthead">
                    <div className="row">
                        <Location_Display history={this.props.history}/>
                        <Game_Details_Box history={this.props.history}/>
                        <div className="col-lg-8 col-12" >
                            <div className="game-list-header">
                                <div className="row">
                                    <div className="col-3">Title</div>
                                    <div className="col-3">Time</div>
                                    <div className="col-2">Vibe/Total Players</div>
                                </div>
                                <div className="game-list-container">
                                    {games_list}
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
 * @param { object } state 
 * @return specified state from redux store need to display games
 */

function mapStateToProps(state) {
    return {
        active_games: state.sports.active_games,
        lat_long: state.sports.lat_lon,
        zipcode: state.sports.zipcode,
        auth: state.sports.auth
    }
}

export default connect(mapStateToProps, { get_active_games, reset_game_id })(Find_Game)