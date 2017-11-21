import React from 'react';
import { connect } from 'react-redux';
import { update_lat_long, update_selected_game } from '../actions';


/**
 * @function Game
 * @param {*} props
 * @returns single JSX game for Find_Game and Your_Games display games component 
 */
const Game = props => {
    const {game_description, game_date, game_time, game_title, game_vibe, id, formatted_date, players, city } = props.game_info;
    

    /**
     * @function handle_view_click
     * @return updates state with the user selected game to global redux state selected_game
     */
    const handle_view_click = () => {
        /**
         * if edit form is open on Game_Details_Box component prevent user from closing it incorrectly
         */
        if(props.open_form) return
        
        props.update_selected_game(props.game_info)
    }

    return (
        <div className='single-game row'>
            <div className='col-3 textpad'>{game_title}</div>
            <div className='col-3 textpad'>
                <div>{ formatted_date }</div> 
                <div>{ city }</div>
            </div>
            
            <div className='col-3'>
                <div className='textpad'>{ game_vibe }</div>
                <div className='textpad'>{ players }</div>
            </div>
            <div className='col-3'>
                <button onClick={ () => handle_view_click() } className='btn btn-outline btn-xl viewbtn'>View</button>
            </div>
        </div>
    )
}

/**
 * @function mapStateToProps
 * @param { object } state 
 * @return specified state from redux store need to determine if user form is open 
 * and update map with latitude and longitude for map with marker
 */

function mapStateToProps(state) {
    return {
        auth: state.sports.auth,
        open_form: state.sports.open_form,
        lat_lon: state.sports.lat_lon
    }
}

export default connect(mapStateToProps, { update_selected_game, update_lat_long })(Game)