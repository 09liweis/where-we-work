import React from 'react';

import $ from 'jquery';

class Register extends React.Component {
    constructor() {
        super();
        this.state = {
        };
    }
    componentDidMount() {
    }
    render() {
        return (
            <form id="register" className="card">
                <div className="field">
                    <label className="label">Name</label>
                    <div className="control">
                        <input className="input" type="text" />
                    </div>
                </div>
                <div className="field">
                    <label className="label">Email</label>
                    <div className="control has-icons-left has-icons-right">
                        <input className="input is-danger" type="email" />
                        <span className="icon is-small is-left">
                            <i className="fa fa-envelope"></i>
                        </span>
                        <span className="icon is-small is-right">
                            <i className="fa fa-warning"></i>
                        </span>
                    </div>
                    <p className="help is-danger">This email is invalid</p>
                </div>
                <div className="field">
                    <label className="label">Password</label>
                    <div className="control">
                        <input className="input" type="password" />
                    </div>
                </div>
                <div className="field is-grouped">
                    <div className="control">
                        <button className="button is-primary">Register</button>
                    </div>
                    <div className="control">
                        <button className="button is-text">Login</button>
                    </div>
                </div>
            </form>
        );
    }
}

export default Register;