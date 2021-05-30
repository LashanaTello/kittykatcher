import React, { useState } from "react";

const defaultCatPic = "https://kittykatcher.s3.amazonaws.com/default_kitty.svg";

const ImageSlider = ({ images }) => { // takes in images as props
  const [index, setIndex] = useState(0); // create state to keep track of images index, set the default index to 0

  const slideRight = () => {
    setIndex((index + 1) % images.length); // increases index by 1
  };

  const slideLeft = () => {
    const nextIndex = index - 1;
    if (nextIndex < 0) {
      setIndex(images.length - 1); // returns last index of images array if index is less than 0
    } else {
      setIndex(nextIndex);
    }
  };

  return (
    (images.length > 0 && (
      <div className="row">
        <div className="col s12 slider-area">
          <button className="vertical-center btn col s1" onClick={slideLeft}>{"<"}</button>
          <img className="col s10" src={images[index]} alt={index}  />
          <button className="vertical-center btn col s1" onClick={slideRight}>{">"}</button>
        </div>
      </div>
    )) || (
    <div className="default-pic-area">
      <img src={defaultCatPic} alt={"Default cat icon when there are no pictures to show"}/>
    </div>)
  );
};

export default ImageSlider;
