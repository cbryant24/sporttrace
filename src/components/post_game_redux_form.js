import React, { Component } from 'react';
import {Field, reduxForm, reset} from 'redux-form';
import Search_Bar from './map_searchbar';
import { connect } from 'react-redux';
import axios from 'axios';
import { open_close_modal, update_selected_game, open_close_form, update_lat_long } from '../actions'
import { renderInput, renderCheckBox, renderSelect, format_date, format_time, validate, get_address } from './helpers';


class PostGameForm extends Component {
    constructor(props) {
        super(props)

        this.state = {
            flashing_error: false,
            location_change: false
        }
    }

    componentWillReceiveProps(nextProps) {
        if(this.state.flashing_error && nextProps.location.lat )
            this.setState({ flashing_error: false})
        if(nextProps.location !== this.props.location)
            this.setState({location_change: true})
    }

    compare_form_vals(init_val, new_vals) {
        for(let form_field in init_val) {
            if(init_val[form_field] !== new_vals[form_field])
                return false
        }
        return true
    }
    handleFormVals(vals) {
        if(!this.props.auth) {
            this.props.open_close_modal({open: true, type: 'response', message: 'Please Sign In To Join'})
            return
        }
        if(!this.state.location_change && !this.props.selection) {
            this.setState({
                flashing_error: true
            })
            return
        }

        if(this.props.history.location.pathname === '/your_games') {
            if(!this.state.location_change &&  this.compare_form_vals(this.props.initialValues, vals)  ) {
                this.props.open_close_modal({open: true, type: 'response', message: 'Change game info to update game'})
                return
            }
            const game_milliseconds = new Date(`${vals.date} ${vals.time}`).getTime()
            const complete_game = {
                game_date: game_milliseconds,
                formatted_date: `${format_date({data_type: 'mm-dd-yyyy', type: 'set', game_milliseconds})}, ${format_time({data_type: 'hh:mm', type: 'set', game_milliseconds}) }`,
                game_description: vals.description,
                game_title: vals.title,
                game_vibe: vals.vibe,
                lat: this.props.location.lat || this.props.selection.latitude,
                lon: this.props.location.lon || this.props.selection.longitude,
                zip: this.props.location.zipcode || this.props.selection.zipcode,
                ball: vals.ball,
                address_elements: get_address(this.props.location.address) || this.props.selection.address_elements,
                google_place_id: this.props.location.place_id || this.props.selection.google_place_id,
                city: this.props.location.city || this.props.selection.city,
                game_id: this.props.selection.game_id
            }
            this.props.update_selected_game(complete_game);
            this.props.open_close_modal({open: true, type: 'confirmation', title: 'Update Game?', game_status: 'update'});
            return

        }
        const game_milliseconds = new Date(`${vals.date} ${vals.time}`).getTime()
        const complete_game = {
            game_date: game_milliseconds,
            formatted_date: `${format_date({data_type: 'mm-dd-yyyy', type: 'set', game_milliseconds})}, ${format_time({data_type: 'hh:mm', type: 'set', game_milliseconds}) }`,
            game_description: vals.description,
            game_title: vals.title,
            game_vibe: vals.vibe,
            lat: this.props.location.lat,
            lon: this.props.location.lon,
            zip: this.props.location.zipcode,
            ball: vals.ball,
            address_elements: get_address(this.props.location.address),
            google_place_id: this.props.location.place_id,
            city: this.props.location.city,
            fb_id: this.props.auth.fb_id
        }
        this.props.update_selected_game(complete_game);
        this.props.open_close_modal({open: true, type: 'confirmation', title: 'Create Game?', game_status: 'create'});
        
    };    

    handle_cancel() {
        this.props.reset();
        this.props.update_lat_long({})
        this.props.open_close_form(false)
        if(this.props.history.location.pathname === '/post_game')
            this.props.history.push('/')
    }

    render() {
        const {handleSubmit, pristine, submitting, error, dirty} = this.props;
        return (
            <div>
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
                            <Search_Bar init_val={this.props.selection ? this.props.selection.city : ''}/>
                            {this.state.flashing_error ? <div className='text-center flashing-error'>Please SELECT a valid location</div>: ''}
                        </div>
                        <Field name='description' component={renderInput} label="Description" type="text-area" className="game_description_input" placeholder="Your Description"/>
                        </div>
                    </div>
                    <button type="submit"  className="ml-3 btn btn-outline btn-xl viewbtn postsubmit justify-content-center">Submit</button>
                    <button onClick={() => this.handle_cancel()} type='button' className="ml-3 btn btn-outline btn-xl viewbtn postsubmit justify-content-center">Cancel</button>
                 </form>
            </div>

        )
    }
};

//use on from to prevent from submission
// disabled={pristine || submitting }





function mapStateToProps(state, props) {
    let initialValues = {}
    if(props.selection) {
        const time = format_time({data_type: 'hh:mm', type: 'current mili'})
        const current_date = format_date({data_type: 'yyyy-mm-dd', type: 'current'})
        const edit_date = format_date({
            data_type: 'yyyy-mm-dd', 
            type: 'set', 
            game_milliseconds: props.selection.game_date
        })
        const edit_time = format_time({
            data_type: 'hh:mm', 
            type: 'set mili', 
            game_milliseconds:props.selection.game_date
        })
        initialValues = {
            title: props.selection.game_title,
            time: edit_time,
            date: edit_date,
            vibe: props.selection.game_vibe,
            description: props.selection.game_description,
            ball: props.selection.ball,
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

export default connect(mapStateToProps, { open_close_modal, update_selected_game, open_close_form, update_lat_long })(reduxForm({
    form: 'post game form',
    validate
})(PostGameForm))

// export default reduxForm({
//     form: 'post game form',
//     validate: validation
// })(PostGameForm)


