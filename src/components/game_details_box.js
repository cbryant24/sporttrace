import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { reset_game_id, leave_game } from '../actions'


class Game_Details_Box extends Component {
    componentWillMount() {
        this.props.reset_game_id()
    }

    handle_button_click() {
        const game_info = {
            game_id: this.props.game_id,
            fb_id: this.props.auth.fb_id
        }
        if(this.props.history.location.pathname === '/find_game') {
            axios.post('/api/join_game', game_info ).then( (res) => {
                console.log('this be the res from join_game', res)
            })
        }
        
        if(this.props.history.location.pathname === '/your_games') {
            this.props.leave_game(game_info);        
        }
        
        // this.props.history.push('/your_games')
    }

    // render_button() {
    //     let current_date = new Date().getTime()
    //     if(this.props.game.game_date < current_date && this.props.game.creator) {
            
    //     }
    // }

    render() {
        if(this.props.history.location.pathname === '/find_game') {
            var selected_game = this.props.active_games.filter( (item) => {
                return item.id === this.props.game_id
            })
        }
        if(this.props.history.location.pathname === '/your_games') {
            var selected_game = this.props.user_game_history.filter( item => {
                return item.id === this.props.game_id
            })
        }
        if(selected_game.length === 0) {
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

        return (
            <div className='col-lg-4 col-12' id="game_details_box">
                <div className='gameinfobox'>
                    <h3>{selected_game[0].game_title}</h3>
                    <p>{selected_game[0].game_description}</p>
                    <h6>{`${selected_game[0].game_time} ${selected_game[0].game_date}`}</h6>
                    <button onClick={ () => this.handle_button_click()} className='btn btn-outline btn-xl joinbtn'>
                        {`${this.props.history.location.pathname === '/your_games' ? 'Leave Game':'Join'}`}
                    </button>
                    <button onClick={ () => this.handle_button_click()} className='btn btn-outline btn-xl joinbtn'>
                        {`${this.props.history.location.pathname === '/your_games' ? 'Leave Game':'Join'}`}
                    </button>
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

export default connect(mapStateToProps, { reset_game_id, leave_game })(Game_Details_Box);