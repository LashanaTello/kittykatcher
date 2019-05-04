import React, { Component } from 'react';
import Navbar from './components/Navbar'
import { BrowserRouter, Route } from 'react-router-dom'
import Home from './components/Home'
import Login from './components/Login'
import AddUser from './components/AddUser'
import KittyMap from './components/KittyMap'

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Navbar />
          <Route exact path='/' component={Home} />
          <Route path='/login' component={Login} />
          <Route path='/register' component={AddUser} />
          <Route path='/kittymap' component={KittyMap} />          
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
