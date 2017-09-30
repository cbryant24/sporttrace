import React, { Component } from 'react';
import { GoogleMapWrapper } from './find_games_map';
import { Fetch_All_Places } from './find_games_map';
import logo2 from '../assets/img/logo2.png';
import stylebruh from '../assets/css/sportsfinder.css';
import NavBar from './nav_bar';
import { connect } from 'react-redux';
import { get_active_games } from '../actions';
import Game from './game';
import ReactDom from 'react-dom';
import Game_Details_Box from './game_details_box';


class Find_Game extends Component {
    componentWillMount(){
        this.props.get_active_games()
    }

    componentDidMount(){
        
    }

    render() {
        const { active_games } = this.props
        const games_list = active_games.map( (item, idx) => <Game key={idx} game_info={item}/>  )
        return (
        <div>
            <NavBar/>
            <GoogleMapWrapper active_games ={ active_games }/>
            <Game_Details_Box/>
            <header className="masthead">
                <div>

                </div>
                <div className="row">
                    {/* <div className="col-lg-4 col-12">
                        <div className="gameinfobox">
                            <h3>Game Title</h3>
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                                    tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                                    quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                                    consequat. Duis aute irure dolor.
                                </p>
                            <h6>12/2/17 4:00PM</h6>
                                <button className="btn btn-outline btn-xl joinbtn">Join Game</button>

                        </div>
                    </div> */}
                    <div className="col-lg-8 col-12">
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
        active_games: state.sports.active_games
    }
}

export default connect(mapStateToProps, { get_active_games })(Find_Game)