import React, { Component } from 'react';
import logo2 from '../assets/img/logo2.png';
import stylebruh from '../assets/css/sportsfinder.css';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';
import { signed_in } from '../actions'


class Nav_Bar extends Component {
    componentWillMount() {
        this.props.signed_in()
        console.log('Look at the props from nav on mount', this.props);
    }

    render() {
        console.log('Look the props from the Nav Bar Render ', this.props)
        return (
            <div>
            <nav className="navbar navbar-expand-lg navbar-light fixed-top" id="mainNav">
                <div className="container">
                    <Link to="/"> <img src={logo2} width="190"/> </Link>
                    <div className="nav-link-box">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link style={stylebruh} to="/find_game" className="mx-3"> Find Game </Link>
                            </li>
                            <li className="nav-item">
                                <Link style={stylebruh} to="/post_game" className="mx-3"> Post Game </Link>
                            </li>
                            <li className="nav-item">
                                <Link style={stylebruh} to="/login_page" className="mx-3">{this.props.auth.data.data}  </Link>
                            </li>
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

export default connect(mapStateToProps, { signed_in })(Nav_Bar);