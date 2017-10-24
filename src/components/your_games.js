import React, { Component } from 'react';
import NavBar from './nav_bar';
import { connect } from 'react-redux';
import { get_users_history } from '../actions';
import Game from './game';
import ReactDom from 'react-dom';
import Game_Details_Box from './game_details_box';
import MapWithAMarker from './display_games_map';



class Your_Games extends Component {
    componentDidUpdate(prevProps, prevState) {
        if(prevProps.auth === this.props.auth) {
            if(this.props.user_game_history.length === 0) {
                this.props.get_users_history(this.props.auth.fb_id)
                return
            }
            return
        }
        this.props.get_users_history(this.props.auth.fb_id)
    }

    render() {
        const { user_game_history } = this.props;
        const history_list = user_game_history.map( (item, idx) => <Game key={idx} game_info={item}/>  )
        return (
            <div>
                <MapWithAMarker
                user_game_history={user_game_history}
                history={this.props.history}
                lat_lon={this.props}
                />
                <header className="masthead">
                    <div className="row">
                        <Game_Details_Box 
                        user_game_history={user_game_history}
                        history={this.props.history}/>
                        <div className="col-lg-8 col-12">
                            <div className="game-list-header">
                                <div className="row">
                                    <div className="col-3">Title</div>
                                    <div className="col-3">Time</div>
                                    <div className="col-2">Vibe</div>
                                </div>
                                <div className="game-list-container">
                                    {history_list}
                                </div>
                            </div>
                        </div>
                    </div>
                </header>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        user_game_history: state.sports.user_game_history,
        lat_long: state.sports.lat_lon,
        auth: state.sports.auth
    }
}

export default connect(mapStateToProps, { get_users_history })(Your_Games)