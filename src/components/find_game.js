import React, { Component } from 'react';
// import logo2 from '../../html_template/img/logo2.png';
// import stylebruh from '../../html_template/css/sportsfinder.css';
import NavBar from './nav_bar';
import { connect } from 'react-redux';
import { get_active_games } from '../actions';


class Find_Game extends Component {
    componentWillMount(){
        // console.log('the component has mounted:', this.props)
        this.props.get_active_games()
        console.log('after the get_active is called ', this.props)

    }

    handle_click() {
        console.log(this.props)
    }

    render() {
        return (
            <div>
                <NavBar/>
                <h1>Hello Everyone</h1>
                <button onClick={ () => this.handle_click()}>Hello</button>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        active_games: state.sports.active_games
    }
}

export default connect(mapStateToProps, { get_active_games })(Find_Game)



// <div>
        //    <NavBar/>
        //     <header className="masthead">
        //         <iframe className="game-map" frameBorder="0"
        //                 src="https://www.google.com/maps/embed/v1/place?q=place_id:ChIJKZcT2t_n3IARhA7AdKhMkuQ&key=AIzaSyCe4HExhxjnlIrfiI7GrPX_l7ZoFpmwdGM"
        //                 allowFullScreen> </iframe>
        //         <div className="row">

        //             <div className="col-lg-4 col-12">
        //                 <div className="gameinfobox">

        //                     <h3>Game Title</h3>

        //                         <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
        //                             tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
        //                             quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
        //                             consequat. Duis aute irure dolor.</p>

        //                     <h6>12/2/17 4:00PM</h6>


        //                         <a href="#" className="btn btn-outline btn-xl joinbtn">Join Game</a>

        //                 </div>
        //             </div>
        //             <div className="col-lg-8 col-12">
        //                 <div className="game-list-header">
        //                     <div className="row">
        //                         <div className="col-3">Title</div>
        //                         <div className="col-3">Time</div>
        //                         <div className="col-2">Vibe</div>

        //                     </div>
        //                 </div>
        //                 <div className="game-list-container">

        //                     <div className="single-game row">
        //                         <div className="col-3 textpad">Lorem ipsum dolor sit amet tempor.</div>
        //                         <div className="col-3 textpad">11/12/17 10:30PM</div>
        //                         <div className="col-2 textpad">Casual</div>
        //                         <div className="col-4">
        //                             <a href="#" className="btn btn-outline btn-xl viewbtn">View</a>
        //                         </div>
        //                     </div>
        //                     <div className="single-game row">
        //                         <div className="col-3 textpad">Lorem ipsum dolor sit amet tempor.</div>
        //                         <div className="col-3 textpad">11/12/17 10:30PM</div>
        //                         <div className="col-2 textpad">Casual</div>
        //                         <div className="col-4">
        //                             <a href="#" className="btn btn-outline btn-xl viewbtn">View</a>
        //                         </div>
        //                     </div>
        //                     <div className="single-game row">
        //                         <div className="col-3 textpad">Lorem ipsum dolor sit amet tempor.</div>
        //                         <div className="col-3 textpad">11/12/17 10:30PM</div>
        //                         <div className="col-2 textpad">Casual</div>
        //                         <div className="col-4">
        //                             <a href="#" className="btn btn-outline btn-xl viewbtn">View</a>
        //                         </div>
        //                     </div>
        //                     <div className="single-game row">
        //                         <div className="col-3 textpad">Lorem ipsum dolor sit amet tempor.</div>
        //                         <div className="col-3 textpad">11/12/17 10:30PM</div>
        //                         <div className="col-2 textpad">Casual</div>
        //                         <div className="col-4">
        //                             <a href="#" className="btn btn-outline btn-xl viewbtn">View</a>
        //                         </div>
        //                     </div>
        //                     <div className="single-game row">
        //                         <div className="col-3 textpad">Lorem ipsum dolor sit amet tempor.</div>
        //                         <div className="col-3 textpad">11/12/17 10:30PM</div>
        //                         <div className="col-2 textpad">Casual</div>
        //                         <div className="col-4">
        //                             <a href="#" className="btn btn-outline btn-xl viewbtn">View</a>
        //                         </div>
        //                     </div>
        //                     <div className="single-game row">
        //                         <div className="col-3 textpad">Lorem ipsum dolor sit amet tempor.</div>
        //                         <div className="col-3 textpad">11/12/17 10:30PM</div>
        //                         <div className="col-2 textpad">Casual</div>
        //                         <div className="col-4">
        //                             <a href="#" className="btn btn-outline btn-xl viewbtn">View</a>
        //                         </div>
        //                     </div>
        //                     <div className="single-game row">
        //                         <div className="col-3 textpad">Lorem ipsum dolor sit amet tempor.</div>
        //                         <div className="col-3 textpad">11/12/17 10:30PM</div>
        //                         <div className="col-2 textpad">Casual</div>
        //                         <div className="col-4">
        //                             <a href="#" className="btn btn-outline btn-xl viewbtn">View</a>
        //                         </div>
        //                     </div>
        //                     <div className="single-game row">
        //                         <div className="col-3 textpad">Lorem ipsum dolor sit amet tempor.</div>
        //                         <div className="col-3 textpad">11/12/17 10:30PM</div>
        //                         <div className="col-2 textpad">Casual</div>
        //                         <div className="col-4">
        //                             <a href="#" className="btn btn-outline btn-xl viewbtn">View</a>
        //                         </div>
        //                     </div>
        //                     <div className="single-game row">
        //                         <div className="col-3 textpad">Lorem ipsum dolor sit amet tempor.</div>
        //                         <div className="col-3 textpad">11/12/17 10:30PM</div>
        //                         <div className="col-2 textpad">Casual</div>
        //                         <div className="col-4">
        //                             <a href="#" className="btn btn-outline btn-xl viewbtn">View</a>
        //                         </div>
        //                     </div>

        //                 </div>
        //             </div>
        //         </div>
        //     </header>

        // </div>