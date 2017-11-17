import React from 'react';
import $ from 'jquery';

class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            map: props.map,
            service: null,
            places: [],
            search: '',
            place: {
                
            }
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.selectPlace = this.selectPlace.bind(this);
    }
    handleChange(e) {
        this.setState({
            search: e.target.value
        });
    }
    handleSearch() {
        this.state.service.textSearch({
            query: this.state.search
        }, function(res, status) {
            this.setState({
                places: res
            });
        }.bind(this));
    }
    selectPlace(place) {
        console.log(place);
    }
    componentWillReceiveProps(nextProps) {
        this.setState({
            map: nextProps.map
        });
    }
    componentDidMount() {
        const {map} = this.state;
        let service = new window.google.maps.places.PlacesService(map);
        this.setState({
            service: service
        });
    }
    render() {
        const {search} = this.state;
        const places = this.state.places.map((p) => 
            <li key={p.id} onClick={this.selectPlace.bind(this, p)}>{p.name}</li>
        );
        return (
            <div id="profile" className="card">
                <div className="field">
                    <label className="label">Search WorkPlace</label>
                    <div className="control">
                        <input className="input" type="text" value={search} onChange={this.handleChange} />
                    </div>
                </div>
                <button className="button is-success" onClick={this.handleSearch}>Search</button>
                <ul>
                {places}
                </ul>
            </div>
        );
    }
}

export default Profile;