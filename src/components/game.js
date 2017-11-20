import React from 'react';
import { connect } from 'react-redux';
import { update_lat_long, update_selected_game } from '../actions';

 const Game = props => {
    const {game_description, game_date, game_time, game_title, game_vibe, id, formatted_date, players, city } = props.game_info;
    
    const handle_view_click = () => {
        if(props.open_form) return
        
        props.update_selected_game(props.game_info)
    }
    debugger
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

function mapStateToProps(state) {
    return {
        auth: state.sports.auth,
        open_form: state.sports.open_form,
        lat_lon: state.sports.lat_lon
    }
}

export default connect(mapStateToProps, { update_selected_game, update_lat_long })(Game)