import React, {Component} from 'react';
import logo2 from '../../html_template/img/logo2.png';
import stylebruh from '../../html_template/css/sportsfinder.css';
import NavBar from './nav_bar';

class PostGame extends Component {




    render() {
        return (
            <div>
                <NavBar/>

                <header className="masthead">

                    <iframe className="game-map post-map" frameBorder="0"
                            src="https://www.google.com/maps/embed/v1/place?q=place_id:ChIJKZcT2t_n3IARhA7AdKhMkuQ&key=AIzaSyCe4HExhxjnlIrfiI7GrPX_l7ZoFpmwdGM"
                            allowFullScreen> </iframe>


                    <div className="postgame row">
                        <div className="col-sm-6 col-12">
                            <h5>Title</h5>
                            <input className="game_title_input" placeholder="Your Title"/> <br/>

                            <div className="date row">
                                <div className="col-sm-6 col-12">
                                    <h5>Time</h5>
                                    <input type="time" className="game_time_input" placeholder="Game Time"/>
                                </div>
                                <div className="col-sm-6 col-12">
                                    <h5>Date</h5>
                                    <input type="date" className="game_time_input" placeholder="Game Time"/>
                                </div>
                            </div>

                        </div>
                        <div>
                            <h5>Vibe</h5>
                            <select name="vibe" className="game_vibe_input">
                                <option value="casual">Casual</option>
                                <option value="competitive">Competitive</option>
                            </select>
                        </div>
                        <div className="col-sm-6 col-12">
                            <h5>Game Description</h5>
                            <textarea className="game_description_input" placeholder="Your Description"/>

                            <a href="#" className="btn btn-outline btn-xl viewbtn postsubmit justify-content-center">Submit</a>
                        </div>
                    </div>

                </header>
            </div>


        )
    }
}

export default PostGame;

