import React, { Component } from 'react';
import NavBar from './nav_bar';
import { connect } from 'react-redux';
import { get_active_games } from '../actions';
import Game from './game';
import Game_Details_Box from './game_details_box';
import MapWithAMarker from './display_games_map';



class Find_Game extends Component {
    constructor(props){
        super(props)

        this.state = {
            current: ''
        }
    }

    handle_zip_code(e) {
        if(/\D/.test(e.target.value)) {
            return
        } else {
            let value = e.target.value;
            this.setState({current: value});
        }
    }

    handle_zip_submit(e) {
        e.preventDefault();
        if(this.state.current.length < 5) {
            return
        }
        this.props.get_active_games(this.state.current)
    }

    render() {
        const { current } = this.state
        const { active_games } = this.props;
        var games_list = <div>Enter Zipcode</div>
        if(active_games.data) {
            if(active_games.data.data.length > 0) {
                games_list = active_games.data.data.map( (item, idx) => <Game key={idx} game_info={item}/>  )
                console.log('this is the games_list inside render area', games_list);
            }
        }
        return (
        <div>
            <NavBar/>
            <MapWithAMarker
            lat_lon={this.props}/>
            <header className="masthead">
                <form onSubmit={ (e) => this.handle_zip_submit(e)} className="zip-form">

                        <input onChange={ (e) => this.handle_zip_code(e)} value={current} type="text" name="name" placeholder="Enter a Zip Code" style={{width: `50%`, height: `5vh`}}  />

                    <input type="submit" value="Submit" style={{width: `50%`}} />
                </form>
                <div className="row">
                    <Game_Details_Box/>
                    <div className="col-lg-8 col-12" id="game_container">
                        <div className="game-list-header">
                            <div className="row">
                                <div className="col-3">Title</div>
                                <div className="col-3">Time</div>
                                <div className="col-2">Vibe</div>
                            </div>
                            <div className="game-list-container">
                                {games_list}
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        active_games: state.sports.active_games,
        lat_long: state.sports.lat_lon,
        zipcode: state.sports.zipcode
    }
}

export default connect(mapStateToProps, { get_active_games })(Find_Game)