import React, { Component } from 'react';
import { connect } from 'react-redux';
import { get_active_games } from '../actions'
import axios from 'axios';

const BASE_URL = 'getdata.php';

class Game_Details_Box extends Component {
    // componentWillMount() {
    //     if(this.props.game_id === '') {
    //         return
    //     }
    //     this.props.get_active_games(this.props.zipcode)
    // }

    handle_join_game_click() {
        const join_info = {
            game_id: this.props.game_id,
            fb_id: this.props.auth.fb_id
        }
        axios.post('/api/join_game', join_info ).then( (res) => {
            console.log('this be the res from join_game', res)
        })
        // this.props.history.push('/your_games')
    }

    render() {
        if(this.props.game_id === '') {
            return (
                <div className='col-lg-4 col-12' id="game_details_box">
                    <div className='gameinfobox'>
                        <h3>No Game Selected</h3>
                        <p></p>
                        <h6></h6>
                    </div>
                </div>
            )
        }
        let selected_game = this.props.active_games.filter( (item) => {
            return item.id === this.props.game_id
        })
        
        return (
            <div className='col-lg-4 col-12' id="game_details_box">
                <div className='gameinfobox'>
                    <h3>{selected_game[0].game_title}</h3>
                    <p>{selected_game[0].game_description}</p>
                    <h6>{`${selected_game[0].game_time} ${selected_game[0].game_date}`}</h6>
                    <button onClick={ () => this.handle_join_game_click()} className='btn btn-outline btn-xl joinbtn'>Join Game</button>
                </div>
            </div>
        )
    }
        
}

function mapStateToProps(state) {
    return {
        active_games: state.sports.active_games,
        auth: state.sports.auth,
        zipcode: state.sports.zipcode,
        game_id: state.sports.game_id,
        auth: state.sports.auth
    }
}

export default connect(mapStateToProps, { get_active_games } )(Game_Details_Box);