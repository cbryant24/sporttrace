import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { reset_game_id, leave_game, open_close_form, open_close_modal, update_selected_game } from '../actions';
import Edit_Game_Form from './post_game_redux_form';

/**
 * @class
 * @classdesc a react class component that displays the currently selected game from the user
 */

class Game_Details_Box extends Component {
    /**
     * @function componentWillMount
     * @returns clears game_details_box of any previously selected game in global state when first mounting
     */
    componentWillMount() {
        this.props.reset_game_id()
    }
    /**
     * @function componentWillUnMount
     * @returns clears game_details_box of currently selected game in global state when unmounting
     */
    componentWillUnmount() {
        this.props.open_close_form(false)
        this.props.update_selected_game({})
    }

    /**
     * @function handle_button_click 
     * @param {string} option string value to determine users action on the selected game
     * @returns a modal open with user selected action of leave, join, edit for the selected game 
     */

    handle_button_click(option) {
        /**
         * If the user is not signed in instruct them via a model to signin or signup
         */
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
                return this.props.open_close_form(true)
        }
    }
    
    render() {
        const {game_description, game_date, game_time, game_title, game_vibe, id, formatted_date, creator, city } = this.props.selected_game;        
        if(this.props.open_form) {
            return (
                <div className='col-lg-4 col-12' id="game_details_box">
                    <div className='gameinfobox'>
                        <Edit_Game_Form  
                        selection={this.props.selected_game} 
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
            return (
                <div className='col-lg-4 col-12' id="game_details_box">
                    <div className='gameinfobox'>
                        <h3>{game_title}</h3>
                        <p>{game_description}</p>
                        <h6>{formatted_date}</h6>
                        <p>{ city }</p>
                        <button onClick={ () => this.handle_button_click('join')} className='btn btn-outline btn-xl joinbtn'>
                            Join Game
                        </button>
                    </div>
                 </div>
            )
        }

        if(this.props.history.location.pathname === '/your_games') {
            let current_date = new Date().getTime()
            return (
                <div className='col-lg-4 col-12' id="game_details_box">
                    <div className='gameinfobox'>
                        <h3>{game_title}</h3>
                        <p>{game_description}</p>
                        <h6>{formatted_date}</h6>
                        <p>{ city }</p>
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

/**
 * @function mapStateToProps
 * @param { object } state 
 * @return specified state from redux store need to display selected game by user
 */

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