import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import NavigationHeader from "../components/NavigationHeader";
import * as GLOBAL from "../globals";

import CarImgComponent from "../components/carImgComponent";

const NewCar = () => {
  const [car, setCar] = useState({
    Make: "",
    Model: "",
    Year: "",
    VIN: "",
    Description: "",
    Image: [],
  });

  const setBase64 = async (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        resolve(reader.result);
      };
      reader.onerror = reject;
    });
  };

  const markForDeletion = (imgData) => {
    const tempImgs = car.Image.map((item) => {
      if (item.url !== imgData) {
        return item;
      }
    });

    setCar((prevCar) => ({
      ...prevCar,
      Image: [...tempImgs],
    }));
  };

  const carInfoHandler = (type, value) => {
    switch (type) {
      case "Make":
        //setCarEdited(true);
        setCar({ ...car, Make: value });
        break;
      case "Model":
        //setCarEdited(true);
        setCar({ ...car, Model: value });
        break;
      case "Year":
        //setCarEdited(true);
        setCar({ ...car, Year: value });
        break;
      case "Make":
        //setCarEdited(true);
        setCar({ ...car, VIN: value });
        break;
      case "Image":
        //setCarEdited(true);
        setCar((prevCar) => ({
          ...prevCar,
          Image: [...prevCar.Image, ...value],
        }));

        break;
      case "Description":
        //setCarEdited(true);
        setCar({ ...car, Description: value });
        break;

      default:
        //setCarEdited(false);
        break;
    }
  };

  const postCar = async () => {
    const data = JSON.stringify({
      VIN: car.VIN,
      Make: car.Make,
      Model: car.Model,
      Year: car.Year,
      Description: car.Description,
      Image: car.Image,
    });

    await fetch(GLOBAL.url + "cars/newCar", {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "content-type": "application/json",
        Authorization: localStorage.getItem("auth-token"),
      },
      body: data, // body data type must match "Content-Type" header)
    })
      .then((res) => res.json())
      .then((data) => {
        alert("Car has been added successfully");
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  return (
    <div className="pageHeader">
      <NavigationHeader></NavigationHeader>

      <div className="d-flex container flex-column border rounded w-100 h-100 mx-3 px-3 py-3">
        <div className="d-flex flex-row carInfo_row">
          <span className="text-info">Make</span>

          <input
            type="text"
            className="form-control"
            value={car?.Make}
            onChange={(e) => {
              carInfoHandler("Make", e.target.value);
            }}
          />
        </div>
        <div className="d-flex flex-row carInfo_row">
          <span className="text-info">Model</span>
          <input
            type="text"
            className="form-control"
            value={car?.Model}
            onChange={(e) => {
              carInfoHandler("Model", e.target.value);
            }}
          />
        </div>
        <div className="d-flex flex-row carInfo_row">
          <span className="text-info">Year</span>
          <input
            type="number"
            className="form-control"
            value={car?.Year}
            onChange={(e) => {
              carInfoHandler("Year", e.target.value);
            }}
          />
        </div>
        <div className="d-flex flex-row carInfo_row">
          <span className="text-info">VIN</span>
          <input
            type="number"
            className="form-control"
            value={car?.VIN}
            onChange={(e) => {
              carInfoHandler("VIN", e.target.value);
            }}
          />
        </div>
        <div className="d-flex flex-column carInfo_col">
          <span className="text-info">Images</span>

          <div className="d-flex flex-column">
            <input
              type="file"
              multiple={true}
              accept=".jpeg, .jpg, .png"
              className="form-control"
              onChange={async (e) => {
                const images = e.target.files;
                const newImages = [];

                for (let index = 0; index < images.length; index++) {
                  let image = images[index];
                  const decodeFile = await setBase64(image);

                  newImages.push({
                    name: image.name,
                    url: decodeFile,
                  });
                }

                carInfoHandler("Image", newImages);
              }}
            ></input>
            <div className="py-4 d-flex flex-row">
              {car?.Image.map((img) => {
                if (typeof img != "undefined") {
                  return (
                    <CarImgComponent
                      markForDeletion={markForDeletion}
                      imgProp={img}
                    ></CarImgComponent>
                  );
                }
              })}
            </div>
          </div>
        </div>
        <div className="d-flex flex-column carInfo_col">
          <span className="text-info">Description</span>
          <textarea
            type="text"
            onChange={(e) => {
              carInfoHandler("Description", e.target.value);
            }}
            className="form-control"
            defaultValue={car?.Description}
          ></textarea>
        </div>

        <div className="d-flex flex-row carInfo_row justify-content-end">
          <button type="button" onClick={postCar} className="btn btn-success">
            Add Car
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewCar;
