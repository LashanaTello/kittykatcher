import React from 'react';
import { NavLink } from 'react-router-dom'

const Home = () => {
	return (
		<div className="container">
			<h4 className="center">Welcome!</h4>
			<div className="center">
				<NavLink to='/login'>Login </NavLink>
			</div>
			<div className="center">
				<NavLink to='register'>Sign Up</NavLink>
			</div>
		</div>
	)
}

export default Home