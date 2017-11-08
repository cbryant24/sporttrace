import React, { Component } from 'react';
import ScrollLock from 'react-scrolllock';
import Md_Close from 'react-icons/lib/md/close';
import { connect } from 'react-redux';
import { open_close_modal } from '../actions';
import axios from 'axios'



class Sports_Modal extends Component {
    componentWillReceiveProps(nextProps) {
        this.props
        nextProps
    }


    render_address() {
        const { address } = this.props.displayed_game

        const address_elements = address.split('</span>').filter( item => item.length > 0).map( (item, idx) => {
            return (
                <h4 key={idx} className={item.match(/class="(.*)(?=">)/)[1]}>
                    {`${item.match(/>([\w\d-_ ]+)/)[1]} `}
                </h4>
            )
        })
        return address_elements
    }

    create_join_game() {
        this.props.open_close_modal(false)

        if(this.props.history.location.pahtname === '/post_game') {
            this.props.history.push('/your_games')
            return axios.post('/api/post_game', this.props.displayed_game).then( (res) => {
                console.log('this is the game after it has been posted to the db', res)
                //add history push to after the success creation on failure keep them here with error message
                this.props.open_close_modal({open: true, type: 'response', message: res.msg})
            })
        }

        return axios.post('/api/join_game', {selected_game, joining_fb_id: this.props.auth.fb_id} ).then( (res) => {
            console.log('this be the res from join_game', res)
            setTimeout( () => {this.props.open_close_modal({open: true, message: res.data.message, type: 'response'}), 1000})
            this.props.history.push('/your_games')
        })


    }

    render() {
        debugger
        const {game_title, game_date, game_time, game_description, game_vibe, address, ball, photo, open} = this.props.displayed_game;
        const { modal, open_close_modal } = this.props       
        if(modal.type === 'response') {

            return (
                <div>
                    {modal.open ?  <ScrollLock/> : ''}
                    <div onClick={ ()=> open_close_modal({open: false}) } className={modal.open ? '':'hide'} id='backdrop'>
                    </div>
                    <div id='modal-success' className={`container ${modal.open ? 'modal-trans': 'modal-trans-out'}`}>
                        <div onClick={ ()=> modal.open_close_modal({open: false}) } className='close-icon'>
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
                                <h2 className='text-center'>{title}</h2>
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
                                <p>{game_time} </p><p> {game_date}</p>
                                <h4>{game_title}</h4>
                                <h4>{game_description}</h4>
                            </div>
                        </div>
                        <iframe className='text-center' src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBkCzIStPV0yFoFd1DIdH9X1r-xwFjLEVc&q=place_id:${this.props.displayed_game.place_id ? this.props.displayed_game.place_id:"ChIJWXNsX7jHwoARaduMfEQ0HuU"}`}>
                        </iframe>
                        <div className='row'>
                            <button onClick={ () => this.create_game() } className='btn btn-outline btn-xl modal-btn'>Create Game</button>
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
        displayed_game: state.sports.selected_game
    }
}

export default connect(mapStateToProps, { open_close_modal })(Sports_Modal)