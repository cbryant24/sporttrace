import React, { Component } from 'react';
import ScrollLock from 'react-scrolllock';
import Md_Close from 'react-icons/lib/md/close';
import { connect } from 'react-redux'
import { open_close_modal } from '../actions'


class Sports_Modal extends Component {
    componentWillReceiveProps(nextProps) {
        debugger
        this.props
        nextProps
    }

    render_game() {
        const {game_title, game_date, game_time, game_description, game_vibe, address, ball, photo, open} = this.props.displayed_game
        
        const address_elements = this.props.address.replace(/class/g, 'className')

        if(photo) {
            return (
                <div>
                    hello
                </div>
            )
        }
    }

    render() {
        debugger
        return (
            <div>
                {this.props.modal ?  <ScrollLock/> : ''}
                <div onClick={()=> this.props.open_close_modal(false)} className={this.props.modal ? '':'hide'} id='backdrop'>
                </div>
                <div id='modal' className={`container ${this.props.modal ? 'modal-trans': 'modal-trans-out'}`}>
                    <div className='row'>
                        <div id='modal-header' className='col-12'>
                            <h2>{this.props.title}</h2>
                            <span onClick={ () => {this.props.open_close_modal(false)}}><Md_Close/></span>
                        </div>
                        {this.render_game()}
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