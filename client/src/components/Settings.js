import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getEmail, changeMyUsername, logoutUser, changeMyEmail } from '../store/actions/authActions';

const successMessage = <div className="center"><span className="green-text">SUCCESS!</span> You will be logged out in 3 seconds...</div>;

class Settings extends Component {
  state = {
    changeEmailShown: false,
    changeUsernameShown: false,
    changePasswordShown: false,
    newUsername: "",
    newUsername2: "",
    oldEmail: "",
    newEmail: "",
    newEmail2: "",
    success: false,
    initiateNewUsername: false,
    initiateNewEmail: false
  }

  componentDidMount() {
    const { user } = this.props.auth;
    this.props.getEmail(user.username);
  }

  componentDidUpdate(prevProps) {
    // wait for email to load
    if (!this.props.auth.emailLoading) {
      console.log(this.props.auth.email)
    }

    if ((this.state.initiateNewUsername === true) && (prevProps.auth.changeUsernameSuccess !== this.props.auth.changeUsernameSuccess)) {
      this.setState({
        success: !this.state.success
      });
      setTimeout(() => {
        this.props.logoutUser()
      }, 3000);
    }

    if ((this.state.initiateNewEmail === true) && (prevProps.auth.changeEmailSuccess !== this.props.auth.changeEmailSuccess)) {
      this.setState({
        success: !this.state.success
      });
      setTimeout(() => {
        this.props.logoutUser()
      }, 3000);
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

  handleUsernameSubmit = (e) => {
    e.preventDefault();

    const { user } = this.props.auth;
    const userData = {
      email: this.props.auth.email,
      username: user.username,
      newUsername: this.state.newUsername,
      newUsername2: this.state.newUsername2
    };

    this.setState({
      initiateNewUsername: !this.state.initiateNewUsername
    })
    this.props.changeMyUsername(userData);
  }

  handleEmailSubmit = (e) => {
    e.preventDefault();

    //const { user } = this.props.auth;
    const userData = {
      email: this.props.auth.email,
      newEmail: this.state.newEmail,
      newEmail2: this.state.newEmail2
    };

    this.setState({
      initiateNewEmail: !this.state.initiateNewEmail
    })
    this.props.changeMyEmail(userData);
  }

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
    console.log(e.target.value)
  }

  render() {
    const { user } = this.props.auth;
    console.log(this.props.auth);

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
            <p className="col s5">{this.props.auth.email}</p>
            <button className="btn col s2" onClick={this.showEmailForm}>Change Email</button>
          </div>
          <div className="col s12">
            <p className="col s3 right-align">Username:</p>
            <p className="col s5">{user.username}</p>
            <button className="btn col s2" onClick={this.showUsernameForm}>Change Username</button>
          </div>
          <div className=""></div>
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
                  {
                    this.state.success && successMessage
                  }
                  <div className="col s12">
                    <p className="col s3 offset-s1 right-align">Old Email:</p>
                    <p className="col s6">
                      <label>
                        <input type="text" id="oldEmail" onChange={this.handleChange} required />
                      </label>
                    </p>
                  </div>
                  <div className="col s12">
                    <p className="col s3 offset-s1 right-align">New Email:</p>
                    <p className="col s6">
                      <label>
                        <input type="text" id="newEmail" onChange={this.handleChange} required />
                      </label>
                    </p>
                  </div>
                  <div className="col s12">
                    <p className="col s3 offset-s1 right-align">Confirm New Email:</p>
                    <p className="col s6">
                      <label>
                        <input type="text" id="newEmail2" onChange={this.handleChange} required />
                      </label>
                    </p>
                  </div>
                  <button className="col s2 offset-s5 btn center-align" onClick={this.handleEmailSubmit}>Confirm</button>
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
                  {
                    this.state.success && successMessage
                  }
                  <div className="col s12">
                    <p className="col s3 offset-s1 right-align">New Username:</p>
                    <p className="col s6">
                      <label>
                        <input type="text" id="newUsername" onChange={this.handleChange} required />
                      </label>
                    </p>
                  </div>
                  <div className="col s12">
                    <p className="col s3 offset-s1 right-align">Confirm New Username:</p>
                    <p className="col s6">
                      <label>
                        <input type="text" id="newUsername2" onChange={this.handleChange} required />
                      </label>
                    </p>
                  </div>
                  <button className="col s2 offset-s5 btn center-align" onClick={this.handleUsernameSubmit}>Confirm</button>
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
                        <input type="text" id="oldPassword" onChange={this.handleChange} required />
                      </label>
                    </p>
                  </div>
                  <div className="col s12">
                    <p className="col s3 offset-s1 right-align">New Password:</p>
                    <p className="col s6">
                      <label>
                        <input type="text" id="newPassword" onChange={this.handleChange} required />
                      </label>
                    </p>
                  </div>
                  <div className="col s12">
                    <p className="col s3 offset-s1 right-align">Confirm New Password:</p>
                    <p className="col s6">
                      <label>
                        <input type="text" id="newPassword2" onChange={this.handleChange} required />
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
  getEmail: PropTypes.func.isRequired,
  changeMyUsername: PropTypes.func.isRequired,
  changeMyEmail: PropTypes.func.isRequired,
  logoutUser: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { getEmail, changeMyUsername, logoutUser, changeMyEmail })(withRouter(Settings));
