import React from "react";

const CarImgComponent = ({ imgProp, markForDeletion }) => {
  return (
    <div className="border rounded d-flex mx-1 position-relative">
      <img className="img-fluid" src={imgProp?.url}></img>
      <button
        type="button"
        className="position-absolute btn btn-danger px-1 py-0"
        style={{ right: 0 }}
        title="delete image"
        onClick={() => markForDeletion(imgProp?.url)}
      >
        X
      </button>
    </div>
  );
};

export default CarImgComponent;
