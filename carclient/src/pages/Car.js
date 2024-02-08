import React, { useState, useEffect } from "react";
import NavigationHeader from "../components/NavigationHeader";
import { useParams, useSearchParams } from "react-router-dom";
import * as GLOBAL from "../globals";
import CarImgComponent from "../components/carImgComponent";

const Car = () => {
  //   const params = useParams();
  //   console.log(params.carOBJ);

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
    const tempImgs = car.Image.map((item) => {
      //console.log(item);
      if (item.url !== imgData) {
        return item;
      }
      //return item.filter((item) => item.url !== imgData);
    });
    //console.log(tempImgs);
    //console.log(car);

    setCar((prevCar) => ({
      ...prevCar,
      Image: [...tempImgs],
    }));
  };

  useEffect(() => {
    const getCarFromVIN = async (VIN) => {
      const response = await fetch(url + "carVIN/" + VIN);
      const data = await response.json();
      setCar(data[0]);
    };
    getCarFromVIN(carVIN);
  }, []);

  const deleteCar = async (VIN) => {
    alert(
      "This will delete the car permanently from the database, are you sure?"
    );
  };

  const updateCar = async () => {
    const data = JSON.stringify({
      VIN: carVIN,
      Make: car.Make,
      Model: car.Model,
      Year: car.Year,
      Description: car.Description,
      Image: car.Image,
    });

    console.log(data);

    await fetch(url + "updateCar", {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "content-type": "application/json",
      },
      body: data, // body data type must match "Content-Type" header)
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("response from api: ", data);
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  const carInfoHandler = (type, value) => {
    switch (type) {
      case "Make":
        setCarEdited(true);
        setCar({ ...car, Make: value });
        break;
      case "Model":
        setCarEdited(true);
        setCar({ ...car, Model: value });
        break;
      case "Year":
        setCarEdited(true);
        setCar({ ...car, Year: value });
        break;
      case "Image":
        setCarEdited(true);
        setCar((prevCar) => ({
          ...prevCar,
          Image: [...prevCar.Image, ...value],
        }));

        break;
      case "Description":
        setCarEdited(true);
        setCar({ ...car, Description: value });
        break;

      default:
        setCarEdited(false);
        break;
    }
  };

  return (
    <div className="pageHeader overflow-hidden pb-5">
      <NavigationHeader></NavigationHeader>
      <div className="singleCar_options_header d-flex flex-row justify-content-center py-2">
        <button
          type="button"
          className={editMode == false ? "btn btn-primary" : "btn btn-success"}
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
      <div className="d-flex container flex-column border rounded w-100 h-100 mx-3 px-3 py-3">
        <div className="d-flex flex-row carInfo_row">
          <span className="text-info">Make</span>

          {editMode === true ? (
            <input
              type="text"
              className="form-control"
              value={car?.Make}
              onChange={(e) => {
                carInfoHandler("Make", e.target.value);
              }}
            />
          ) : (
            <p>{car?.Make}</p>
          )}
        </div>
        <div className="d-flex flex-row carInfo_row">
          <span className="text-info">Model</span>
          {editMode === true ? (
            <input
              type="text"
              className="form-control"
              value={car?.Model}
              onChange={(e) => {
                carInfoHandler("Model", e.target.value);
              }}
            />
          ) : (
            <p>{car?.Model}</p>
          )}
        </div>
        <div className="d-flex flex-row carInfo_row">
          <span className="text-info">Year</span>
          {editMode === true ? (
            <input
              type="number"
              className="form-control"
              value={car?.Year}
              onChange={(e) => {
                carInfoHandler("Year", e.target.value);
              }}
            />
          ) : (
            <p>{car?.Year}</p>
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
                {car?.Image.map((img) => {
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
          ) : car?.Image.length === 0 ? (
            <p className="text-danger">No images available</p>
          ) : (
            <div
              id="carouselExampleFade"
              className="carousel carousel-slide overflow-hidden"
              style={{ height: "100%", maxHeight: "30rem" }}
              data-bs-ride="carousel"
            >
              <div className="carousel-inner d-flex overflow-hidden h-100">
                {car?.Image.map((img, index) => {
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
              defaultValue={car?.Description}
            ></textarea>
          ) : (
            <p>{car?.Description}</p>
          )}
        </div>
      </div>
      <div className="position-fixed bottom-0 end-0 p-3" style={{ zIndex: 11 }}>
        <div
          id="liveToast"
          className="toast"
          role="alert"
          aria-live="assertive"
          aria-atomic="true"
          autohide="true"
        >
          <div className="toast-header">
            <img src="..." className="rounded me-2" alt="..." />
            <strong className="me-auto">carAPI</strong>
            <small>just now</small>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="toast"
              aria-label="Close"
            ></button>
          </div>
          <div className="toast-body">
            Hello, world! This is a toast message.
          </div>
        </div>
      </div>
    </div>
  );
};

export default Car;
