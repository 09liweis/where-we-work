import React from 'react';
import Main from './Main.jsx';
import Map from './components/Map.jsx';
import Register from './pages/Register.jsx';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {
                id: 0,
                name: '',
                email: '',
                password: ''
            },
            isLogin: false
        };
    }
    render() {
        const {isLogin} = this.state;
        return (
            <div className="wrapper">
                {!isLogin ?
                <Register />
                :null}
                <Main />
                <Map />
            </div>
        );
    }
}

export default App;