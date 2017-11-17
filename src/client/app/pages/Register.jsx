import React from 'react';

import $ from 'jquery';
import Api from '../services/api.js';
const api = new Api();

class Register extends React.Component {
    constructor() {
        super();
        this.state = {
            user: {
                name: '',
                email: '',
                password: ''   
            },
            view: 'register'
        };
        this.changeView = this.changeView.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    componentDidMount() {
    }
    changeView() {
        let view = this.state.view;
        view = (view == 'register') ? 'login' : 'register';
        this.setState({
            view: view
        });
    }
    handleChange(e) {
        const p = e.target.name;
        const v = e.target.value;
        let user = this.state.user;
        user[p] = v;
        this.setState({
            user: user
        });
    }
    handleSubmit(e) {
        e.preventDefault();
        const url = (this.state.view == 'register') ? api.getRegister() : api.getLogin();
        const _this = this;
        $.ajax({
            url: url,
            method: 'POST',
            data: _this.state.user,
            success(res) {
                _this.props.handleSubmit(res);
            }
        });
    }
    render() {
        const {user, view} = this.state;
        return (
            <form id="register" className="card" onSubmit={this.handleSubmit}>
                {view == 'register' ?
                <div className="field">
                    <label className="label">Name</label>
                    <div className="control">
                        <input className="input" type="text" value={user.name} name="name" onChange={this.handleChange} />
                    </div>
                </div>
                :null}
                <div className="field">
                    <label className="label">Email</label>
                    <div className="control has-icons-left has-icons-right">
                        <input className="input is-danger" type="email" value={user.email} name="email" onChange={this.handleChange} />
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
                        <input className="input" type="password" value={user.password} name="password" onChange={this.handleChange} />
                    </div>
                </div>
                <div className="field is-grouped">
                    <div className="control">
                        <button className="button is-primary">{(view == 'register') ? 'Register' : 'Login'}</button>
                    </div>
                    <div className="control">
                        <a className="button is-text" onClick={this.changeView}>{(view == 'register') ? 'Login' : 'Register'}</a>
                    </div>
                </div>
            </form>
        );
    }
}

export default Register;