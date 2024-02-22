import styles from "./styles.css";
import NavigationHeader from "../components/NavigationHeader";
import React, { useState, useEffect } from "react";
import * as GLOBAL from "../globals";
import { Link, useSearchParams } from "react-router-dom";

const Cars = () => {
  const [isSignedIn, setIsSignedIn] = useState(false);

  const [searchParams] = useSearchParams();
  const [cars, setCars] = useState(null);

  //define "local" url from global file
  const url = GLOBAL.url + "cars/";

  useEffect(() => {
    if (localStorage.getItem("auth-token") !== null) {
      setIsSignedIn(true);
    }

    const getCars = async () => {
      console.log("loading cars");
      await loadCars();
    };
    getCars();
  }, [isSignedIn]);

  async function loadCars() {
    try {
      const res = await fetch(url);
      const data = await res.json();
      console.log(data);

      let tempArr = [];

      data.map((car) => {
        return tempArr.push({
          make: car.Make,
          model: car.Model,
          year: car.Year,
          VIN: car.VIN,
          Image: car.Image,
          Description: car.Description,
        });
      });

      setCars(tempArr);
    } catch (error) {
      console.error(error.message);
    }
  }

  return (
    <div className="pageHeader overflow-hidden">
      <NavigationHeader></NavigationHeader>
      <div className="d-flex flex-row w-100 justify-content-end px-4 pt-4 pb-2">
        <span>Found an interesting car?</span>
        {isSignedIn === true ? (
          <button type="button" className="btn btn-primary ms-3 me-2 ">
            Add new car
          </button>
        ) : (
          <button
            type="button"
            disabled
            className="btn btn-secondary ms-3 me-2 "
            title={"Log In to add a car"}
          >
            Add new car
          </button>
        )}
      </div>
      <div className="containerCars w-100 overflow-auto px-3">
        {cars != null &&
          cars.map((car) => {
            return (
              <div className="card d-flex mx-3 my-3">
                {car.Image.length == 0 ? (
                  <img
                    className="card-img-top px-2 py-2 control_cardImg_size"
                    alt="Car has no image"
                  ></img>
                ) : (
                  <img
                    src={car.Image[0].url}
                    className="card-img-top py-2 px-2 control_cardImg_size"
                    alt="Car has no image"
                  ></img>
                )}
                <div className="card-body d-flex flex-column">
                  <p className="card-text">{car.make}</p>
                  <h5 className="card-title bold">
                    {car.model} - {car.year}
                  </h5>
                  <h5 className="card-title">{car.Description}</h5>

                  <div className="d-flex flex-row justify-content-end mt-auto">
                    <Link
                      to={"/car?VIN=" + car.VIN}
                      //to={{ pathname: "/car", query: { carOBJ: car } }}
                      className="btn btn-primary"
                    >
                      Show Car
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Cars;
