import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { registerUser } from '../store/actions/authActions';
import classnames from 'classnames';

class Register extends Component {
  state = {
    username: null,
    email: null,
    password: null,
    password2: null,
    errors: {},
    avatar: null
  }

  componentDidMount() {
    // If logged in and user navigates to Register page, should redirect them to dashboard
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }

  handleInputChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2,
      avatar: this.state.avatar
    };

    this.props.registerUser(newUser, this.props.history);
  }

  render() {
    const { errors } = this.state;
    return (
      <div className="container">
        <h4 className="center">Register!</h4>
        <form onSubmit={this.handleSubmit}>
          <div className="row">
            <div className="input-field col s12">
              <label htmlFor="username">Username:</label>
              <input type="text" id="username" onChange={this.handleChange} error={errors.username} className={classnames("", { invalid: errors.username })} />
              <span className="red-text">{errors.username}</span>
            </div>
          </div>
          <div className="row">
            <div className="input-field col s12">
              <label htmlFor="email">Email:</label>
              <input type="email" id="email" onChange={this.handleChange} error={errors.email} className={classnames("", { invalid: errors.email })} />
              <span className="red-text">{errors.email}</span>
            </div>
          </div>
          <div className="row">
            <div className="input-field col s12">
              <label htmlFor="password">Password:</label>
              <input type="password" id="password" onChange={this.handleChange} error={errors.password} className={classnames("", { invalid: errors.password })} />
              <span className="red-text">{errors.password}</span>
            </div>
          </div>
          <div className="row">
            <div className="input-field col s12">
              <label htmlFor="password2">Confirm Password:</label>
              <input type="password" id="password2" onChange={this.handleChange} error={errors.password2} className={classnames("", { invalid: errors.password2 })} />
              <span className="red-text">{errors.password2}</span>
            </div>
          </div>
          <div className="special-radio">
            <div className="row">
              <p className="center" style={{fontSize: "2vw", fontFamily: "'Fredoka One', cursive"}}>
                Pick an avatar!
              </p>
            </div>
            <div className="row">
              <p className="col s1">
                <label>
                  <input type="radio" name="avatar" value="https://image.flaticon.com/icons/svg/245/245545.svg" onChange={this.handleInputChange} error={errors.avatar} className={classnames("", { invalid: errors.avatar })} required /> 
                  <img src="https://image.flaticon.com/icons/svg/245/245545.svg" alt="blue outline of a cat's face"/>
                </label>
              </p>
              <p className="col s1">
                <label>
                  <input type="radio" name="avatar" value="https://image.flaticon.com/icons/svg/245/245587.svg" onChange={this.handleInputChange} required /> 
                  <img src="https://image.flaticon.com/icons/svg/245/245587.svg" alt="red outline of a cat's face"/>
                </label>
              </p>
              <p className="col s1">
                <label>
                  <input type="radio" name="avatar" value="https://image.flaticon.com/icons/svg/740/740071.svg" onChange={this.handleInputChange} required /> 
                  <img src="https://image.flaticon.com/icons/svg/740/740071.svg" alt="gray robot cat head"/>
                </label>
              </p>
              <p className="col s1">
                <label>
                  <input type="radio" name="avatar" value="https://image.flaticon.com/icons/svg/739/739908.svg" onChange={this.handleInputChange} required /> 
                  <img src="https://image.flaticon.com/icons/svg/739/739908.svg" alt="blue robot cat head"/>
                </label>
              </p>
              <p className="col s1">
                <label>
                  <input type="radio" name="avatar" value="https://image.flaticon.com/icons/svg/141/141873.svg" onChange={this.handleInputChange} required /> 
                  <img src="https://image.flaticon.com/icons/svg/141/141873.svg" alt="calico cat face"/>
                </label>
              </p>
              <p className="col s1">
                <label>
                  <input type="radio" name="avatar" value="https://image.flaticon.com/icons/svg/1818/1818343.svg" onChange={this.handleInputChange} required /> 
                  <img src="https://image.flaticon.com/icons/svg/1818/1818343.svg" alt="black cat face"/>
                </label>
              </p>                        
              <p className="col s1">
                <label>
                  <input type="radio" name="avatar" value="https://image.flaticon.com/icons/svg/1818/1818335.svg" onChange={this.handleInputChange} required /> 
                  <img src="https://image.flaticon.com/icons/svg/1818/1818335.svg" alt="light brown cat face with green eyes"/>
                </label>
              </p>
              <p className="col s1">
                <label>
                  <input type="radio" name="avatar" value="https://image.flaticon.com/icons/svg/1818/1818357.svg" onChange={this.handleInputChange} required /> 
                  <img src="https://image.flaticon.com/icons/svg/1818/1818357.svg" alt="brown cat face with hazel eyes"/>
                </label>
              </p>
              <p className="col s1">
                <label>
                  <input type="radio" name="avatar" value="https://image.flaticon.com/icons/svg/141/141874.svg" onChange={this.handleInputChange} required /> 
                  <img src="https://image.flaticon.com/icons/svg/141/141874.svg" alt="light brown and white cat face with green eyes"/>
                </label>
              </p>
              <p className="col s1">
                <label>
                  <input type="radio" name="avatar" value="https://image.flaticon.com/icons/svg/141/141866.svg" onChange={this.handleInputChange} required /> 
                  <img src="https://image.flaticon.com/icons/svg/141/141866.svg" alt="light gray cat face with blue eyes"/>
                </label>
              </p>
              <p className="col s1">
                <label>
                  <input type="radio" name="avatar" value="https://image.flaticon.com/icons/svg/141/141862.svg" onChange={this.handleInputChange} required /> 
                  <img src="https://image.flaticon.com/icons/svg/141/141862.svg" alt="orange cat face with green eyes"/>
                </label>
              </p>
              <p className="col s1">
                <label>
                  <input type="radio" name="avatar" value="https://image.flaticon.com/icons/svg/826/826380.svg" onChange={this.handleInputChange} required /> 
                  <img src="https://image.flaticon.com/icons/svg/826/826380.svg" alt="orange cat face with blue eyes"/>
                </label>
              </p>
            </div>
            <div className="row">
              <p className="col s1">
                <label>
                  <input type="radio" name="avatar" value="https://image.flaticon.com/icons/svg/826/826464.svg" onChange={this.handleInputChange} required /> 
                  <img src="https://image.flaticon.com/icons/svg/826/826464.svg" alt="gray and brown cat face with blue eyes"/>
                </label>
              </p>            
              <p className="col s1">
                <label>
                  <input type="radio" name="avatar" value="https://image.flaticon.com/icons/svg/1818/1818567.svg" onChange={this.handleInputChange} required /> 
                  <img src="https://image.flaticon.com/icons/svg/1818/1818567.svg" alt="dark brown cat face with blue eyes"/>
                </label>
              </p>         
              <p className="col s1">
                <label>
                  <input type="radio" name="avatar" value="https://image.flaticon.com/icons/svg/1818/1818468.svg" onChange={this.handleInputChange} required /> 
                  <img src="https://image.flaticon.com/icons/svg/1818/1818468.svg" alt="brown cat"/>
                </label>
              </p>
              <p className="col s1">
                <label>
                  <input type="radio" name="avatar" value="https://image.flaticon.com/icons/svg/1818/1818417.svg" onChange={this.handleInputChange} required /> 
                  <img src="https://image.flaticon.com/icons/svg/1818/1818417.svg" alt="brown cta with yellow bow"/>
                </label>
              </p>
              <p className="col s1">
                <label>
                  <input type="radio" name="avatar" value="https://image.flaticon.com/icons/svg/1818/1818310.svg" onChange={this.handleInputChange} required /> 
                  <img src="https://image.flaticon.com/icons/svg/1818/1818310.svg" alt="brown and black spotted cat"/>
                </label>
              </p>
              <p className="col s1">
                <label>
                  <input type="radio" name="avatar" value="https://image.flaticon.com/icons/svg/1818/1818424.svg" onChange={this.handleInputChange} required /> 
                  <img src="https://image.flaticon.com/icons/svg/1818/1818424.svg" alt="brown and yellow spotted cat"/>
                </label>
              </p>
              <p className="col s1">
                <label>
                  <input type="radio" name="avatar" value="https://image.flaticon.com/icons/svg/1818/1818389.svg" onChange={this.handleInputChange} required /> 
                  <img src="https://image.flaticon.com/icons/svg/1818/1818389.svg" alt="gray cat in brown box"/>
                </label>
              </p>
              <p className="col s1">
                <label>
                  <input type="radio" name="avatar" value="https://image.flaticon.com/icons/svg/1818/1818461.svg" onChange={this.handleInputChange} required /> 
                  <img src="https://image.flaticon.com/icons/svg/1818/1818461.svg" alt="white cat in purple mug"/>
                </label>
              </p>
              <p className="col s1">
                <label>
                  <input type="radio" name="avatar" value="https://image.flaticon.com/icons/svg/1818/1818298.svg" onChange={this.handleInputChange} required /> 
                  <img src="https://image.flaticon.com/icons/svg/1818/1818298.svg" alt="gray cat"/>
                </label>
              </p>
              <p className="col s1">
                <label>
                  <input type="radio" name="avatar" value="https://image.flaticon.com/icons/svg/1818/1818390.svg" onChange={this.handleInputChange} required /> 
                  <img src="https://image.flaticon.com/icons/svg/1818/1818390.svg" alt="light gray cat"/>
                </label>
              </p>
              <p className="col s1">
                <label>
                  <input type="radio" name="avatar" value="https://image.flaticon.com/icons/svg/1818/1818284.svg" onChange={this.handleInputChange} required /> 
                  <img src="https://image.flaticon.com/icons/svg/1818/1818284.svg" alt="excited gray cat"/>
                </label>
              </p>
              <p className="col s1">
                <label>
                  <input type="radio" name="avatar" value="https://image.flaticon.com/icons/svg/763/763732.svg" onChange={this.handleInputChange} required /> 
                  <img src="https://image.flaticon.com/icons/svg/763/763732.svg" alt="cat dressed up as wrestler"/>
                </label>
              </p>
            </div>

            <span className="red-text">{errors.avatar}</span>
          </div>
          <div className="row">
            <div className="center input-field col s12">
              <button className="btn" style={{backgroundColor: "#f49f0a"}}>Register</button>
            </div>
          </div>
        </form>
      </div>
    )
  }
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, { registerUser })(withRouter(Register));