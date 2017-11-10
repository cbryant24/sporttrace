import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { reset_game_id, leave_game, open_close_form, open_close_modal, update_selected_game } from '../actions';
import Edit_Game_Form from './post_game_redux_form';
import Join_Game_Modal from './sports_modal'


class Game_Details_Box extends Component {
    componentWillMount() {
        this.props.reset_game_id()
    }

    componentWillUnmount() {
        this.props.open_close_form(false)
        this.props.update_selected_game({})
    }

    handle_button_click(option, selected_game) {
        if(!this.props.auth) {
            this.props.open_close_modal({open: true, type: 'response', message: 'Please Sign In To Join'})
            return
        }
        switch(option) {
            case 'leave': 
                return this.props.open_close_modal({open: true, title: 'Leave Game?', type: 'confirmation', game_status: 'leave'})
            case 'join': 
                return this.props.open_close_modal({open: true, title: 'Join Game?', type: 'confirmation', game_status: 'join'})
            case 'edit':
                this.setState({selected_game})
                return this.props.open_close_form(true)
        }
    }
    
    render() {
        const {game_description, game_date, game_time, game_title, game_vibe, id, formatted_date, creator } = this.props.selected_game;        
        // const {active_games, user_game_history} = this.props
        if(this.props.open_form) {
            return (
                <div className='col-lg-4 col-12' id="game_details_box">
                    <Join_Game_Modal history={this.props.history}/>
                    <div className='gameinfobox'>
                        <Edit_Game_Form  
                        selection={this.state.selected_game} 
                        history={this.props.history}/>
                    </div>
             </div>
            )
        }

        if(!this.props.selected_game.id) {
            
            return (
                <div className='col-lg-4 col-12' id="game_details_box">
                    <div className='gameinfobox'>
                        <h3>No Game Selected</h3>
                    </div>
                </div>
            )
        }

        if(this.props.history.location.pathname === '/find_game') {
            // var selected_game = active_games.filter( item => {
            //     return item.id === this.props.game_id
            // })
            return (
                <div className='col-lg-4 col-12' id="game_details_box">
                    <Join_Game_Modal history={this.props.history}/>
                    <div className='gameinfobox'>
                        <h3>{game_title}</h3>
                        <p>{game_description}</p>
                        <h6>{formatted_date}</h6>
                        <button onClick={ () => this.handle_button_click('join')} className='btn btn-outline btn-xl joinbtn'>
                            Join Game
                        </button>
                    </div>
                 </div>
            )
        }

        if(this.props.history.location.pathname === '/your_games') {
            
            // var selected_game = user_game_history.games.filter( item => {
            //     return item.id === this.props.game_id
            // })
            let current_date = new Date().getTime()
            return (
                <div className='col-lg-4 col-12' id="game_details_box">
                    {/* <Join_Game_Modal history={this.props.history}/> */}
                    <div className='gameinfobox'>
                        <h3>{game_title}</h3>
                        <p>{game_description}</p>
                        <h6>{formatted_date}</h6>
                        {game_date > current_date ?
                        <div>
                            {creator ? 
                            <button onClick={ () => this.handle_button_click('edit')} className='btn btn-outline btn-xl modal-btn'>
                                Edit Game
                            </button> : ''}
                            <button onClick={ () => this.handle_button_click('leave')} className='btn btn-outline btn-xl modal-btn'>
                                Leave Game
                            </button>
                        </div>:
                        <button onClick={ () => this.handle_button_click( 'recreate')} className='btn btn-outline btn-xl joinbtn'>
                            Recreate Game
                        </button>
                        }
                    </div>
                 </div>
            )
        }
        
    }
        
}

function mapStateToProps(state) {
    return {
        active_games: state.sports.active_games,
        user_game_history: state.sports.user_game_history,
        auth: state.sports.auth,
        zipcode: state.sports.zipcode,
        game_id: state.sports.game_id,
        auth: state.sports.auth,
        open_form: state.sports.open_form,
        selected_game: state.sports.selected_game
    }
}

export default connect(mapStateToProps, { reset_game_id, leave_game, open_close_form, open_close_modal, update_selected_game })(Game_Details_Box);