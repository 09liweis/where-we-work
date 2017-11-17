import React from 'react';
import Profile from './Profile.jsx';

class Map extends React.Component {
    constructor() {
        super();
        this.state = {
            zoom: 13,
            maptype: 'roadmap',
            isLogin: false,
            map: null
        };
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
                const marker = new window.google.maps.Marker({
                    map: map,
                    position: center,
                    content: '<div id="foo">This is marker</div>'
                });
                marker.addListener('click', () => {
                    console.log(marker.getPosition().lat());
                });
            });
        }
        map.addListener('zoom_changed', () => {
            this.setState({
                zoom: map.getZoom()
            });
        });
    }
    render() {
        const {isLogin, map} = this.state;
        return (
            <div className="map">
                <div id="map">
                
                </div>
                {isLogin ?
                <Profile map={map} />
                :null}
            </div>
        );
    }
}
export default Map;