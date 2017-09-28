import React from 'react';
// import logo2 from '../../html_template/img/logo2.png';
// import stylebruh from '../../html_template/css/sportsfinder.css';
import NavBar from './nav_bar';
import {Link} from 'react-router-dom';

export default () => {
    return(
        <div>
        <NavBar/>

            <header className="masthead home">
                <div className="container h-100">
                    <div className="row h-100">
                        <div className="col-lg-12 my-auto">
                            <div className="text-center">

                                <h1 className="mb-5">Find or Post a local <br/> pickup game near you!</h1>
                                <Link to="/find_game" className="btn btn-outline btn-xl"> Find Game </Link>
                                <Link to="/post_game" className="btn btn-outline btn-xl"> Post Game </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

        </div>
    )
}