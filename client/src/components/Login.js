import React, { Component } from 'react';

class Login extends Component {
	state = {
		username: null,
		password: null,
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
				<h4 className="center">Login!</h4>
				<form onSubmit={this.handleSubmit} >
					<label htmlFor="username">Email:</label>
					<input type="text" id="username" onChange={this.handleChange} />
					<label htmlFor="password">Password:</label>
					<input type="password" id="password" onChange={this.handleChange} />
					<button>Login</button>
				</form>
			</div>
		)
	}
}

export default Login