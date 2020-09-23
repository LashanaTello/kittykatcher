import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';
import KittyPostForm from './KittyPostForm';
import CantPost from './CantPost';
import MapLoading from './MapLoading';
import { getUsersAndAvatars } from '../store/actions/authActions';
import { getAllPosts } from '../store/actions/postActions';


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
  'className': 'custom-popup'
};

var customOptionsForDefaultPopup = {
  'className': 'custom-message'
}

var cantPostOptions = {
  'className': 'cant-post-popup'
};

var posts = {};
var usersAndAvs = [];

const defaultCatPic = "https://kittykatcher.s3.amazonaws.com/default_kitty.svg";
const defaultClaimerPic = "https://image.flaticon.com/icons/svg/763/763778.svg";

class KittyMap extends Component {
  constructor() {
    super();
    this.state = {
      lat: 40.7645,
      lng: -73.9602,
      zoom: 13,
      maxZoom: 19,
      displayForm: false,
      displayCantPost: false,
      justMounted: true,
      displayingAllPosts: false
    };
  }

  componentDidMount() {
    //  make API calls
    this.props.getAllPosts();
    this.props.getUsersAndAvatars();
    this.setState({
      justMounted: false
    });
  }

  componentDidUpdate() {
    if (!this.state.displayingAllPosts && !this.props.posts.isLoading && !this.props.auth.allUsersAndAvatarsLoading && !this.state.justMounted) {
      const map = this.refs.map.leafletElement;
      const { allPosts } = this.props.posts;
      const { usersAndAvatars } = this.props.auth;
      usersAndAvatars.forEach(user => {
        usersAndAvs[user.username] = user.avatar;
      });
      this.addAllMarkers(map, allPosts);
      this.setState({
        displayingAllPosts: true
      });
    }
  }

  addAllMarkers(map, allPosts) {      
    allPosts.forEach(post => {
      var feat = this.createGeoJSON(post);
      L.geoJSON(feat, {
        pointToLayer: (feature, latlng) => {
          return L.marker(latlng, {icon: myIcon}).bindPopup(`
            ${this.createPopup(feature)}
          `, customOptions);
        }
      }).addTo(map);
    });
  }

  createPopup(feature) {
    return(`
      <div class="my-grid">
        <div class="status-area text-font white-color">
          Status: ${feature.properties.status}
        </div>

        <div class="post-title headline-font white-color">
          <span>${feature.properties.title}</span>
        </div>

        <div class="picture-area">
          <img src=${feature.properties.images[0] ? `${feature.properties.images[0]}`: defaultCatPic} alt="pic" />
        </div>

        <div class="info-area">
          <div>
            <span class="headline-font">Age:</span> 
            <br/> 
            <span class="text-font">${feature.properties.age}</span>
          </div> 
          <div>
            <span class="headline-font">Coat Colors:</span>
            <br/> 
            <span class="text-font">${feature.properties.furColors}</span>
          </div>
          <div>
            <span class="headline-font">Friendliness:</span>
            <br/>
            <span class="text-font">${feature.properties.friendly}</span>
          </div>
        </div>
        
        <div class="more-info-area">
          <span class="headline-font">Sex:</span>
          <br/>
          <span class="text-font">${feature.properties.sex}</span>

          <br/>

          <span class="headline-font">Coat Pattern:</span>
          <br/>
          <span class="text-font">${feature.properties.furPattern}</span>

          <br/>

          <span class="headline-font">Other Info:</span>
          <br/> 
          <span class="text-font">${feature.properties.otherInfo ? `${feature.properties.otherInfo}`: "none"}</span>
        </div>

        <div class="separates divider"></div>

        <div class="posted-by">
          <img class="post-pic" src=${usersAndAvs[feature.properties.user]} alt="Profile picture of user who claimed this post" />
          <span class="poster-name sub-heading-font">${feature.properties.user}</span>
        </div>
        <div class="claimed-by">
          <img class="claim-pic" src=${feature.properties.claimerUsername ? `No pic`: defaultClaimerPic} alt="Profile picture of user who claimed this post" />
          <span class="claimer-name sub-heading-font">${feature.properties.claimerUsername ? `${feature.properties.claimerUsername}`: "No one has claimed this post yet"}</span>
        </div>

        <div class="posted-date">
          <span class="text-font">${(new Date(feature.properties.datePosted)).toDateString()}</span>
        </div>
        <div class="claimed-date">                
          <span class="text-font">${feature.properties.dateClaimed ? `${(new Date(feature.properties.dateClaimed)).toDateString()}`: ""}</span>
        </div>

        <div class="prev-status">
          <span class="text-font white-color">Last Status Update: ${(new Date(feature.properties.dateOfLastStatusChange)).toDateString()}</span>
        </div>
      </div>
    `);
  }

  createGeoJSON(singlePost) {
    var colors = singlePost.furColors.toString().split(',').join(', ');

    var friendliness = singlePost.friendly.split('F').join(' f'); //take out once new db created

    var feature = {
      "type"    : "Feature",
      "geometry"  : {
        "type"        : "Point",
        "coordinates" : [singlePost.location.coordinates[1], singlePost.location.coordinates[0]]
      },
      "properties"  : {
        "title": singlePost.title,
        "user": singlePost.posterUsername,
        "claimer": singlePost.claimerUsername,
        "images": singlePost.pics,
        "age": singlePost.age,
        "sex": singlePost.sex,
        "furColors": colors,
        "furPattern": singlePost.furPattern,
        "friendly": friendliness,
        "status": singlePost.status,
        "datePosted": singlePost.datePosted,
        "dateClaimed": singlePost.dateClaimed,
        "dateOfLastStatusChange": singlePost.dateOfLastStatusChange,
        "otherInfo": singlePost.otherInfo
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
      newMarker.bindPopup("Fill out the form below to add a cat to the map at this spot!", customOptionsForDefaultPopup).openPopup();
      if (!this.state.displayForm) {
        this.display();
      }
      if (this.state.displayCantPost) {
        this.setState({
          displayCantPost: !this.displayCantPost
        })
      }
    } else {
      newMarker.bindPopup("Whoa there!", cantPostOptions).openPopup();
      if (!this.state.displayCantPost) {
        this.setState({
          displayCantPost: !this.displayCantPost
        })
      }
    }
  }

  render() {
    if (this.state.justMounted || this.props.posts.isLoading || this.props.auth.allUsersAndAvatarsLoading) {
      return (
        <MapLoading />
      );
    } else {
      const position = [this.state.lat, this.state.lng];

      return (
        <div className="container">
          <div className="row">
            <div className="center col s12">
              <h5 className="sub-heading-font">Add A Kitty To The Map!</h5>
            </div>
          </div>
          <div className="row">
            <div className="col s12">
              <Map ref="map" style={mapStyle} center={position} zoom={this.state.zoom} maxZoom={this.state.maxZoom} onClick={this.handleClick}>
                <TileLayer
                  attribution='Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>'
                  url='https://api.mapbox.com/styles/v1/lashanatello/ckfdma8al0rc119p7z99atbnx/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoibGFzaGFuYXRlbGxvIiwiYSI6ImNqdmNqa3N4bjFxNTI0NG4zd3o1dW5vZjQifQ.Cfda4jCnOw6cgsAdziXaUg'
                />
                <Marker position={position} icon={myIcon}>
                  <Popup className="custom-message">
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
}

KittyMap.propTypes = {
  getAllPosts: PropTypes.func.isRequired,
  getUsersAndAvatars: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  posts: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  posts: state.posts
});

export default connect(mapStateToProps, { getAllPosts, getUsersAndAvatars })(KittyMap);