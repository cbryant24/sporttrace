import React, {Component} from 'react';
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
                        <PostGameForm auth={this.props.auth} history={this.props.history} />
                </header>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        lat_long: state.sports.lat_lon,
        auth: state.sports.auth
    }
}


export default connect(mapStateToProps)(PostGame)