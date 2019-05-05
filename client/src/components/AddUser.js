import React, { Component } from 'react';

class AddUser extends Component {
	state = {
		username: null,
		email: null,
		password: null,
		password2: null,
		errors: {}
	}

	handleChange = (e) => {
		this.setState({
			[e.target.id]: e.target.value
		})
	}

	handleSubmit = (e) => {
		e.preventDefault();
		const newUser = {
	      name: this.state.name,
	      email: this.state.email,
	      password: this.state.password,
	      password2: this.state.password2
   		};

		console.log(newUser);
		//console.log(this.state);
	}

	render() {
		const { errors } = this.state;
		return (
			<div className="container">
				<h4 className="center">Register!</h4>
				<form onSubmit={this.handleSubmit} >
					<label htmlFor="username">Username:</label>
					<input type="text" id="username" onChange={this.handleChange} error={errors.username} />
					<label htmlFor="email">Email:</label>
					<input type="email" id="email" onChange={this.handleChange} error={errors.email} />
					<label htmlFor="password">Password:</label>
					<input type="password" id="password" onChange={this.handleChange} error={errors.password} />
					<label htmlFor="password2">Confirm Password:</label>
					<input type="password" id="password2" onChange={this.handleChange} error={errors.password2} />
					<button>Register</button>
				</form>
			</div>
		)
	}
}

export default AddUser