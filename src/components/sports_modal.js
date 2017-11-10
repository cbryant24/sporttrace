import React, { Component } from 'react';
import ScrollLock from 'react-scrolllock';
import Md_Close from 'react-icons/lib/md/close';
import { connect } from 'react-redux';
import { open_close_modal, get_users_history, update_selected_game } from '../actions';
import axios from 'axios'



class Sports_Modal extends Component {
    render_address() {
        let address_elements = this.props.displayed_game.address_elements
        address_elements = typeof address_elements === 'string'? JSON.parse(address_elements):address_elements
        let complete_address = [];
        let i = 0;
        for (let address_component in address_elements) {
                complete_address.push(<div key={i++} className={address_component}>{address_elements[address_component]}  </div>)
        }
        return complete_address
    }

    game_status() {
        switch(this.props.modal.game_status) {
            case 'create':
                this.props.open_close_modal(false)
                axios.post('/api/post_game', this.props.displayed_game).then( (res) => {
                    console.log('this is the game after it has been posted to the db', res)
                    //add history push to after the success creation on failure keep them here with error message
                    setTimeout( () => this.props.open_close_modal({open: true, message: res.data.msg, type: 'response'}), 1000)
                    res.data.created ? this.props.history.push('/your_games'):''
                    return
                })
                break
            case 'join':
                this.props.open_close_modal(false)
                axios.post('/api/join_game', {selected_game: this.props.displayed_game, joining_fb_id: this.props.auth.fb_id} ).then( (res) => {
                    console.log('this be the res from join_game', res)
                    setTimeout( () => this.props.open_close_modal({open: true, message: res.data.msg, type: 'response'}), 1000)
                    res.data.created ? this.props.history.push('/your_games'):''
                    return
                })
                break
            case 'leave':
                this.props.open_close_modal(false)
                axios.post('/api/history/leave', {selected_game: this.props.displayed_game, leaving_fb_id: this.props.auth.fb_id} ).then( (res) => {
                    this.props.get_users_history(this.props.auth.fb_id)
                    this.props.update_selected_game({})
                    console.log('this be the res from join_game', res)
                    setTimeout( () => this.props.open_close_modal({open: true, message: res.data.msg, type: 'response'}), 1000)
                    res.data.destroyed ? this.props.history.push('/your_games'):''
                    return
                })
                break
            default: 
                return

        }
    }

    render() {
        const {game_title, formatted_date, game_description, game_vibe, address, ball, photo, google_place_id} = this.props.displayed_game;
        const { modal, open_close_modal } = this.props       
        if(modal.type === 'response') {
            return (
                <div>
                    {modal.open ?  <ScrollLock/> : ''}
                    <div onClick={ ()=> open_close_modal({open: false}) } className={modal.open ? '':'hide'} id='backdrop'>
                    </div>
                    <div id='modal-success' className={`container ${modal.open ? 'modal-trans': 'modal-trans-out'}`}>
                        <div onClick={ ()=> open_close_modal({open: false}) } className='close-icon'>
                            <Md_Close />
                        </div>
                        <div>
                            <div id='modal-header' className='col-12'>
                            <hr />
                                <h2 className='text-center'>{this.props.modal.message}</h2>
                            </div>
                            <hr />
                        </div>
                        <button onClick={ ()=> open_close_modal(false) } className='btn btn-outline btn-xl modal-btn'>Close</button>
                    </div>
                </div>
            )
        }
        if(modal.type === 'confirmation') {
            return (
                <div>
                    {modal.open ?  <ScrollLock/> : ''}
                    <div onClick={ ()=> open_close_modal({open: false}) } className={modal.open ? '':'hide'} id='backdrop'>
                    </div>
                    <div id='modal' className={`container ${modal.open ? 'modal-trans': 'modal-trans-out'}`}>
                        <div onClick={ ()=> open_close_modal(false) } className='close-icon'>
                            {<Md_Close />}
                        </div>
                        <div>
                            <div id='modal-header' className='col-12'>
                                <h2 className='text-center'>{modal.title}</h2>
                                <hr />
                            </div>
                        </div>
                        <div className='row mobile-modal-text'>
                            <div className='col-6 game_address'>
                                <h3>Location</h3>
                                <div>{game_title ? this.render_address() : ''}</div>
                            </div>
                            <div className='col-6 game_info'>
                                <h3>Game Info</h3>
                                <p>{formatted_date}</p>
                                <h4>{game_title}</h4>
                                <h4>{game_description}</h4>
                            </div>
                        </div>
                        <iframe className='text-center' src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBkCzIStPV0yFoFd1DIdH9X1r-xwFjLEVc&q=place_id:${google_place_id ? google_place_id:"ChIJWXNsX7jHwoARaduMfEQ0HuU"}`}>
                        </iframe>
                        <div className='row'>
                            <button onClick={ () => this.game_status() } className='btn btn-outline btn-xl modal-btn'>{modal.game_status} Game</button>
                            <button onClick={ ()=> open_close_modal(false)} className='btn btn-outline btn-xl modal-btn'>Cancel</button>
                        </div>
                    </div>
                </div>
            )
        }
        return <div></div>
    }
}

function mapStateToProps(state) {
    return {
        modal: state.sports.modal,
        displayed_game: state.sports.selected_game,
        auth: state.sports.auth
    }
}

export default connect(mapStateToProps, { open_close_modal, get_users_history, update_selected_game })(Sports_Modal)