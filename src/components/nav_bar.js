import React from 'react';
import logo2 from '../../html_template/img/logo2.png';
import stylebruh from '../../html_template/css/sportsfinder.css';
import {Link} from 'react-router-dom';


export default () => {
    return(
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
                                <Link style={stylebruh} to="/login_page" className="mx-3">  Login | Sign Up </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    )
}