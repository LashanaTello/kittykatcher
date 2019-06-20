import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="container">
      <h4 className="center">Welcome!</h4>
      <div className="center">
        <Link to='/login'>Login </Link>
      </div>
      <div className="center">
        <Link to='register'>Sign Up</Link>
          </div>
    </div>
  );
}

export default Home;