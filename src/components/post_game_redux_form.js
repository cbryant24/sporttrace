import React, {Component} from 'react';
import {reduxForm, Field} from 'redux-form';


class PostGameReduxForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            input: null
        };
        this.handleFormInput = this.handleFormInput.bind(this);
        this.submitForm = this.submitForm.bind(this);
    }
    submitForm(e){
        e.preventDefault();
        console.log('this has been submitted: ', this.state.input);
    }
    handleFormInput(e) {
        this.setState({
            input: e
        });
    }

    componentWillMount(){
        console.log('cWM', this.props)
    }


    render() {
        const {handleSubmit, pristine, reset, submitting} = this.props;
        return (

            <form onSubmit={this.submitForm} onChange={handleSubmit(this.handleFormInput)}>

                <div className="postgame row">

                    <div className="col-sm-6 col-12">
                        <h5> Title: </h5>
                        <Field className="game_title_input" name="title" component="input" type="text"
                               placeholder="Your Title"/> <br/>

                        <div className="date row">

                            <div className="col-sm-6 col-12">
                                <h5>Time</h5>
                                <Field type="time" name="time" component="input" className="game_time_input"
                                       placeholder="Game Time"/>

                            </div>

                            <div className="col-sm-6 col-12">
                                <h5>Date</h5>
                                <Field type="date" name="date" component="input" className="game_time_input"
                                       placeholder="Game Time"/>

                            </div>
                        </div>

                    </div>

                    <div>
                        <h5>Vibe</h5>
                        <Field name="vibe" className="game_vibe_input" component="select">
                            <option />
                            <option value="casual">Casual</option>
                            <option value="competitive">Competitive</option>
                        </Field>

                    </div>

                    <div>
                        <h5> I'll bring a ball </h5>
                        <Field name="ball" type="checkbox" component="input" id="ball"/>

                    </div>

                    <div className="col-sm-6 col-12">
                        <h5>Game Description</h5>
                        <textarea className="game_description_input" placeholder="Your Description"/>

                        <button type="submit" disabled={pristine || submitting}
                                className="btn btn-outline btn-xl viewbtn postsubmit justify-content-center">Submit
                        </button>
                    </div>
                </div>
            </form>
        )
    }
}

export default reduxForm({
    form: 'post game redux form'
})(PostGameReduxForm)