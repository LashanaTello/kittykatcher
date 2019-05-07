import React from 'react';
import { Link, NavLink } from 'react-router-dom';

const Navbar = () => {
	return (
		<nav className="nav-wrapper red darken-3">
			<div className="container">
				<Link to="/" className="brand-logo">Kitty Katcher</Link>
				<ul className="right">
					<li><NavLink to="/">Home</NavLink></li>
					<li><NavLink to="/login">Login</NavLink></li>
					<li><NavLink to="/register">Register</NavLink></li>
					<li><NavLink to ="/kittymap">Kitty Map</NavLink></li>
				</ul>
			</div>
		</nav>
	)
}

export default Navbar;