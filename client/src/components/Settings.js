import React, { Component } from 'react';
import M from 'materialize-css';

class Settings extends Component {
  state = {
  }

  componentDidMount() {
    M.Tabs.init(this.Tabs);
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="add-spacing col s12">
            <ul ref={Tabs => { this.Tabs = Tabs; }} className="tabs">
              <li key={"a"} className="tab col s6"><a href="#test1">Account Details</a></li>
              <li key={"b"} className="tab col s6"><a href="#test2">Delete Account</a></li>
            </ul>
          </div>
          <div id="test1" className="add-spacing col s12 center-align">
            my details
          </div>
          <div id="test2" className="add-spacing col s12 center-align">Delete?</div>
        </div>
      </div>
    );
  }
}

export default Settings;
