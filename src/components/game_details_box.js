import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { reset_game_id, leave_game, open_close_form, open_close_modal } from '../actions';
import Edit_Game_Form from './post_game_redux_form';
import Join_Game_Modal from './sports_modal'


class Game_Details_Box extends Component {
    constructor(props) {
        super(props)

        this.state = {
            selected_game: {}
        }
    }
    componentWillMount() {
        this.props.reset_game_id()
    }

    componentWillUnmount() {
        this.props.open_close_form(false)
    }

    handle_button_click(option, selected_game) {
        debugger
        switch(option) {
            case 'leave': 
                return axios.post('api/history/delete', {selected_game}).then( res => {
                    console.log('this is the res from leaving a game', res)
                    this.props.mod
                    this.props.history.push('/your_games')
                })
            case 'join': 
                return axios.post('/api/join_game', {selected_game, joining_fb_id: this.props.auth.fb_id} ).then( (res) => {
                    console.log('this be the res from join_game', res)
                    setTimeout( () => {this.props.open_close_modal(res.data.created, res.data.message), 1000})
                    this.props.history.push('/your_games')
                    
                })
            case 'edit':
                this.setState({selected_game})
                return this.props.open_close_form(true)
        }
    }
    
    render() {
        const {active_games, user_game_history} = this.props
        const current_date = new Date().getTime()
        if(this.props.open_form) {
            return (
                <div className='col-lg-4 col-12' id="game_details_box">
                    <div className='gameinfobox'>
                        <Edit_Game_Form  
                        selection={this.state.selected_game} 
                        history={this.props.history}/>
                    </div>
             </div>
            )
        }

        if(!this.props.game_id) {
            return (
                <div className='col-lg-4 col-12' id="game_details_box">
                    <div className='gameinfobox'>
                        <h3>No Game Selected</h3>
                    </div>
                </div>
            )
        }
        if(this.props.history.location.pathname === '/find_game') {
            debugger
            var selected_game = active_games.filter( item => {
                return item.id === this.props.game_id
            })
            return (
                <div className='col-lg-4 col-12' id="game_details_box">
                    <div className='gameinfobox'>
                        <h3>{selected_game[0].game_title}</h3>
                        <p>{selected_game[0].game_description}</p>
                        <h6>{selected_game[0].formatted_date}</h6>
                        {this.props.auth.fb_id !== selected_game[0].fb_id ? 
                        <button onClick={ () => this.handle_button_click('join', selected_game)} className='btn btn-outline btn-xl joinbtn'>
                            Join Game
                        </button>:
                        <button onClick={ () => this.handle_button_click('leave', selected_game)} className='btn btn-outline btn-xl joinbtn'>
                            Leave Game
                        </button>
                    }
                    </div>
                 </div>
            )
        }

        if(this.props.history.location.pathname === '/your_games') {
            var selected_game = user_game_history.games.filter( item => {
                return item.id === this.props.game_id
            })
            
            return (
                <div className='col-lg-4 col-12' id="game_details_box">
                    <div className='gameinfobox'>
                        <h3>{selected_game[0].game_title}</h3>
                        <p>{selected_game[0].game_description}</p>
                        <h6>{selected_game[0].formatted_date}</h6>
                        {selected_game[0].game_date > current_date ?
                        <div>
                            {selected_game[0].creator ? <button onClick={ () => this.handle_button_click('edit',selected_game)} className='btn btn-outline btn-xl modal-btn'>
                                Edit Game
                            </button>:''}
                            <button onClick={ () => this.handle_button_click('leave',selected_game)} className='btn btn-outline btn-xl modal-btn'>
                                Leave Game
                            </button>
                        </div>:
                        <button onClick={ () => this.handle_button_click( 'recreate' , selected_game)} className='btn btn-outline btn-xl joinbtn'>
                            Recreate Game
                        </button>
                        }
                        {this.props.auth.fb_id === selected_game[0].fb_id ? '':<button onClick={ () => this.handle_button_click()} className='btn btn-outline btn-xl joinbtn'>
                            Join Game
                        </button>}
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
        open_form: state.sports.open_form
    }
}

export default connect(mapStateToProps, { reset_game_id, leave_game, open_close_form, open_close_modal })(Game_Details_Box);