import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../store/actions/authActions';
import M from 'materialize-css';

class Dashboard extends Component {
  handleLogout = (e) => {
    e.preventDefault();
    this.props.logoutUser();
    this.props.history.push("/");
  };

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
          <div className="col s12 center-align">
            <h4>
              <b>Hey there,</b> {user.username}
              <p className="flow-text grey-text text-darken-1">You are logged in!</p>
            </h4>
          </div>
          <div className="col s12 center-align">
            <div className="col s4">
              avatar
            </div>
            <div className="col s8">
              <div className="">
                <div className="col s6 left-align">
                  username
                </div>
                <div className="col s2 offset-s2 right-align">
                  messages
                </div>
                <div className="col s2 right-align">
                  settings
                </div>
              </div>
              <div className="col s12">
                bio
              </div>
              <div className="col s6">
                phone
              </div>
              <div className="col s6">
                email
              </div>
              <div className="col s2 offset-s3">
                social 1
              </div>
              <div className="col s2">
                social 2
              </div>
              <div className="col s2">
                social 3
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
