import React, { Component } from 'react';
import ScrollLock from 'react-scrolllock';
import Md_Close from 'react-icons/lib/md/close';
import { connect } from 'react-redux';
import { open_close_modal, get_users_history, update_selected_game, open_close_form } from '../actions';
import axios from 'axios';
import { CSSTransition } from 'react-transition-group';

const Transition = ({ children, ...props }) => (
    <CSSTransition
      {...props}
      timeout={500}
      classNames="modal-trans">
      {children}
    </CSSTransition>
  );

class Sports_Modal extends Component {
    render_address() {
        let address_elements = this.props.displayed_game.address_elements
        address_elements = typeof address_elements === 'string'? JSON.parse(address_elements):address_elements
        let complete_address = [];
        let i = 0;
        for (let address_component in address_elements) {
                complete_address.push(<div key={i++} className={address_component}><p> {address_elements[address_component]} </p></div>)
        }
        return complete_address
    }

    game_status() {
        switch(this.props.modal.game_status) {
            case 'create':
                this.props.open_close_modal(false)
                axios.post('/api/post_game', this.props.displayed_game).then( (res) => {
                    setTimeout( () => this.props.open_close_modal({open: true, message: res.data.msg, type: 'response'}), 1000)
                    res.data.created ? this.props.history.push('/your_games'):''
                    return
                })
                break
            case 'join':
                this.props.open_close_modal(false)
                axios.post('/api/join_game', {selected_game: this.props.displayed_game, joining_fb_id: this.props.auth.fb_id} ).then( (res) => {
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
                    setTimeout( () => this.props.open_close_modal({open: true, message: res.data.msg, type: 'response'}), 1000)
                    res.data.destroyed ? this.props.history.push('/your_games'):''
                    return
                })
                break
            case 'update':
            this.props.open_close_modal(false)
            axios.put('/api/history/update', {selected_game: this.props.displayed_game, updating_fb_id: this.props.auth.fb_id} ).then( (res) => {
                this.props.open_close_form(false)
                this.props.get_users_history(this.props.auth.fb_id)
                this.props.update_selected_game({})
                setTimeout( () => this.props.open_close_modal({open: true, message: res.data.msg, type: 'response'}), 1000)
                return
            })
            break
            default: 
                return

        }
    }

    render_modal() {
        const {game_title, formatted_date, game_description, game_vibe, address, ball, google_place_id} = this.props.displayed_game;
        const { modal, open_close_modal, open } = this.props   
        if(modal.type === 'response') {
            return (
                <div className='modal-contain'>
                    {modal.open ?  <ScrollLock/> : ''}
                    <div>
                        <div onClick={ ()=> open_close_modal({open: false}) } className='close-icon'>
                            <Md_Close />
                        </div>
                        <div className='modal-response'>
                            <div id='modal-header' className='col-12'>
                                <h2 className='text-center'>{this.props.modal.message}</h2>
                            </div>
                        </div>
                        <button onClick={ ()=> open_close_modal(false) } className='btn btn-outline btn-xl modal-btn'>Close</button>
                    </div>
                </div>
            )
        }
        if(modal.type === 'confirmation') {
            debugger
            return (
                    <div className='modal-contain'>
                        <div id='modal' className=''>
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
                                    <div><p className='modal-date'> {formatted_date} </p></div>
                                    <div><p className='modal-game-title'> {game_title} </p></div>
                                    <div><p className='modal-description'> {game_description} </p></div>
                                </div>
                            </div>
                            <iframe className='text-center' src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBkCzIStPV0yFoFd1DIdH9X1r-xwFjLEVc&q=place_id:${google_place_id ? google_place_id:""}`}>
                            </iframe>
                            <div className='row'>
                                <button onClick={ () => this.game_status() } className='btn btn-outline btn-xl modal-btn'>{modal.game_status} Game</button>
                                <button onClick={ ()=> open_close_modal(false)} className='btn btn-outline btn-xl modal-btn'>Cancel</button>
                            </div>
                        </div>
                    </div>
            )
            
        }
        return (
        <div>
        </div>
        
        )
    }

    render() {
        const {modal} = this.props
        return (
            <div>
                <Transition in={modal.open}>
                    <div className={modal.open ? 'modal-open':'modal-closed'}>
                        <div onClick={ ()=> this.props.open_close_modal({open: false}) } className={modal.open ? '':'hide'} id='backdrop'>
                        </div>
                        {modal.open ?  <ScrollLock/> : ''}
                        {this.render_modal()}
                    </div>
                </Transition>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        modal: state.sports.modal,
        displayed_game: state.sports.selected_game,
        auth: state.sports.auth
    }
}

export default connect(mapStateToProps, { open_close_modal, get_users_history, update_selected_game, open_close_form })(Sports_Modal)







{/* <Fade in={this.props.modal.open}>
    <div className={`container ${modal.open ? 'modal-open': 'modal-closed'}`}>
        <div>
            {this.render_modal_data()}
        </div>
    </div>
</Fade> */}


