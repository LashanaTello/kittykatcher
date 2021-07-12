import React, { Component } from 'react';
import KittyPostForm from './KittyPostForm';
import CantPost from './CantPost';

class MapSidebar extends Component {
  closeClicked = () => {
    this.props.showSidebar();
  }

  render() {
    return (
      <div className="my-sidebar">
        <button className="right btn-small" onClick={this.closeClicked}><i className="material-icons">clear</i></button>
        { this.props.showCant && <CantPost/> }
      </div>
    );
  }
}

export default MapSidebar;
