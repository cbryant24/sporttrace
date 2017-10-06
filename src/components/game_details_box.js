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
        console.log('these are the details for clicking join game', this.props)
        
        // this.props.history.push('/your_games')
        // axios.post(BASE_URL)

        
    }

    render() {
        const {auth} = this.props;
        if(Object.keys(this.props.single_game).length !== 0) {
            return (
                <div className='col-lg-4 col-12' id="game_details_box">
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
                <div>Loading...</div>
            )
        }
    }
        
}

function mapStateToProps(state) {
    return {
        single_game: state.sports.single_game,
        auth: state.sports.auth
    }
}

export default connect(mapStateToProps, { get_single_game } )(Game_Details_Box);