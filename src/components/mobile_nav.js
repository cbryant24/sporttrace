import React, { Component } from 'react';
import logo2 from '../assets/img/logo2.png';
import FaBars from 'react-icons/lib/fa/bars'
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';
import { sign_in, sign_out } from '../actions'


/**
 * @class
 * @classdesc a react class component the renders the mobile navigation menu
 */

class Mobile_Nav extends Component {
    /**
     * @function render_login
     * @return a jsx element that logins in or logs a user depending on logged in status
     */
    render_login() {
        if(this.props.auth) {
            return <li onClick={ () => this.handle_logout()} className="mobile-nav-item"><a href='' className='mx-3'>Logout</a></li>
        }
        return <li className="nav-item"><a href='/signin/facebook'>Login/Signup</a></li>
    }

    /**
     * @function handle_logout
     * @return logs the user out of there profile
     */
    handle_logout() {
        this.props.sign_out()
    }

    render() {
        return (
            <nav role='navigation' id='mobile-nav'>
                <div id='menuToggle'>
                    <input type='checkbox'/>
                    <span></span>
                    <span></span>
                    <span></span>   
                    <ul id="menu">                 
                        <li className="mobile-nav-item">
                            <Link to="/find_game" className=""> Find Game </Link>
                        </li>
                        <li className="mobile-nav-item">
                            <Link to="/post_game" className=""> Post Game </Link>
                        </li>
                        <li className='mobile-nav-item'>
                            <Link to='/your_games' className=''>Your Games</Link>
                        </li>
                        {this.render_login()}
                    </ul>
                </div>
            </nav>
            
        )
    }
}

/**
 * @function mapStateToProps
 * @param {object} state 
 * @return adding authorization to props to log user in or out
 */

function mapStateToProps(state) {
    return {
        auth: state.sports.auth
    }
}

export default connect(mapStateToProps, { sign_out, sign_in })(Mobile_Nav);