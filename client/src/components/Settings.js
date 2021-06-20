import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getEmail } from '../store/actions/authActions';

class Settings extends Component {
  state = {
    changeEmailShown: false,
    changeUsernameShown: false,
    changePasswordShown: false
  }

  componentDidMount() {
    const { user } = this.props.auth;
    this.props.getEmail(user.username);
  }

  componentDidUpdate(prevProps) {
    const { user } = this.props.auth;

    // wait for email to load
    if (!this.props.auth.emailLoading) {
      console.log(this.props.auth.email)
    }
  }

  showEmailForm = () => {
    this.setState({
      changeEmailShown: !this.state.changeEmailShown
    })
  }

  showUsernameForm = () => {
    this.setState({
      changeUsernameShown: !this.state.changeUsernameShown
    })
  }

  showPasswordForm = () => {
    this.setState({
      changePasswordShown: !this.state.changePasswordShown
    })
  }

  closeClicked = () => {
    if (this.state.changeAvatarShown === true) {
      this.setState({
        changeAvatarShown: !this.state.changeAvatarShown
      })
    } else if (this.state.changeEmailShown === true) {
      this.setState({
        changeEmailShown: !this.state.changeEmailShown
      })
    } else if (this.state.changeUsernameShown === true) {
      this.setState({
        changeUsernameShown: !this.state.changeUsernameShown
      })
    } else {
      this.setState({
        changePasswordShown: !this.state.changePasswordShown
      })
    }
  }

  render() {
    const { user } = this.props.auth;
    console.log(this.props.auth.email);

    return (
      <div className="container">
        <div className="row">
          <div className="add-spacing col s12">
            Account Details
          </div>
        </div>
        <div className="row">
          <p className="col s3 right-align">Profile Picture</p>
          <p className="dashboard-avatar col s5"><img src={user.avatar} alt="Your avatar" /></p>
          <button className="btn col s2 move-down" style={{ display: "none"}} onClick={this.showAvatarForm}>Change Avatar</button>
        </div>
        <div className="row">
          <div className="col s12">
            <p className="col s3 right-align">Email Address:</p>
            <p className="col s5">Your email</p>
            <button className="btn col s2" onClick={this.showEmailForm}>Change Email</button>
          </div>
          <div className="col s12">
            <p className="col s3 right-align">Username:</p>
            <p className="col s5">{user.username}</p>
            <button className="btn col s2" onClick={this.showUsernameForm}>Change Username</button>
          </div>
          <div className="col s12">
            <p className="col s3 right-align">Password:</p>
            <p className="col s5">*****</p>
            <button className="btn col s2" onClick={this.showPasswordForm}>Change Password</button>
          </div>

        </div>
        <div className="row">
          <button className="col s2 push-s5 btn red center-align">Delete Account</button>
        </div>

        {
          this.state.changeEmailShown && (
            <div>
              <div className="my-modal" style={{ height: "375px", width: "850px"}}>
                <div className="row">
                  <button className="btn-small right" onClick={this.closeClicked}><i className="material-icons">clear</i></button>
                  <div className="col s12">
                    <p className="col s3 offset-s1 right-align">Old Email:</p>
                    <p className="col s6">
                      <label>
                        <input type="text" name="oldEmail" onChange={this.handleInputChange} required />
                      </label>
                    </p>
                  </div>
                  <div className="col s12">
                    <p className="col s3 offset-s1 right-align">New Email:</p>
                    <p className="col s6">
                      <label>
                        <input type="text" name="newEmail" onChange={this.handleInputChange} required />
                      </label>
                    </p>
                  </div>
                  <div className="col s12">
                    <p className="col s3 offset-s1 right-align">Confirm New Email:</p>
                    <p className="col s6">
                      <label>
                        <input type="text" name="newEmail2" onChange={this.handleInputChange} required />
                      </label>
                    </p>
                  </div>
                  <button className="col s2 offset-s5 btn center-align">Confirm</button>
                </div>
              </div>
              <div className="dim-background"></div>
            </div>
          )
        }
        {
          this.state.changeUsernameShown && (
            <div>
              <div className="my-modal" style={{ height: "300px", width: "850px"}}>
                <div className="row">
                  <button className="btn-small right" onClick={this.closeClicked}><i className="material-icons">clear</i></button>
                  <div className="col s12">
                    <p className="col s3 offset-s1 right-align">New Username:</p>
                    <p className="col s6">
                      <label>
                        <input type="text" name="newUsername" onChange={this.handleInputChange} required />
                      </label>
                    </p>
                  </div>
                  <div className="col s12">
                    <p className="col s3 offset-s1 right-align">Confirm New Username:</p>
                    <p className="col s6">
                      <label>
                        <input type="text" name="newUsername2" onChange={this.handleInputChange} required />
                      </label>
                    </p>
                  </div>
                  <button className="col s2 offset-s5 btn center-align">Confirm</button>
                </div>
              </div>
              <div className="dim-background"></div>
            </div>
          )
        }
        {
          this.state.changePasswordShown && (
            <div>
              <div className="my-modal" style={{ height: "375px", width: "850px"}}>
                <div className="row">
                  <button className="btn-small right" onClick={this.closeClicked}><i className="material-icons">clear</i></button>
                  <div className="col s12">
                    <p className="col s3 offset-s1 right-align">Old Password:</p>
                    <p className="col s6">
                      <label>
                        <input type="text" name="oldPassword" onChange={this.handleInputChange} required />
                      </label>
                    </p>
                  </div>
                  <div className="col s12">
                    <p className="col s3 offset-s1 right-align">New Password:</p>
                    <p className="col s6">
                      <label>
                        <input type="text" name="newPassword" onChange={this.handleInputChange} required />
                      </label>
                    </p>
                  </div>
                  <div className="col s12">
                    <p className="col s3 offset-s1 right-align">Confirm New Password:</p>
                    <p className="col s6">
                      <label>
                        <input type="text" name="newPassword2" onChange={this.handleInputChange} required />
                      </label>
                    </p>
                  </div>
                  <button className="col s2 offset-s5 btn center-align">Confirm</button>
                </div>
              </div>
              <div className="dim-background"></div>
            </div>
          )
        }
      </div>
    );
  }
}

Settings.propTypes = {
  auth: PropTypes.object.isRequired,
  getEmail: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { getEmail })(withRouter(Settings));
