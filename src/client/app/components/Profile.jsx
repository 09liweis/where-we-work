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
                id: 0
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
        this.setState({
            place: place
        });
        this.props.setMarker(place);
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
        const {search, place} = this.state;
        const places = this.state.places.map((p) => 
            <li key={p.id} onClick={this.selectPlace.bind(this, p)}>{p.name}</li>
        );
        return (
            <div id="profile" className="card">
                <div className="field has-addons">
                    <div className="control">
                        <input className="input" type="text" value={search} onChange={this.handleChange} />
                    </div>
                    <div className="control">
                        <button className="button is-success" onClick={this.handleSearch}>Search</button>
                    </div>
                </div>
                <ul className="placesList">
                {places}
                </ul>
                {(place.id != 0) ?
                <div className="place card">
                    <h2>{place.name}</h2>
                    <p>{place.formatted_address}</p>
                    <div className="field is-grouped">
                        <div className="control">
                            <a className="button is-primary">Save</a>
                        </div>
                        <div className="control">
                            <a className="button is-text">Cancel</a>
                        </div>
                    </div>
                </div>
                :null}
            </div>
        );
    }
}

export default Profile;