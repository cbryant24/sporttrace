import React, {Component} from 'react';
import logo2 from '../assets/img/logo2.png';
import stylebruh from '../assets/css/sportsfinder.css';
import NavBar from './nav_bar';
import PostGameForm from './post_game_redux_form';
import MapWithAMarker from './display_games_map';
import { connect } from 'react-redux';

class PostGame extends Component {
    componentWillMount() {
        console.log('this be the props from postgame', this.props)
    }

    render() {
        return (
            <div>
                <NavBar/>
                <MapWithAMarker
                    center = {'value'}
                    lat_lon = {this.props}
                     />
                <header className="masthead">
                        <PostGameForm />
                </header>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        lat_long: state.sports.lat_lon
    }
}


export default connect(mapStateToProps)(PostGame)