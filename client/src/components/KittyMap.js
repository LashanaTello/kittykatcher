import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';
import KittyPostForm from './KittyPostForm';
import CantPost from './CantPost';
import axios from 'axios';

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

var locations = [];
var users = [];
var titles = [];

class KittyMap extends Component {
  constructor() {
    super();
    this.state = {
      lat: 40.7645,
      lng: -73.9602,
      zoom: 13,
      maxZoom: 19,
      displayForm: false,
      displayCantPost: false
    };
  }

  componentDidMount() {
    const map = this.refs.map.leafletElement;
    this.addAllMarkers(map);
  }

  async addAllMarkers(map) {
    //  temporarily here
    await axios
      .get("/api/posts/allCats")
      .then(res => {
        locations = res.data.map(single => single.location);
        users = res.data.map(single => single.posterUsername);
        titles = res.data.map(single => single.title);
      }) 
      .catch(err => console.log(err));

    for (var i = 0; i < locations.length; i++) {  
      var feat = this.createGeoJSON(titles[i], locations[i], users[i]);
      L.geoJSON(feat, {
        pointToLayer: (feature, latlng) => {
          return L.marker(latlng, {icon: myIcon}).bindPopup(`
            <h6>${feat.properties.title}</h6>
            <p>Post by: ${feat.properties.user}</p>
          `);
        }
      }).addTo(map);
    }
  }

  createGeoJSON(aTitle, coords, aUser) {
    var feature = {
      "type"    : "Feature",
      "geometry"  : {
        "type"        : "Point",
        "coordinates" : [coords.coordinates[1], coords.coordinates[0]]
      },
      "properties"  : {
        "title"   : aTitle,
        "user" : aUser
      }
    };
    return feature;
  };

  display = () => {
    this.setState({
      displayForm: !this.state.displayForm
    });
  }

  handleClick = (e) => {
    const map = this.refs.map.leafletElement;
    if (map != null) {
      if (newMarker !== undefined) {
        map.removeLayer(newMarker);
      }
      newMarker = new L.Marker(e.latlng, {icon: myIcon});
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
              this.state.displayForm && <button className="right btn-small grey" onClick={this.display}><i className="material-icons">clear</i></button>
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

KittyMap.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(KittyMap);