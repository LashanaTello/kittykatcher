import React, { Component } from 'react';
import { connect } from 'react-redux';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';
import KittyPostForm from './KittyPostForm'
import CantPost from './CantPost'

const mapStyle = {
  height: '85vh',
  width: '100%'
};

var myIcon = L.icon({
  iconUrl: 'https://image.flaticon.com/icons/svg/616/616430.svg',
  iconSize: [41, 30],
  iconAnchor: [22, 30],
  popupAnchor: [-2, -25]
});

var newMarker = {};

var customOptions = {
  'maxWidth': 400,
  'maxHeight': 400,
  'className': 'custom-popup'
};

class KittyMap extends Component {
  constructor() {
    super();
    this.state = {
      lat: 40.7645,
      lng: -73.9602,
      zoom: 13,
      maxZoom: 19,
      markers: [],
      displayForm: false,
      displayCantPost: false
    };
  }

  display = () => {
    this.setState({
      displayForm: !this.state.displayForm
    });
  }

  handleClick = (e) => {
    const map = this.refs.map.leafletElement;
    if (map != null) {
      //var newMarker = new L.Marker(e.latlng, {icon: myIcon}).addTo(map);
      if (newMarker !== undefined) {
        map.removeLayer(newMarker);
        this.setState({
          markers: this.state.markers.filter(marker => marker !== this.state.markers[0])
        });
      }
      newMarker = new L.Marker(e.latlng, {icon: myIcon});
      this.state.markers.push(newMarker);
      map.addLayer(newMarker);
    }
    if (this.props.auth.isAuthenticated) {
      newMarker.bindPopup("Fill out the form below to add a cat to the map at this spot!", customOptions).openPopup();
      if (!this.state.displayForm) {
        this.display();
      }
      if (this.state.displayCantPost) {
        this.setState({
          displayCantPost: !this.displayCantPost
        })
      }
    } else {
      newMarker.bindPopup("Whoa there!", customOptions).openPopup();
      if (!this.state.displayCantPost) {
        this.setState({
          displayCantPost: !this.displayCantPost
        })
      }
    }
    
  }

  render() {
    const position = [this.state.lat, this.state.lng];
    return (
      <div className="container">
        <div className="row">
          <div className="center col s12">
            <h5>Add A Kitty To The Map!</h5>
          </div>
        </div>
        <div className="row">
          <div className="col s12">
            <Map ref="map" style={mapStyle} center={position} zoom={this.state.zoom} maxZoom={this.state.maxZoom} onClick={this.handleClick}>
              <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
              />
              <Marker position={position} icon={myIcon}>
                <Popup>
                  Click anywhere on the map to add a cat at that location to the map!
                </Popup>
              </Marker>
            </Map>
          </div>
        </div>
        <div className="divider"></div>
        <div className="row">
          <div className="col s12">
            {
              this.state.displayForm && <button className="right" onClick={this.display}>X</button>
            }
            {
              (this.state.displayCantPost && <CantPost />) || (!this.state.displayCantPost && this.state.displayForm && <KittyPostForm coords={newMarker.getLatLng()} />) 
            }
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps)(KittyMap);