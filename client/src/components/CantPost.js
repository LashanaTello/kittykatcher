import React from 'react';
import { NavLink } from 'react-router-dom';

const CantPost = () => {
  return (
    <div className="container">
      <h4 className="center">Hey!<br/>You need an account to add cats to the map!</h4>
      <div className="center">
        <NavLink to='/login'>Login </NavLink>
      </div>
      <div className="center">
        <NavLink to='/register'>Sign Up</NavLink>
          </div>
    </div>
  );
}

export default CantPost;