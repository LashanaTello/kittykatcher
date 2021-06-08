import React, { useState } from "react";


const Dots = ({ images, currIndex }) => { // takes in images as props
  // const [index, setIndex] = useState(currIndex); // create state to keep track of images index, set the default index to 0
  //
  //
  // const slideRight = () => {
  //   setIndex((index + 1) % images.length); // increases index by 1
  // };
  //
  // const slideLeft = () => {
  //   const nextIndex = index - 1;
  //   if (nextIndex < 0) {
  //     setIndex(images.length - 1); // returns last index of images array if index is less than 0
  //   } else {
  //     setIndex(nextIndex);
  //   }
  // };

  return (
    <div className="">
      <div className="dots-grid">
        {
          images.map((image,i) => {
            console.log(i);
            if (currIndex == i) {
              return (
                <div key={image} className="slide-dots-active">          
                </div>
              );
            } else {
              return (
                <div key={image} className="slide-dots">
                </div>
              );
            }
          })
        }
      </div>
    </div>
  );
};

export default Dots;
