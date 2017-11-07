import React, { Component } from 'react';
import {Field, reduxForm, reset} from 'redux-form';
import Search_Bar from './map_searchbar';
import { connect } from 'react-redux';
import axios from 'axios';
import Post_Game_Modal from './sports_modal';
import { open_close_modal, selected_game, open_close_form, update_lat_long } from '../actions'
import { renderInput, renderCheckBox, renderSelect } from './helpers';


class PostGameForm extends Component {
    constructor(props) {
        super(props)

        this.state = {
            flashing_error: false,
            edit_game: this.props.edit_game
        }
    }

    componentWillReceiveProps(nextProps) {
        if(this.state.flashing_error && nextProps.location.lat )
            this.setState({ flashing_error: false})
        
    }
    handleFormVals(vals) {
        if(!this.props.location.lat) {
            this.setState({
                flashing_error: true
            })
            return
        }
        debugger
        const complete_game = {
            game_date: new Date(`${vals.date} ${vals.time}`).getTime(),
            game_description: vals.description,
            game_title: vals.title,
            game_vibe: vals.vibe,
            lat: this.props.location.lat,
            lon: this.props.location.lon,
            zip: this.props.location.zipcode,
            ball: vals.ball,
            address: this.props.location.address,
            address_url: this.props.location.address_url,
            place_id: this.props.location.place_id,
            city: this.props.location.city,
            fb_id: this.props.auth.fb_id
        }
        
        this.props.open_close_modal(true);
        this.props.selected_game(complete_game)
    };    

    handle_cancel() {
        this.props.reset();
        this.props.update_lat_long({})
        this.props.open_close_form(false)
        if(this.props.history.location.pathname === '/post_game')
            this.props.history.push('/')
    }

    render() {
        debugger
        const {handleSubmit, pristine, submitting, auth, error} = this.props;            

        return (
            <div>
                <Post_Game_Modal title='Create Game' history={this.props.history}/>
                 <form onSubmit={ handleSubmit((vals)=> this.handleFormVals(vals))}>
                    <div className="row">
                        <div className={ this.props.history.location.pathname === '/your_games' ? 'col-12':'col-sm-6 col-12'}>
                        <Field name="title" component={renderInput} label="Title"  className="game_title_input" type="text" placeholder="Your Title"/>
                        <Field name="time" component={renderInput} label="Time" type="time"   className="game_time_input" placeholder="Game Time"/>
                        <Field name="date" component={renderInput} label="Date" type="date" className="game_time_input" placeholder="Game Time"/>
                        </div>
                        <div className={ this.props.history.location.pathname === '/your_games' ? 'col-12':'col-sm-6 col-12'}>
                        <Field name="vibe" component={renderSelect} label="Vibe" type="select" className="game_vibe_input form-control" />
                        <Field name="ball" component={renderCheckBox} label="Ball" type="checkbox" className="game_vibe_input" />
                        <div className='form-group'>
                            <Search_Bar reset_vals='nothin'/>
                            {this.state.flashing_error ? <div className='text-center flashing-error'>Please Enter a valid location</div>: ''}
                        </div>
                        <Field name='description' component={renderInput} label="Description" type="text-area" className="game_description_input" placeholder="Your Description"/>
                        </div>
                    </div>
                    <button disabled={auth ? false : true} type="submit"  className="ml-3 btn btn-outline btn-xl viewbtn postsubmit justify-content-center">Submit</button>
                    <button onClick={() => this.handle_cancel()} type='button' className="ml-3 btn btn-outline btn-xl viewbtn postsubmit justify-content-center">Cancel</button>
                 </form>
            </div>

        )
    }
};

//use on from to prevent from submission
// disabled={pristine || submitting }

const validate = vals => {
    const errors = {};
    const current_date = new Date().toLocaleDateString().replace(/(\d+)\/(\d+)\/(\d+)/, (str, month, day, year) => {
        day = day < 10 ? `0${day}`:day
        return `${year}-${month}-${day}`
    })    
    const alpha_numeric = new RegExp(/^[0-9a-zA-Z!#@ ]+$/)

    if (!vals.title) 
        errors.title = 'Enter a Game Title'
    
    if(!alpha_numeric.test(vals.title))
        errors.title = 'Enter a Valid Game Title'

    if (!vals.time) 
        errors.time = 'Enter a Game Time'

    if (!vals.date) 
        errors.date = 'Enter a Game Date'
    
    if (!vals.vibe) 
        errors.vibe = 'Select the style of game'
    
    if(vals.date < current_date )
        errors.date = 'Enter a Future Game Date' 
    

    if(vals.description && !alpha_numeric.test(vals.description))
        errors.description = 'Enter a Valid Description'

    return errors;
};



function mapStateToProps(state, props) {
    var date = new Date()
    var time = `${date.getHours()}:${date.getMinutes()<10?'0':''}${date.getMinutes()}`
    const current_date = date.toLocaleDateString().replace(/(\d+)\/(\d+)\/(\d+)/, (str, month, day, year) => {
        day = day < 10 ? `0${day}`:day
        return `${year}-${month}-${day}`
    })    
    let initialValues = {}  
    if(props.selection && props.selection.length > 0) {
        var edit_date = new Date(props.selection[0].game_date)
        edit_date = edit_date.toLocaleDateString().replace(/(\d+)\/(\d+)\/(\d+)/, (str, month, day, year) => {
            day = day < 10 ? `0${day}`:day
            return `${year}-${month}-${day}`
        })    
        let hours = new Date(props.selection[0].game_date).getHours();
        let min = new Date(props.selection[0].game_date).getMinutes(); 
        initialValues = {
            title: props.selection[0].game_title,
            time: `${hours < 10 ? `0${hours}`:hours}:${min < 10 ? `0${min}`:min}`,
            date: edit_date,
            vibe: props.selection[0].game_vibe,
            description: props.selection[0].game_description,
            ball: props.selection[0].ball,
        }
    }
    return {
        location: state.sports.lat_lon,
        auth: state.sports.auth,
        selection: props.selection,
        initialValues,
        open_form: state.sports.open_form
    }
}

export default connect(mapStateToProps, { open_close_modal, selected_game, open_close_form, update_lat_long })(reduxForm({
    form: 'post game form',
    validate
})(PostGameForm))

// export default reduxForm({
//     form: 'post game form',
//     validate: validation
// })(PostGameForm)


