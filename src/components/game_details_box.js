import React, { Component } from 'react';
import { connect } from 'react-redux';
import { get_single_game } from '../actions'
import { axios } from 'axios';

const BASE_URL = 'getdata.php';

class Game_Details_Box extends Component {
    componentWillMount() {
        this.props.get_single_game()
    }

    handle_join_game_click() {
        console.log('these are the details for clicking join game', this.props.single_game[0])
        // axios.post(BASE_URL)

        
    }

    render() {

        if(Object.keys(this.props.single_game).length !== 0) {
            return (
                <div className='col-lg-4 col-12'>
                <div className='gameinfobox'>
                    <h3>{this.props.single_game[0].game_title}</h3>
                    <p>{this.props.single_game[0].description}</p>
                    <h6>{`${this.props.single_game[0].game_time} ${this.props.single_game[0].game_date}`}</h6>
                    <button onClick={ () => this.handle_join_game_click()} className='btn btn-outline btn-xl joinbtn'>Join Game</button>
                </div>
            </div>
            )
        } else {
            return (
                <div>Bitch i'm loading</div>
            )
        }
    }
        
}

function mapStateToProps(state) {
    return {
        single_game: state.sports.single_game
    }
}

export default connect(mapStateToProps, { get_single_game } )(Game_Details_Box);



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