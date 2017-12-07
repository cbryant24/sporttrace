import React, {Component} from 'react';
import NavBar from './nav_bar';
import PostGameForm from './post_game_redux_form';
import MapWithAMarker from './display_games_map';
import { connect } from 'react-redux';
import { open_close_modal } from '../actions';


/**
 * @class
 * @classdesc a react class component that displays redux form for posting games and google map
 */
class PostGame extends Component {
    componentWillMount() {
        if(!this.props.auth)
            this.props.open_close_modal({open: true, type: 'response', message: 'Please Sign In To Post A Game'})
        
        return

    }
    render() {
        return (
            <div>
                <MapWithAMarker
                    history={this.props.history}
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

/**
 * @function mapStateToProps
 * @param {object} state 
 * @returns latitude and longitutde to display map for center location and marker location
 */

function mapStateToProps(state) {
    return {
        lat_long: state.sports.lat_lon,
        auth: state.sports.auth
    }
}


export default connect(mapStateToProps, {open_close_modal})(PostGame)