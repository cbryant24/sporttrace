import React, { Component } from 'react';
import logo2 from '../assets/img/logo2.png';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';
import { sign_in, sign_out } from '../actions';
import ScrollLock from 'react-scrolllock';
import Md_Close from 'react-icons/lib/md/close';
import Md_Menu from 'react-icons/lib/md/menu'


/**
 * @class
 * @classdesc a react class component the renders the mobile navigation menu
 */
class Side_Nav extends Component {
    constructor(props) {
        super(props)

        this.state = {
            back_drop_hide: false,
            nav_in: false 
        }
    }

    /**
     * @function render_login
     * @returns a jsx element that logs the user in or out depending on logged in status
     */
    render_login() {
        if(this.props.auth) {
            return <li onClick={ () => this.handle_logout()} className="side-nav-item"><a href='' className=''>Logout</a></li>
        }
        return <li className="nav-item"><a href='/signin/facebook'>Login/Signup</a></li>
    }

    /**
     * @function handle_logout
     * @returns logs the user out of there profile
     */
    handle_logout() {
        this.props.sign_out()
    }

    /**
     * @function open_nav
     * @returns updates component state and opens side navigation
     */
    open_nav() {
        this.setState({
            nav_in: true,
            back_drop_hide: true
        })
        
    }

    /**
     * @function close_nav
     * @returns updates component state and closes side navigation
     */
    close_nav() {
        this.setState({
            back_drop_hide: false,
            nav_in: false
        }) 
    }
    
    /**
     * @function backdrop_click
     * @returns updates component state and closes side navigation
     */
    backdrop_click() {
        this.setState({
            back_drop_hide: false,
            nav_in: false
        })
    }

    render() {
        return (
            <div className='side-menu-conatianer'>
                {this.state.back_drop_hide?  <ScrollLock/> : ''}
                <div onClick={() => this.open_nav()} className={`ham-icon ${this.state.nav_in ? 'hide':''}`}>
                    <Md_Menu/>
                </div>
                <div onClick={()=> this.backdrop_click()}className={this.state.back_drop_hide ? '':'hide'} id='backdrop'>
                </div>
                <div id='side-nav' className={`${this.state.nav_in ? 'side-trans': 'side-trans-out'}`}>
                    <span onClick={ () => {this.close_nav()}}><Md_Close/></span>
                    <ul id="side-menu">
                        <li className="side-nav-item">
                            <Link onClick={ ()=> this.close_nav()} to="/" className=""> Home </Link>
                        </li>              
                        <li className="side-nav-item">
                            <Link onClick={ ()=> this.close_nav()} to="/find_game" className=""> Find Game </Link>
                        </li>
                        <li className="side-nav-item">
                            <Link onClick={ ()=> this.close_nav()} to="/post_game" className=""> Post Game </Link>
                        </li>
                        <li className='side-nav-item'>
                            <Link onClick={ ()=> this.close_nav()} to='/your_games' className=''>Your Games</Link>
                        </li>
                        {this.render_login()}
                    </ul>
                </div>
            </div>
        )
        
    }
}

/**
 * @function mapStateToProps
 * @param {object} state 
 * @returns adds the state of auth to props to determine if user can signin or signout
 */

function mapStateToProps(state) {
    return {
        auth: state.sports.auth
    }
}

export default connect(mapStateToProps, { sign_out, sign_in })(Side_Nav);