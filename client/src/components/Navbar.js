import React, { Component } from 'react';
import { Link, NavLink, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../store/actions/authActions';

class Navbar extends Component {
  handleLogout = (e) => {
    e.preventDefault();
    this.props.logoutUser();
    this.props.history.push("/");
  };

  render() {
    if (this.props.auth.isAuthenticated) {
      const { user } = this.props.auth;
      return (
        <nav className="nav-wrapper" style={{backgroundColor: "#057481"}}>
          <div className="container">
            <Link to="/" className="brand-logo" style={{fontFamily: "'Baloo Thambi', cursive"}}>KittyKatcher</Link>
            <ul className="right" style={{fontFamily: "'Baloo Thambi', cursive"}}>
              <li><NavLink to="/">Home</NavLink></li>
              <li><NavLink to="/dashboard">{user.username}'s Dashboard</NavLink></li>
              <li><NavLink to ="/kittymap">Kitty Map</NavLink></li>
              <button 
                className="btn btn-large waves-effect waves-light hoverable" 
                style={{fontFamily: "'Baloo Thambi', cursive", backgroundColor: "#f49f0a"}} 
                onClick={this.handleLogout}
              >
                Logout
              </button>
            </ul>
          </div>
        </nav>
      );
    } else {
      return (
        <nav className="nav-wrapper" style={{backgroundColor: "#057481"}}>
          <div className="container">
            <Link to="/" className="brand-logo" style={{fontFamily: "'Baloo Thambi', cursive"}}>KittyKatcher</Link>
            <ul className="right" style={{fontFamily: "'Baloo Thambi', cursive"}}>
              <li><NavLink to="/">Home</NavLink></li>
              <li><NavLink to="/login">Login</NavLink></li>
              <li><NavLink to="/register">Register</NavLink></li>
              <li><NavLink to ="/kittymap">Kitty Map</NavLink></li>
            </ul>
          </div>
        </nav>
      );
    }
  }
}

Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { logoutUser })(withRouter(Navbar));