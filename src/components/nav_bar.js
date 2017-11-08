import React, { Component } from 'react';
import logo2 from '../assets/img/logo2.png';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';
import { sign_in, sign_out } from '../actions'



class Nav_Bar extends Component {

    render_login() {
        if(this.props.auth) {
            return <li onClick={ () => this.handle_logout()} className="nav-item"><a href='' className='mx-3'>Logout</a></li>
        }
        return <li className="nav-item"><a className='mx-3' href='/signin/facebook'>Login/Signup</a></li>
    }

    handle_logout() {
        debugger
        this.props.history.push('/')
        this.props.sign_out()
    }

    render() {
        return (
            <div className='col-12 background-dismiss'>
                <nav className="navbar navbar-expand-lg navbar-light fixed-top" id="mainNav">
                    <div className="container">
                        <Link to="/"> <img src={logo2} width="190"/> </Link>
                        <div className="nav-link-box">
                            <ul className="navbar-nav">
                                <li className="nav-item">
                                    <Link to="/find_game" className="mx-3"> Find Game </Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/post_game" className="mx-3"> Post Game </Link>
                                </li>
                                <li className='nav-item'>
                                    <Link to='/your_games' className='mx-3'>Your Games</Link>
                                </li>
                                {this.render_login()}
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>
        )
    }
}

function mapStateToProps(state){
    return {
        auth: state.sports.auth
    }
}

export default connect(mapStateToProps, { sign_in, sign_out })(Nav_Bar);