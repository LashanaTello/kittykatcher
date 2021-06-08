import React, { useState } from "react";


const Dots = ({ images, currIndex }) => {
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
