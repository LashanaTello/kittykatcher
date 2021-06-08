import React, { Component } from 'react';
import Dots from './Dots';


class FullImagePopup extends Component {
  state = {
    index: this.props.currIndex
  }

  slideRight = () => {
    this.setState({
      index: (this.state.index + 1) % this.props.images.length
    })
  }

  slideLeft = () => {
    const nextIndex = this.state.index - 1;
    if (nextIndex < 0) {
      this.setState({
        index: this.props.images.length - 1
      })
    } else {
      this.setState({
        index: nextIndex
      })
    }
  }

  handleClick = () => {
    this.props.toggle();
  };

  render() {
    return (
      <div className="">
        <div className="my-modal">
          <div className="my-modal-grid">
            <button className="close-btn-area btn-small" onClick={this.handleClick}><i className="material-icons">clear</i></button>
            <button className="left-arrow-area btn" onClick={this.slideLeft}>{"<"}</button>
            <img className="photo-area" src={this.props.images[this.state.index]} alt={this.state.index} />
            <button className="right-arrow-area btn" onClick={this.slideRight}>{">"}</button>
          </div>
          <Dots images={this.props.images} currIndex={this.state.index}/>
        </div>
        <div className="dim-background"></div>
      </div>
    );
  }
}

export default FullImagePopup;
