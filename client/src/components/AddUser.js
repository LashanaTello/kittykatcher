import React, { Component } from 'react';

class AddUser extends Component {
	state = {
		username: null,
		email: null,
		password: null,
		password2: null
	}

	handleChange = (e) => {
		this.setState({
			[e.target.id]: e.target.value
		})
	}

	handleSubmit = (e) => {
		e.preventDefault();
		console.log(this.state);
	}

	render() {
		return (
			<div className="container">
				<h4 className="center">Register!</h4>
				<form onSubmit={this.handleSubmit} >
					<label htmlFor="username">Username:</label>
					<input type="text" id="username" onChange={this.handleChange} />
					<label htmlFor="email">Email:</label>
					<input type="email" id="email" onChange={this.handleChange} />
					<label htmlFor="password">Password:</label>
					<input type="password" id="password" onChange={this.handleChange} />
					<label htmlFor="password2">Confirm Password:</label>
					<input type="password" id="password2" onChange={this.handleChange} />
					<button>Register</button>
				</form>
			</div>
		)
	}
}

export default AddUser