import React, { Component } from 'react';

class Login extends Component {
	state = {
		email: null,
		password: null,
		errors: {}
	}

	handleChange = (e) => {
		this.setState({
			[e.target.id]: e.target.value
		})
	}

	handleSubmit = (e) => {
		e.preventDefault();

		const userData = {
	      email: this.state.email,
	      password: this.state.password
	    };
	    console.log(userData);
		//console.log(this.state);
	}

	render() {
		const { errors } = this.state;
		return (
			<div className="container">
				<h4 className="center">Login!</h4>
				<form onSubmit={this.handleSubmit} >
					<label htmlFor="email">Email:</label>
					<input type="text" id="email" onChange={this.handleChange} error={errors.email} />
					<label htmlFor="password">Password:</label>
					<input type="password" id="password" onChange={this.handleChange} error={errors.password} />
					<button>Login</button>
				</form>
			</div>
		)
	}
}

export default Login