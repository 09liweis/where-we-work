import React from 'react';
import $ from 'jquery';

import Main from './Main.jsx';
import Map from './components/Map.jsx';
import Register from './pages/Register.jsx';

import Api from './services/api.js';
const api = new Api();

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {
                id: 0,
            },
            isLogin: false,
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.logout = this.logout.bind(this);
    }
    componentWillMount() {
        const _this = this;
        $.ajax({
            url: api.checkSession(),
            success(res) {
                if (res.code == 200) {
                    _this.setState({
                        user: res.data,
                        isLogin: true
                    });
                }
            }
        });
    }
    logout() {
        const _this = this;
        $.ajax({
            url: api.getLogout(),
            success(res) {
                _this.setState({
                    isLogin: false
                });
            }
        });
    }
    handleSubmit(res) {
        this.setState({
            user: res,
            isLogin: true
        });
    }
    render() {
        const {isLogin} = this.state;
        return (
            <div className="wrapper">
                {!isLogin ?
                <Register handleSubmit={this.handleSubmit} />
                :
                    <a id="logout" className="button is-danger" onClick={this.logout}>Logout</a>
                }
                <Main />
                <Map isLogin={isLogin}/>
            </div>
        );
    }
}

export default App;