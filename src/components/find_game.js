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
        console.log('these are the props from find game handle_zip_submit', this.props)                
        e.preventDefault();
        if(this.state.current.length < 5) {
            return
        }
        this.props.get_active_games(this.state.current)
    }

    render() {
        console.log('these are the props from find game render', this.props)        
        const { current } = this.state
        const { active_games } = this.props;
        debugger
        if(active_games.length > 0) {
            const games_list = active_games.map( (item, idx) => <Game key={idx} game_info={item}/>  )
        }else {
            const games_list = <div>Enter Zipcode</div>
        }
        
        return (
        <div>
            <NavBar/>
            <MapWithAMarker
<<<<<<< HEAD
            lat_lon={this.props}
            />
            <header className="masthead">
                <div className="row">
                    <form onSubmit={ (e) => this.handle_zip_submit(e)}>
                        <label>
                            Name:
                            <input onChange={ (e) => this.handle_zip_code(e)} value={current} type="text" name="name" />
                        </label>
                        <input type="submit" value="Submit" />
                    </form>
=======
            lat_lon={this.props}/>
            
            
            
            <header className="masthead">
                <form onSubmit={ (e) => this.handle_zip_submit(e)}>
                    <label>
                        Name:
                        <input onChange={ (e) => this.handle_zip_code(e)} value={current} type="text" name="name" />
                    </label>
                    <input type="submit" value="Submit" />
                </form>
                <div className="row">
>>>>>>> a32f681b80042b7e7ece8e3dc9ce0257b4fb7873
                    <Game_Details_Box/>
                    <div className="col-lg-8 col-12" id="game_container">
                        <div className="game-list-header">
                            <div className="row">
                                <div className="col-3">Title</div>
                                <div className="col-3">Time</div>
                                <div className="col-2">Vibe</div>
                            </div>
                            <div className="game-list-container">
                                
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
        lat_long: state.sports.lat_lon
    }
}

export default connect(mapStateToProps, { get_active_games })(Find_Game)