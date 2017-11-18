import React from 'react';
import Profile from './Profile.jsx';

class Map extends React.Component {
    constructor() {
        super();
        this.state = {
            zoom: 13,
            maptype: 'roadmap',
            isLogin: false,
            map: null,
            markers: []
        };
        this.setMarker = this.setMarker.bind(this);
        this.clearMarkers = this.clearMarkers.bind(this);
    }
    componentWillReceiveProps(nextProps) {
        this.setState({
            isLogin: nextProps.isLogin
        });
    }
    componentDidMount() {
        const {zoom, maptype} = this.state;
        let map = new window.google.maps.Map(document.getElementById('map'), {
            zoom: 13,
            mapTypeId: 'roadmap',
        });
        this.setState({
            map: map
        });
        if (window.navigator.geolocation) {
            window.navigator.geolocation.getCurrentPosition((pos) => {
                const center = {
                    lat: pos.coords.latitude,
                    lng: pos.coords.longitude
                };
                map.setCenter(center);
                // const marker = new window.google.maps.Marker({
                //     map: map,
                //     position: center,
                //     content: '<div id="foo">This is marker</div>'
                // });
                // marker.addListener('click', () => {
                //     console.log(marker.getPosition().lat());
                // });
            });
        }
        map.addListener('zoom_changed', () => {
            this.setState({
                zoom: map.getZoom()
            });
        });
    }
    setMarker(place) {
        this.clearMarkers();
        const marker = new window.google.maps.Marker({
            map: this.state.map,
            position: place.geometry.location,
            title: place.name
        });
        marker.addListener('click', () => {
            console.log(marker.getPosition().lat());
        });
        const {markers} = this.state;
        markers.push(marker);
        this.setState({
            markers: markers
        });
    }
    clearMarkers() {
        this.state.markers.map((m) => {
            m.setMap(null);
        });
        this.setState({
            markers: []
        });
    }
    render() {
        const {isLogin, map} = this.state;
        return (
            <div className="map">
                <div id="map">
                
                </div>
                {isLogin ?
                <Profile map={map} setMarker={this.setMarker} />
                :null}
            </div>
        );
    }
}
export default Map;