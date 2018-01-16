import React from 'react';
import $ from 'jquery';

import Api from '../services/api.js';
const api = new Api();

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
            },
            updatePlace: false,
            title: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.selectPlace = this.selectPlace.bind(this);
        this.cancelPlace = this.cancelPlace.bind(this);
        this.savePlace = this.savePlace.bind(this);
    }
    handleChange(e) {
        const p = e.target.name;
        const v = e.target.value;
        const state = this.state;
        state[p] = v;
        this.setState({
            state
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
            place: {
                google_place_id: place.place_id,
                name: place.name,
                lat: place.geometry.location.lat(),
                lng: place.geometry.location.lng(),
                address: place.formatted_address
            },
            updatePlace: true
        });
        this.props.setMarker(place);
    }
    cancelPlace() {
        this.setState({
            updatePlace: false
        });
    }
    savePlace() {
        const {place, title} = this.state;
        const _this = this;
        $.ajax({
            url: api.getSavePlace(),
            data: {
                place: place,
                title: title
            },
            method: 'POST',
            success(res) {
                console.log(res);
                _this.setState({
                    updatePlace: false,
                    search: '',
                    places: []
                });
            }
        });
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
        const _this = this;
        $.ajax({
            url: api.getUserPlace(),
            method: 'GET',
            success(res) {
                _this.setState({
                    place: res
                });
            }
        });
    }
    render() {
        const {search, place, title, updatePlace} = this.state;
        const places = this.state.places.map((p) => 
            <li key={p.id} onClick={this.selectPlace.bind(this, p)}>{p.name}</li>
        );
        return (
            <div id="profile" className="card">
                {(typeof place.name != 'undefined') ?
                <div>
                You are currently working on {place.name}
                </div>
                :
                <p>You haven't added any work place yet, search and add one</p>
                }
                <div id="searchPlace" className="card">
                    <div className="field has-addons">
                        <div className="control">
                            <input className="input" type="text" placeholder="Search to update your work place" value={search} name="search" onChange={this.handleChange} />
                        </div>
                        <div className="control">
                            <button className="button is-success" onClick={this.handleSearch}>Search</button>
                        </div>
                    </div>
                    <ul className="placesList">
                    {places}
                    </ul>
                </div>
                {(updatePlace) ?
                <div className="place card">
                    <h2>{place.name}</h2>
                    <p>{place.formatted_address}</p>
                    <div className="field">
                        <div className="control">
                            <input className="input" type="text" value={title} name="title" onChange={this.handleChange} />
                        </div>
                    </div>
                    <div className="field is-grouped">
                        <div className="control">
                            <a className="button is-primary" onClick={this.savePlace}>Save</a>
                        </div>
                        <div className="control">
                            <a className="button is-text" onClick={this.cancelPlace}>Cancel</a>
                        </div>
                    </div>
                </div>
                :null}
            </div>
        );
    }
}

export default Profile;