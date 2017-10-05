import React, { Component } from 'react';
import NavBar from './nav_bar';
import { connect } from 'react-redux';
import { get_active_games } from '../actions';
import Game from './game';
import Game_Details_Box from './game_details_box';
import MapWithAMarker from './display_games_map';



class Find_Game extends Component {
    componentWillMount(){
        this.props.get_active_games()
    }

    render() {
        const { active_games } = this.props;
        const games_list = active_games.map( (item, idx) => <Game key={idx} game_info={item}/>  )
        return (
        <div>
            <NavBar/>
            <MapWithAMarker
            lat_lon={this.props}
            />
            <header className="masthead">
                <div className="row">
                    <Game_Details_Box/>
                    <div className="col-lg-8 col-12" id="game_container">
                        <div className="game-list-header">
                            <div className="row">
                                <div className="col-3">Title</div>
                                <div className="col-3">Time</div>
                                <div className="col-2">Vibe</div>
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

function mapStateToProps(state) {
    return {
        active_games: state.sports.active_games,
        lat_long: state.sports.lat_lon
    }
}

export default connect(mapStateToProps, { get_active_games })(Find_Game)