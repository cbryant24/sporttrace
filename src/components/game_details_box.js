import React, { Component } from 'react';
import { connect } from 'react-redux';
import { get_active_games } from '../actions'
import { axios } from 'axios';

const BASE_URL = 'getdata.php';

class Game_Details_Box extends Component {
    componentWillMount() {
        console.log('these are the props from the game details comp will mount', this.props)
        if(this.props.zipcode === '') {
            return
        }
        this.props.get_active_games(this.props.zipcode)
    }

    handle_join_game_click() {
        console.log('these are the details for clicking join game', this.props)
        
        // this.props.history.push('/your_games')
        // axios.post(BASE_URL)
    }

    render() {
        console.log('this is inside the render of game_details', this.props)
        // const {auth} = this.props;
        if(this.active_games.data) {
            if(this.active_games.data.data.length > 0) {
                return (
                    <div className='col-lg-4 col-12' id="game_details_box">
                    <div className='gameinfobox'>
                        <h3>{this.props.active_games.data.data[0].title}</h3>
                        <p>{this.props.active_games.data.data[0].desc}</p>
                        <h6>{`${this.props.active_games.data.data[0].time} ${this.props.active_games.data.data[0].date}`}</h6>
                        <button onClick={ () => this.handle_join_game_click()} className='btn btn-outline btn-xl joinbtn'>Join Game</button>
                    </div>
                </div>
                )
            }
        }
        // if(Object.keys(this.props.single_game).length !== 0) {
        //     return (
        //         <div className='col-lg-4 col-12' id="game_details_box">
        //         <div className='gameinfobox'>
        //             <h3>{this.props.single_game[0].game_title}</h3>
        //             <p>{this.props.single_game[0].description}</p>
        //             <h6>{`${this.props.single_game[0].game_time} ${this.props.single_game[0].game_date}`}</h6>
        //             <button onClick={ () => this.handle_join_game_click()} className='btn btn-outline btn-xl joinbtn'>Join Game</button>
        //         </div>
        //     </div>
        //     )
        else {
            return (
                <div>Enter a Zip Code</div>
            )
        }
    }
        
}

function mapStateToProps(state) {
    return {
        active_games: state.sports.active_games,
        auth: state.sports.auth,
        zipcode: state.sports.zipcode
    }
}

export default connect(mapStateToProps, { get_active_games } )(Game_Details_Box);