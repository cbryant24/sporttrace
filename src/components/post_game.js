import React, {Component} from 'react';
import logo2 from '../assets/img/logo2.png';
import stylebruh from '../assets/css/sportsfinder.css';
import NavBar from './nav_bar';
import PostGameForm from './post_game_redux_form';

class PostGame extends Component {




    render() {
        return (
            <div>
                <NavBar/>

                <header className="masthead">

                    <iframe className="game-map post-map" frameBorder="0"
                            src="https://www.google.com/maps/embed/v1/place?q=place_id:ChIJKZcT2t_n3IARhA7AdKhMkuQ&key=AIzaSyCe4HExhxjnlIrfiI7GrPX_l7ZoFpmwdGM"
                            allowFullScreen> </iframe>
                        <PostGameForm/>
                </header>
            </div>


        )
    }
}

export default PostGame;

