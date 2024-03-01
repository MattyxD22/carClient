import React, { useState, useEffect } from "react";
import NavigationHeader from "../components/NavigationHeader";
import { useSearchParams, useNavigate } from "react-router-dom";
import * as GLOBAL from "../globals";
import CarImgComponent from "../components/carImgComponent";
import styles from "./styles.css";

const Car = () => {
  const navigate = useNavigate();
  const [isSignedIn, setIsSignedIn] = useState(false);

  const [searchParams] = useSearchParams();
  const [carVIN, setCarVIN] = useState(searchParams.get("VIN"));

  const [car, setCar] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [carEdited, setCarEdited] = useState(false);
  const url = GLOBAL.url + "cars/";

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
    //const tempList = car.Image;
    const tempImgs = car.image.map((item) => {
      if (item.url !== imgData) {
        return item;
      }
      //return item.filter((item) => item.url !== imgData);
    });
    setCar((prevCar) => ({
      ...prevCar,
      image: [...tempImgs],
    }));
  };

  useEffect(() => {
    if (localStorage.getItem("auth-token") !== null) {
      setIsSignedIn(true);
    }

    const getCarFromVIN = async (VIN) => {
      const response = await fetch(url + "carVIN/" + VIN);
      const data = await response.json();
      console.log(data);
      setCar(data.car[0]);
    };
    getCarFromVIN(carVIN);
  }, [isSignedIn]);

  const deleteCar = async () => {
    const answer = window.confirm("Are you sure you want to delete this car?");

    if (answer) {
      const data = JSON.stringify({
        VIN: carVIN,
      });

      await fetch(url + "deleteCar", {
        method: "DELETE", // *GET, POST, PUT, DELETE, etc.
        headers: {
          "content-type": "application/json",
          Authorization: localStorage.getItem("auth-token"),
        },
        body: data, // body data type must match "Content-Type" header)
      })
        .then((res) => res.json())
        .then((data) => {
          alert("Car has been deleted successfully");
          navigate("/cars");
        })
        .catch((err) => {
          alert(err.message);
        });
    }
  };

  const updateCar = async () => {
    const data = JSON.stringify({
      VIN: carVIN,
      make: car.make,
      model: car.model,
      year: car.year,
      description: car.description,
      image: car.image,
    });

    await fetch(url + "updateCar", {
      method: "PUT", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "content-type": "application/json",
        Authorization: localStorage.getItem("auth-token"),
      },
      body: data, // body data type must match "Content-Type" header)
    })
      .then((res) => res.json())
      .then((data) => {
        alert("Car has been updated successfully");
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  const carInfoHandler = (type, value) => {
    switch (type) {
      case "Make":
        setCarEdited(true);
        setCar({ ...car, make: value });
        break;
      case "Model":
        setCarEdited(true);
        setCar({ ...car, model: value });
        break;
      case "Year":
        setCarEdited(true);
        setCar({ ...car, year: value });
        break;
      case "Image":
        setCarEdited(true);
        setCar((prevCar) => ({
          ...prevCar,
          image: [...prevCar.image, ...value],
        }));

        break;
      case "Description":
        setCarEdited(true);
        setCar({ ...car, description: value });
        break;

      default:
        setCarEdited(false);
        break;
    }
  };

  return (
    <div className="pageHeader overflow-hidden pb-5">
      <NavigationHeader></NavigationHeader>

      {isSignedIn === true ? (
        <div className="singleCar_options_header d-flex flex-row justify-content-end container py-2">
          <button
            type="button"
            className={
              editMode === false ? "btn btn-primary" : "btn btn-success"
            }
            onClick={async () => {
              setEditMode(!editMode);

              // setting it to "false" will not make it update properly
              if (editMode === true && carEdited === true) {
                await updateCar();
              }
            }}
          >
            {editMode === false ? "Edit Car" : "Update Car"}
          </button>
          <button
            type="button"
            className="btn btn-danger mx-2"
            onClick={() => {
              deleteCar(carVIN);
            }}
          >
            Remove Car
          </button>
        </div>
      ) : (
        <div className="py-4"></div>
      )}

      <div className="d-flex container flex-column border rounded w-100 h-100 mx-3 px-3 py-3">
        <div className="d-flex flex-row carInfo_row">
          <span className="text-info">Make</span>

          {editMode === true ? (
            <input
              type="text"
              className="form-control"
              value={car?.make}
              onChange={(e) => {
                carInfoHandler("Make", e.target.value);
              }}
            />
          ) : (
            <p>{car?.make}</p>
          )}
        </div>
        <div className="d-flex flex-row carInfo_row">
          <span className="text-info">Model</span>
          {editMode === true ? (
            <input
              type="text"
              className="form-control"
              value={car?.model}
              onChange={(e) => {
                carInfoHandler("Model", e.target.value);
              }}
            />
          ) : (
            <p>{car?.model}</p>
          )}
        </div>
        <div className="d-flex flex-row carInfo_row">
          <span className="text-info">Year</span>
          {editMode === true ? (
            <input
              type="number"
              className="form-control"
              value={car?.year}
              onChange={(e) => {
                carInfoHandler("Year", e.target.value);
              }}
            />
          ) : (
            <p>{car?.year}</p>
          )}
        </div>
        <div className="d-flex flex-column carInfo_col">
          <span className="text-info">Images</span>

          {editMode === true ? (
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
                {car?.image.map((img) => {
                  //console.log(img);
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
          ) : car?.image.length === 0 ? (
            <p className="text-danger">No images available</p>
          ) : (
            <div
              id="carouselExampleFade"
              className="carousel carousel-slide overflow-hidden"
              style={{ height: "100%", maxHeight: "30rem" }}
              data-bs-ride="carousel"
            >
              <div className="carousel-inner d-flex overflow-hidden h-100">
                {car?.image.map((img, index) => {
                  //console.log(img, index);
                  //const reconstructImg = readFile(img.url);
                  return index === 0 ? (
                    <div
                      className="carousel-item img-fluid w-75 mx-auto active"
                      data-bs-interval="3000"
                    >
                      <img
                        src={img.url}
                        className="d-block w-100 active h-100 rounded"
                        alt="no img found"
                      />
                    </div>
                  ) : (
                    <div
                      className="carousel-item img-fluid w-75 mx-auto"
                      data-bs-interval="3000"
                    >
                      <img
                        src={img.url}
                        className="d-block w-100 active h-100 rounded"
                        alt="no img found"
                      />
                    </div>
                  );
                })}
              </div>
              <button
                className="carousel-control-prev"
                type="button"
                data-bs-target="#carouselExampleFade"
                data-bs-slide="prev"
              >
                <span
                  className="carousel-control-prev-icon"
                  aria-hidden="true"
                ></span>
                <span className="visually-hidden">Previous</span>
              </button>
              <button
                className="carousel-control-next"
                type="button"
                data-bs-target="#carouselExampleFade"
                data-bs-slide="next"
              >
                <span
                  className="carousel-control-next-icon"
                  aria-hidden="true"
                ></span>
                <span className="visually-hidden">Next</span>
              </button>
            </div>
          )}
        </div>
        <div className="d-flex flex-column carInfo_col">
          <span className="text-info">Description</span>
          {editMode === true ? (
            <textarea
              type="text"
              onChange={(e) => {
                carInfoHandler("Description", e.target.value);
              }}
              className="form-control"
              defaultValue={car?.description}
            ></textarea>
          ) : (
            <p>{car?.description}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Car;
