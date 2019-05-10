import React, { Component } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';

const mapStyle = {
    height: '800px',
    width: '800px'
};

var myIcon = L.icon({
    iconUrl: 'https://image.flaticon.com/icons/svg/616/616430.svg',
    iconSize: [41, 30],
    iconAnchor: [22, 30],
    popupAnchor: [-2, -25]
});


class KittyMap extends Component {
  constructor() {
    super();
    this.state = {
      lat: 40.7645,
      lng: -73.9602,
      zoom: 13
    };
  }

  handleClick = (e) => {
    const map = this.refs.map.leafletElement;

    if (map != null) {
        var newMarker = new L.Marker(e.latlng, {icon: myIcon}).addTo(map);
        newMarker.bindPopup(`<h2>hi</h2><br/><p>bye</p>`);
    }
  }

  render() {
    const position = [this.state.lat, this.state.lng];

    return ( 
      <Map ref='map' style={mapStyle} center={position} zoom={this.state.zoom} onClick={this.handleClick}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
        />
        <Marker position={position} icon={myIcon}>
          <Popup>
            A pretty CSS3 popup. <br/> Easily customizable.
          </Popup>
        </Marker>
      </Map>
    );
  }
}


export default KittyMap;
