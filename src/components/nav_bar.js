import React, { Component } from 'react';
import logo2 from '../assets/img/logo2.png';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';
import { signed_in } from '../actions'


class Nav_Bar extends Component {
    componentWillMount() {
        this.props.signed_in()
    }

    createDangerObj(){
        return { __html: this.props.auth};
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
<<<<<<< HEAD
                                <Link to="/find_game" className="mx-3"> Find Game </Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/post_game" className="mx-3"> Post Game </Link>
=======
                                <Link style={stylebruh} to="/find_game" className="mx-3">Find Game</Link>
                            </li>
                            <li className="nav-item">
                                <Link style={stylebruh} to="/post_game" className="mx-3">Post Game</Link>
                            </li>
                            <li className="nav-item">
                                <Link style={stylebruh} to="/your_games" className="mx-3">Your Games</Link>
>>>>>>> a4a177e0b4c20ff0e0af7e322a220862eeecc5b9
                            </li>
                            <li className="nav-item">
                                {this.props.auth ? <span dangerouslySetInnerHTML={this.createDangerObj()}/> : <Link to="/login_page" className="mx-3">Login</Link>}
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