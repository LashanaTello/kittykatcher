import React, { Component } from 'react';
import ReactMapGL, { NavigationControl } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

const TOKEN = require('../apiKeys');


const navStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    padding: '10px'
};

class KittyMap extends Component {
    state = {
        viewport: {
            width: 800,
            height: 800,
            latitude: 37.7577,
            longitude: -122.4376,
            zoom: 8,
            bearing: 0,
            pitch: 0
        }
    }

	render() {
		return (
            <div className="container">
                <h4>Kitty Map</h4>
    			<ReactMapGL
                    {...this.state.viewport}
                    mapStyle="mapbox://styles/mapbox/dark-v9"
                    mapboxApiAccessToken={TOKEN.mapboxToken}                
                    onViewportChange={(viewport) => this.setState({viewport})}
                >
                    <div className="nav" style={navStyle}>
                      <NavigationControl onViewportChange={(viewport) => this.setState({viewport})} />
                    </div>                
    			</ReactMapGL>
            </div>
		);
	}
}

export default KittyMap;