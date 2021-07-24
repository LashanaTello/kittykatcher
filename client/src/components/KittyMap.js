import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Map, Marker, Popup, TileLayer, MapControl, withLeaflet } from 'react-leaflet';
import MapLoading from './MapLoading';
import MapSidebar from './MapSidebar';
import { getUsersAndAvatars } from '../store/actions/authActions';
import { getAllPosts } from '../store/actions/postActions';
import { mapboxToken, locationIqToken } from '../apiKeys';
import { GeoSearchControl, LocationIQProvider } from 'leaflet-geosearch';


var pawIcon = L.icon({
  iconUrl: 'https://kittykatcher.s3.amazonaws.com/animal-prints.svg',
  iconSize: [40, 40],
  iconAnchor: [22, 30],
  popupAnchor: [-2, -25]
});

class SearchControl extends MapControl {
  createLeafletElement() {
    const provider = new LocationIQProvider({
      params: {
        key: locationIqToken,
      },
    });
    return GeoSearchControl({
      provider: provider,
      autoCompleteDelay: 500,
      position: 'topleft',
      style: 'button',
      showMarker: true,
      showPopup: false,
      marker: {
        icon: pawIcon,
        draggable: false,
      },
      autoClose: true,
      retainZoomLevel: false,
      animateZoom: true,
      keepResult: true,
      searchLabel: 'search...'
    });
  }
}

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

var usersAndAvs = [];

const defaultCatPic = "https://kittykatcher.s3.amazonaws.com/default_kitty.svg";
const defaultClaimerPic = "https://image.flaticon.com/icons/svg/763/763778.svg";

L.Marker.include({
    posterUsername: "",
    claimerUsername: "",
    myTitle: "",
    images: [],
    age: "",
    sex: "",
    furColors: [],
    furPattern: [],
    friendly: "",
    status: "",
    datePosted: "",
    dateClaimed: "",
    dateOfLastStatusChange: "",
    otherInfo: "",

    setAllProperties: function(feature) {
      this.posterUsername = feature.properties.user;
      this.claimerUsername = feature.properties.claimer;
      this.myTitle = feature.properties.title;
      this.images = feature.properties.images;
      this.age = feature.properties.age;
      this.sex = feature.properties.sex;
      this.furColors = feature.properties.furColors;
      this.furPattern = feature.properties.furPattern;
      this.friendly = feature.properties.friendly;
      this.status = feature.properties.status;
      this.datePosted = feature.properties.datePosted;
      this.dateClaimed = feature.properties.dateClaimed;
      this.dateOfLastStatusChange = feature.properties.dateOfLastStatusChange;
      this.otherInfo = feature.properties.otherInfo;
    },

    getAllProperties: function() {
      const post = {
        posterUsername: this.posterUsername,
        claimerUsername: this.claimerUsername,
        myTitle: this.myTitle,
        images: this.images,
        age: this.age,
        sex: this.sex,
        furColors: this.furColors,
        furPattern: this.furPattern,
        friendly: this.friendly,
        status: this.status,
        datePosted: this.datePosted,
        dateClaimed: this.dateClaimed,
        dateOfLastStatusChange: this.dateOfLastStatusChange,
        otherInfo: this.otherInfo
      };
      return post;
    }
});

class KittyMap extends Component {
  constructor() {
    super();
    this.state = {
      mapStyle: {
        height: '85vh'
      },
      lat: 40.7645,
      lng: -73.9602,
      zoom: 13,
      maxZoom: 19,
      displayForm: false,
      displayCantPost: false,
      justMounted: true,
      displayingAllPosts: false,
      showingSidebar: false,
      newMarkerCoords: {},
      currentPost: {},
      markerClicked: false
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
      L.control.attribution({
        position: 'bottomleft'
      }).addTo(map);
    }
  }

  addAllMarkers(map, allPosts) {
    allPosts.forEach(post => {
      var feat = this.createGeoJSON(post);
      L.geoJSON(feat, {
        pointToLayer: (feature, latlng) => {
          let aMarker = new L.marker(latlng, {icon: myIcon});
          aMarker.setAllProperties(feature);
          aMarker.bindPopup(`
            ${this.createPopup(feature)}
          `, customOptions).on('click', () => {
              map.flyTo(latlng, 16);
              this.toggleOff();
              this.setState({
                currentPost: aMarker.getAllProperties(),
                showingSidebar: true,
                markerClicked: true
              });
          });
          return aMarker;
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
          <img class="post-pic" src=${usersAndAvs[feature.properties.user]} alt="Profile picture of user who made this post" />
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

  handleClick = (e) => {
    this.setState({
      showingSidebar: true
    })
    const map = this.refs.map.leafletElement;

    if (map != null) {
      if (newMarker !== undefined) {
        map.removeLayer(newMarker);
      }
      newMarker = new L.Marker(e.latlng, {icon: myIcon});
      map.addLayer(newMarker);
      this.setState({
        newMarkerCoords: newMarker.getLatLng()
      })
      map.flyTo(newMarker.getLatLng(), 16)
    }

    if (this.props.auth.isAuthenticated) {
      newMarker.on('click', () => {
        map.flyTo(newMarker.getLatLng(), 16)
        this.toggleOff();
        this.setState({
          displayForm: true
        });
      });
      newMarker.bindPopup('Fill out the form to the right to add a cat to the map at this spot!', customOptionsForDefaultPopup).openPopup();
      this.toggleOff();
      this.setState({
        displayForm: !this.state.displayForm
      });
    } else {
      newMarker.on('click', () => {
          map.flyTo(newMarker.getLatLng(), 16)
          this.toggleOff();
          this.setState({
            displayCantPost: true
          });
      });
      newMarker.bindPopup("Whoa there!", cantPostOptions).openPopup();
      this.toggleOff();
      this.setState({
        displayCantPost: !this.displayCantPost
      })
    }
  }

  showSidebar = () => {
    this.setState({
      showingSidebar: !this.state.showingSidebar
    })
  }

  toggleOff = () => {
    //  only one thing can be shown in the sidebar at a time so only one
    //  should be true at a time
    //  make everything false first and then the one that needs to be true
    //  will set itself to true
    this.setState({
      displayForm: false,
      displayCantPost: false,
      markerClicked: false
    })
  }

  render() {
    console.log(this.state.currentPost);
    if (this.state.justMounted || this.props.posts.isLoading || this.props.auth.allUsersAndAvatarsLoading) {
      return (
        <MapLoading />
      );
    } else {
      const position = [this.state.lat, this.state.lng];
      const GeoSearch = withLeaflet(SearchControl);

      return (
        <div className="">
          <div className="row">
            <div className="center col s12">
              <h5 className="sub-heading-font">Add A Kitty To The Map!</h5>
            </div>
          </div>
          <div className="map-container">
            <div className="my-map">
              <Map ref="map" style={this.state.mapStyle} center={position} zoom={this.state.zoom} maxZoom={this.state.maxZoom} onClick={this.handleClick}>
                <TileLayer
                  attribution='Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>'
                  url={`https://api.mapbox.com/styles/v1/lashanatello/ckfdma8al0rc119p7z99atbnx/tiles/256/{z}/{x}/{y}@2x?access_token=${mapboxToken}`}
                />
                <GeoSearch />
                <Marker position={position} icon={myIcon}>
                  <Popup className="custom-message">
                    Click anywhere on the map to add a cat at that location to the map!
                  </Popup>
                </Marker>
              </Map>
            </div>
            {
              this.state.markerClicked ? (this.state.showingSidebar && <MapSidebar showSidebar={this.showSidebar} markerClicked={this.state.markerClicked} post={this.state.currentPost} />) :
              (this.state.displayForm ? (this.state.showingSidebar && <MapSidebar showSidebar={this.showSidebar} showForm={this.state.displayForm} newCoords={this.state.newMarkerCoords} />) :
                (this.state.showingSidebar && <MapSidebar showSidebar={this.showSidebar} showCant={this.state.displayCantPost} />))
            }
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
