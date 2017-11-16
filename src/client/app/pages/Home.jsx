import React from 'react';
import Map from '../components/Map.jsx';

import $ from 'jquery';

class Home extends React.Component {
    constructor() {
        super();
        this.state = {
        };
    }
    componentDidMount() {
    }
    render() {
        return (
            <div>
                <Map />
            </div>
        );
    }
}
export default Home;