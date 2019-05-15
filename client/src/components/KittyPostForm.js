import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import axios from 'axios';
const FormData = require('form-data');


class KittyPostForm extends Component {
  state = {
    postTitle: null,
    age: null,
    sex: null,
    furColors: [
      {id: 1, value: "black", isChecked: false},
      {id: 2, value: "white", isChecked: false},
      {id: 3, value: "ginger", isChecked: false},
      {id: 4, value: "brown", isChecked: false},
      {id: 5, value: "gray", isChecked: false},
      {id: 6, value: "hairless", isChecked: false}
    ],
    furPattern: null,
    friendly: null,
    details: null,
    fileInput: React.createRef(),
    errors: {}
  }

  handleCheckboxChange = (e) => {
    let colors = [...this.state.furColors];
    colors.forEach(color => {
      if (color.value === e.target.value) {
        color.isChecked = !color.isChecked;
      }
    })
    this.setState({furColors: colors});
  }

  handleInputChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault();

    const colors = this.state.furColors.filter(color => color.isChecked).map(color => color.value);

    const { user } = this.props.auth;

    var coords = [];
    coords.push(this.props.coords.lat);
    coords.push(this.props.coords.lng);


    const form = new FormData();
    form.append("postTitle", this.state.postTitle);
    form.append("age", this.state.age);
    form.append("sex", this.state.sex);
    form.append("furColors", [...colors]);
    form.append("furPattern", this.state.furPattern);
    form.append("friendly", this.state.friendly);
    form.append("details", this.state.details);
    form.append("coords", [...coords]);
    form.append("user", user.username);

    for (var i = 0; i < this.state.fileInput.current.files.length; i++) { 
      form.append("fileInput", this.state.fileInput.current.files[i], this.state.fileInput.current.files[i].name);
    }
    
    //temporarily placed here
    axios({
      method: 'post',
      url: "/api/posts/upload",
      data: form,
      headers: { 
        "Content-Type": `multipart/form-data; boundary=${form._boundary}`
      }
    })
    .then(response => {
        //handle success
        console.log(response);
        console.log("successful");
    })
    .catch(err => {
        //handle error
        console.log(err);
        console.log("failed");
    });
  }

	render() {
		return (
			<div className="container">
				<h4 className="center">Kitty Post</h4>
				<form encType="multipart/form-data" onSubmit={this.handleSubmit}>
					<div className="row">
            <div className="row">
              <div className="input-field col s12">
                <label htmlFor="postTitle">Title (Or Name of Cat):</label>
                <input type="text" id="postTitle" onChange={this.handleChange} required />
              </div>
            </div>
            <div className="row">
              <div className="col s12 m6">
                <p>Age:</p>                                     
                <p>
                  <label>
                    <input type="radio" name="age" value="cat" onChange={this.handleInputChange} required /> 
                    <span>Cat</span>
                  </label>
                </p>
                <p>
                  <label>
                    <input type="radio" name="age" value="kitten" onChange={this.handleInputChange} required /> 
                    <span>Kitten</span>
                  </label>
                </p>                
              </div>
              <div className="col s12 m6">
                <p>Sex:</p>                                     
                <p>
                  <label>
                    <input type="radio" name="sex" value="female" onChange={this.handleInputChange} required /> 
                    <span>Female</span>
                  </label>
                </p>
                <p>
                  <label>
                    <input type="radio" name="sex" value="male" onChange={this.handleInputChange} required /> 
                    <span>Male</span>
                  </label>
                </p>
                <p>
                  <label>
                    <input type="radio" name="sex" value="unknown" onChange={this.handleInputChange} required /> 
                    <span>Unknown</span>
                  </label>
                </p>
              </div>
            </div>
            <div className="row">
              <div className="col s12 m6">
              	<p>Fur Color:</p>                                      
                <p>
                  <label>
                    <input type="checkbox" name="furColors" value="black" onChange={this.handleCheckboxChange} /> 
                    <span>Black</span>
                  </label>
                </p>
                <p>
                  <label>
                    <input type="checkbox" name="furColors" value="white" onChange={this.handleCheckboxChange} /> 
                    <span>White</span>
                  </label>
                </p>
                <p>
                  <label>
                    <input type="checkbox" name="furColors" value="ginger" onChange={this.handleCheckboxChange} /> 
                    <span>Ginger</span>
                  </label>
                </p>
                <p>
                  <label>
                    <input type="checkbox" name="furColors" value="brown" onChange={this.handleCheckboxChange} /> 
                    <span>Brown</span>
                  </label>
                </p>
                <p>
                  <label>
                    <input type="checkbox" name="furColors" value="gray" onChange={this.handleCheckboxChange} /> 
                    <span>Gray</span>
                  </label>
                </p>
                <p>
                  <label>
                    <input type="checkbox" name="furColors" value="hairless" onChange={this.handleCheckboxChange} /> 
                    <span>Hairless</span>
                  </label>
                </p>
              </div>
              <div className="col s12 m6">
                <p>Fur Pattern:</p>                                     
                <p>
                  <label>
                    <input type="radio" name="furPattern" value="solid" onChange={this.handleInputChange} required /> 
                    <span>Solid</span>
                  </label>
                </p>
                <p>
                  <label>
                    <input type="radio" name="furPattern" value="tabbyStriped" onChange={this.handleInputChange} required /> 
                    <span>Tabby-Striped</span>
                  </label>
                </p>
                <p>
                  <label>
                    <input type="radio" name="furPattern" value="tabbySpotted" onChange={this.handleInputChange} required /> 
                    <span>Tabby-Spotted</span>
                  </label>
                </p>
                <p>
                  <label>
                    <input type="radio" name="furPattern" value="tabbyBlotched" onChange={this.handleInputChange} required /> 
                    <span>Tabby-Blotched</span>
                  </label>
                </p>
                <p>
                  <label>
                    <input type="radio" name="furPattern" value="tabbyTicked" onChange={this.handleInputChange} required /> 
                    <span>Tabby-Ticked</span>
                  </label>
                </p>
                <p>
                  <label>
                    <input type="radio" name="furPattern" value="bicolor" onChange={this.handleInputChange} required /> 
                    <span>Bicolor</span>
                  </label>
                </p>
                <p>
                  <label>
                    <input type="radio" name="furPattern" value="tricolor" onChange={this.handleInputChange} required /> 
                    <span>Tricolor</span>
                  </label>
                </p>
                <p>
                  <label>
                    <input type="radio" name="furPattern" value="tortoiseshell" onChange={this.handleInputChange} required /> 
                    <span>Tortoiseshell</span>
                  </label>
                </p>
                <p>
                  <label>
                    <input type="radio" name="furPattern" value="colorpoint" onChange={this.handleInputChange} required /> 
                    <span>Colorpoint</span>
                  </label>
                </p>
                <p>
                  <label>
                    <input type="radio" name="furPattern" value="hairless" onChange={this.handleInputChange} required /> 
                    <span>Hairless</span>
                  </label>
                </p>
              </div>
            </div>
            <div className="row">
              <div className="col s12">
                <p>Is the cat friendly?:</p>                                    	
                <p>
        	        <label>
        	        	<input type="radio" name="friendly" value="friendly" onChange={this.handleInputChange} required /> 
        	        	<span>Friendly (likes hoomans)</span>
        	        </label>
                </p>
        		    <p>
      		        <label>
      		        	<input type="radio" name="friendly" value="somewhatFriendly" onChange={this.handleInputChange} required /> 
      		        	<span>Somewhat Friendly</span>
      		        </label>
        		    </p>
        		    <p>
      		        <label>
      		        	<input type="radio" name="friendly" value="feral" onChange={this.handleInputChange} required /> 
      		        	<span>Feral (hoomans scare me so I run when they get close)</span>
      		        </label>
        		    </p>
              </div>
            </div>
            <div className="row">
              <div className="center col s12">
                <p>Other Info (where the cat likes to be, what time of day do you see them the most, what food do they like to eat, etc...):</p>
                <textarea 
                  name="details" 
                  id="details" 
                  rows="30" 
                  cols="30" 
                  placeholder="Likes chicken more than fish. Always near garbage at local diner around 6pm."
                  onChange={this.handleChange}
                ></textarea>
              </div>
            </div>
            <div className="row">
              <div className="center col s12">
              	<p>Upload any pictures of the cat:</p>
                <input type="file" ref={this.state.fileInput} name="fileInput" accept="image/*" multiple /> 
              </div>
            </div>
            <div className="row">
              <div className="center col s12">
                <button>Post</button>
              </div>
            </div>
          </div>
        </form>
			</div>
		);
	}
}

KittyPostForm.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(KittyPostForm);