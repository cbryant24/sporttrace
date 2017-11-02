import React, { Component } from 'react';
import ScrollLock from 'react-scrolllock';
import Md_Close from 'react-icons/lib/md/close'


class Mobile_Nav extends Component {
    constructor(props) {
        super(props)

        this.state = {
            back_drop_hide: false,
            modal_in: false 
        }
    }

    open_modal() {
        this.setState({
            modal_in: true,
            back_drop_hide: true
        })
        
    }
    close_modal() {
        this.setState({
            back_drop_hide: false,
            modal_in: false
        }) 
    }
    
    backdrop_click() {
        this.setState({
            back_drop_hide: false,
            modal_in: false
        })
        console.log('hello everyone')
    }

    render() {
        return (
            <div>
                {this.state.back_drop_hide?  <ScrollLock/> : ''}
                <button onClick={() => this.open_modal()} className='btn btn-outline-primary'>Click Me</button>
                <div onClick={()=> this.backdrop_click()}className={this.state.back_drop_hide ? '':'hide'} id='backdrop'>
                </div>
                <div id='modal' className={`container ${this.state.modal_in ? 'modal-trans': 'modal-trans-out'}`}>
                    <div className='row'>
                        <div id='modal-header' className='col-12'>
                            <h2>Basketball App</h2>
                            <span onClick={ () => {this.close_modal()}}><Md_Close/></span>
                        </div>
                        <hr/>
                    </div>
                </div>
            </div>
        )
        
    }
}

export default Mobile_Nav