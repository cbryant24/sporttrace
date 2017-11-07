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

    create_game() {
        this.props.open_close_modal(false)
        debugger
        this.props.history.push('/your_games')
        axios.post('/api/post_game', this.props.displayed_game).then( (res) => {
            console.log('this is the game after it has been posted to the db', res)
            this.props.open_close_modal(true)
        })


    }

    render() {
        if(this.props.history.location.pathname === '/your_games') {

            return (
                <div>
                    {this.props.modal.open ?  <ScrollLock/> : ''}
                    <div onClick={ ()=> this.props.open_close_modal({open, }) } className={this.props.modal.open ? '':'hide'} id='backdrop'>
                    </div>
                    <div id='modal-success' className={`container ${this.props.modal.open ? 'modal-trans': 'modal-trans-out'}`}>
                        <div onClick={ ()=> this.props.open_close_modal(false) } className='close-icon'>
                            <Md_Close />
                        </div>
                        <div>
                            <div id='modal-header' className='col-12'>
                            <hr />
                                <h2 className='text-center'>{this.props.modal.data}</h2>
                            </div>
                            <hr />
                        </div>
                        <button onClick={ ()=> this.props.open_close_modal(false) } className='btn btn-outline btn-xl modal-btn'>Close</button>
                    </div>
                </div>
            )
        }
        const {game_title, game_date, game_time, game_description, game_vibe, address, ball, photo, open} = this.props.displayed_game
        return (
            <div>
                {this.props.modal.open ?  <ScrollLock/> : ''}
                <div onClick={ ()=> this.props.open_close_modal(false) } className={this.props.modal.open ? '':'hide'} id='backdrop'>
                </div>
                <div id='modal' className={`container ${this.props.modal ? 'modal-trans': 'modal-trans-out'}`}>
                    <div onClick={ ()=> this.props.open_close_modal(false) } className='close-icon'>
                        {<Md_Close />}
                    </div>
                    <div>
                        <div id='modal-header' className='col-12'>
                            <h2 className='text-center'>{this.props.title}</h2>
                            <hr />
                        </div>
                    </div>
                    <div className='row mobile-modal-text'>
                        <div className='col-6 game_address'>
                            <h3>Location</h3>
                            <div>{this.props.displayed_game.game_title ? this.render_address(): <div></div>}</div>
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
                        <button onClick={ ()=> this.props.open_close_modal(false)} className='btn btn-outline btn-xl modal-btn'>Cancel</button>
                    </div>
                </div>
            </div>
        )
        
    }
}

function mapStateToProps(state) {
    return {
        modal: state.sports.modal,
        displayed_game: state.sports.selected_game
    }
}

export default connect(mapStateToProps, { open_close_modal })(Sports_Modal)