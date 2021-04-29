import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../store/actions/authActions';
import M from 'materialize-css';

class Dashboard extends Component {
  componentDidMount() {
    M.Tabs.init(this.Tabs);
    M.Dropdown.init(this.Dropdown);
  }

  render() {
    const { user } = this.props.auth;
    const example = ["thing 1", "thing 2", "thing 3", "thing 4", "thing 5", "thing 6"];

    return (
      <div style={{ height: "75vh" }} className="container">
        <div className="row">
          <div className="col s12">
            <p></p>
          </div>
          <div className="col s12 center-align">
            <div className="dashboard-avatar col s4">
              <img src="https://i.natgeofe.com/n/4f5aaece-3300-41a4-b2a8-ed2708a0a27c/domestic-dog_thumb.jpg" />
            </div>
            <div className="col s8">
              <div>
                <div className="col s6 left-align">
                  <h4>
                    Welcome, <b>{user.username}</b>!
                  </h4>
                </div>
                <div className="col s1 offset-s4 right-align">
                  <a className="btn"><i className="material-icons icon-size">chat</i></a>
                </div>
                <div className="col s1 right-align">
                  <a className="btn"><i className="material-icons icon-size">settings</i></a>
                </div>
              </div>
              <div className="col s12">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec convallis nibh at hendrerit euismod. Suspendisse maximus a tellus eu lacinia. Vivamus nec ante ac purus efficitur suscipit. Sed blandit, mi quis fermentum fringilla, eros mauris cursus augue, et tempor lorem nibh quis tortor. Phasellus massa mi, ultrices eget imperdiet ut, blandit id eros. Sed et tortor aliquet, aliquam justo ultrices, scelerisque tortor. Sed vitae commodo est. Suspendisse a felis ut neque suscipit tempus. Nunc in mattis leo. Curabitur sem leo, viverra sit amet suscipit et, tempor a semhjjjjjjj jhjhhjhj hjhjjhhj j.
              </div>
              <div className="col s12">
                <p></p>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="add-spacing col s12">
            <ul ref={Tabs => { this.Tabs = Tabs; }} className="tabs">
              <li className="tab col s4"><a href="#test1">Your Posts</a></li>
              <li className="tab col s4"><a href="#test2">Claimed Posts</a></li>
              <li className="tab col s4"><a href="#test3">Favorited Posts</a></li>
            </ul>
          </div>
          <div className="col s4">
            <a ref={Dropdown => { this.Dropdown = Dropdown; }} className='dropdown-trigger btn' href='#' data-target='dropdown1'>Sort By</a>

            <ul id='dropdown1' className='dropdown-content'>
             <li><a href="#!">Date (New to Old)</a></li>
             <li><a href="#!">Date (Old to New)</a></li>
             <li><a href="#!">Title (A-Z)</a></li>
             <li><a href="#!">Title (Z-A)</a></li>
             <li><a href="#!">Status</a></li>
            </ul>
          </div>
          <div id="test1" className="add-spacing col s12 center-align">Test 1</div>
          <div id="test2" className="add-spacing col s12 center-align">Test 2</div>
          <div id="test3" className="add-spacing col s12 center-align">
            {example.map((i,key) => {
              return (
                <a href="#">
                  <div key={key} className="col s12 m4">
                    <div className="card blue-grey">
                      <div className="card-content white-text">
                        <span className="card-title">{i}</span>
                        <p>I am a very simple card. I am good at containing small bits of information.
                        I am convenient because I require little markup to use effectively.</p>
                      </div>
                    </div>
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { logoutUser })(withRouter(Dashboard));
