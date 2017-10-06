import React, { Component } from 'react';
import { connect } from 'react-redux';
import { get_active_games } from '../actions'
import { axios } from 'axios';

const BASE_URL = 'getdata.php';

class Game_Details_Box extends Component {
    // componentWillMount() {
    //     if(this.props.game_id === '') {
    //         return
    //     }
    //     this.props.get_active_games(this.props.zipcode)
    // }

    handle_join_game_click() {
        console.log('these are the details for clicking join game', this.props)        
        game_id = this.props.game_id
        console.log(game_id)
        axios.post('php/data.php?action=join', { game_id })
        this.props.history.push('/your_games')
    }

    render() {
        if(this.props.game_id === '') {
            return <div>Select A Game Please</div>
        }
        console.log('this is inside the render of game_details', this.props)
        // const {auth} = this.props;
        if(this.props.active_games.data) {
            if(this.props.active_games.data.data.length > 0) {
                let selected_game = this.props.active_games.data.data.filter( (item) => {
                    return item.id === this.props.active_games.game_id
                })
                return (
                    <div className='col-lg-4 col-12' id="game_details_box">
                    <div className='gameinfobox'>
                        <h3>{selected_game.title}</h3>
                        <p>{selected_game.desc}</p>
                        <h6>{`${selected_game.time} ${selected_game.date}`}</h6>
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
    }
        
}

function mapStateToProps(state) {
    return {
        active_games: state.sports.active_games,
        auth: state.sports.auth,
        zipcode: state.sports.zipcode,
        game_id: state.sports.game_id
    }
}

export default connect(mapStateToProps, { get_active_games } )(Game_Details_Box);