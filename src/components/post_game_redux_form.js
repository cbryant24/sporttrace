import React from 'react';
import {Field, reduxForm} from 'redux-form'
import Search_Bar from './map_searchbar'


const renderInput = ({input, label, type, meta: {touched, error}}) => {
    return (
        <div className="form-group">
            <label> {label} </label>
            <input {...input} className="form-control" type={type}/>
            <div className="text-danger"> {touched && error} </div>
        </div>

    )
};


const renderSelect = ({input, label, type, meta: {touched, error}}) => {
    return (
        <div className="form-group">
            <label> {label} </label>
            <select {...input} className="form-control" type={type}>
                <option></option>
                <option value="casual">Casual</option>
                <option value="competitive">Competitive</option>
            </select>

            <div className="text-danger"> {touched && error} </div>
        </div>

    )
};

const PostGameForm = props => {

    const handleFormVals = vals => {
        console.log('form vals', vals)
    };

    const {handleSubmit, pristine, submitting} = props;

    return (
        <form onSubmit={handleSubmit((vals)=> handleFormVals(vals))}>
            <div className="row">
            <div className="col-sm-6 col-12">
            <Field name="title" component={renderInput} label="Title"  className="game_title_input" type="text" placeholder="Your Title"/>
            <Field name="time" component={renderInput} label="Time" type="time"   className="game_time_input" placeholder="Game Time"/>
            <Field name="date" component={renderInput} label="Date" type="date" className="game_time_input" placeholder="Game Time"/>
            </div>
            
            <div className="col-sm-6 col-12">
            <Field name="vibe" component={renderSelect} label="Vibe" type="select" className="game_vibe_input form-control" />
            <Field name="ball" component={renderInput} label="Ball" type="checkbox" className="game_vibe_input" />
            <Field name='description' component={renderInput} label="Description" type="text-area" className="game_description_input" placeholder="Your Description"/>
            <Search_Bar/>
            
            </div>
            </div>
            <button type="submit" disabled={pristine || submitting} className="ml-3 btn btn-outline btn-xl viewbtn postsubmit justify-content-center">Submit</button>
        </form>
    )
};

const validation = vals => {
    const errors = {};

    if (!vals.title) {
        errors.title = 'Enter a Game Title'
    }
    if (!vals.time) {
        errors.time = 'Enter a Game Time'
    }
    if (!vals.date) {
        errors.date = 'Enter a Game Date'
    }
    if (!vals.vibe) {
        errors.vibe = 'Select the pace of the game'
    }
    return errors;
};






export default reduxForm({
    form: 'post game form',
    validate: validation
})(PostGameForm)


