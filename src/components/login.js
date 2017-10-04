import React, { Component } from 'react';
import logo2 from '../assets/img/logo2.png';
import stylebruh from '../assets/css/sportsfinder.css';
import NavBar from './nav_bar';
import { connect } from 'react-redux';
import { signed_in } from '../actions';

class Login extends Component {
    componentWillMount() {
        this.props.signed_in()
    }
    
    render() {
        return (
            <div>
                Hello
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        auth: state.sports.auth
    }
}

export default connect(mapStateToProps, { signed_in })(Login)