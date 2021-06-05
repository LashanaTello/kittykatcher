import React, { useState } from "react";
import FullImagePopup from './FullImagePopup';


const defaultCatPic = "https://kittykatcher.s3.amazonaws.com/default_kitty.svg";

const ImageSlider = ({ images }) => {
  const [index, setIndex] = useState(0);
  const [seen, setSeen] = useState(false);

  const slideRight = () => {
    setIndex((index + 1) % images.length);
  };

  const slideLeft = () => {
    const nextIndex = index - 1;
    if (nextIndex < 0) {
      setIndex(images.length - 1); // returns last index of images array if index is less than 0
    } else {
      setIndex(nextIndex);
    }
  };

  const togglePop = () => {
   setSeen(!seen);
  };

  return (
    (images.length > 0 && (
      <div className="row">
        <div className="col s12 slider-area">
          <button className="vertical-center btn col s1" onClick={slideLeft}>{"<"}</button>
          <img className="col s10" src={images[index]} alt={index} onClick={togglePop} />
          <button className="vertical-center btn col s1" onClick={slideRight}>{">"}</button>
        </div>
        <div>
          {seen ? <FullImagePopup toggle={togglePop} images={images} currIndex={index} /> : null}
        </div>
      </div>
    )) || (
    <div className="default-pic-area">
      <img src={defaultCatPic} alt={"Default cat icon when there are no pictures to show"}/>
    </div>)
  );
};

export default ImageSlider;
