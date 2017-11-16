import React from 'react';
import CustomMarker from '../classes/CustomMarker.js';

class Map extends React.Component {
    constructor() {
        super();
        this.state = {
            zoom: 13,
            maptype: 'roadmap',
        };
    }
    componentDidMount() {
        const {zoom, maptype} = this.state;
        let map = new window.google.maps.Map(document.getElementById('map'), {
            zoom: 13,
            mapTypeId: 'roadmap',
        });
        if (window.navigator.geolocation) {
            window.navigator.geolocation.getCurrentPosition((pos) => {
                const center = {
                    lat: pos.coords.latitude,
                    lng: pos.coords.longitude
                };
                map.setCenter(center);
                const marker = CustomMarker(center, map, 'class', 'content');
            });
        }
        map.addListener('zoom_changed', () => {
            this.setState({
                zoom: map.getZoom()
            });
        });
    }
    render() {
        return (
            <div id="map">
                
            </div>
        );
    }
}
export default Map;