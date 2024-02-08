import styles from "./styles.css";
import NavigationHeader from "../components/NavigationHeader";
import React, { useState, useEffect } from "react";
import * as GLOBAL from "../globals";
import { Link } from "react-router-dom";

const Cars = () => {
  const [cars, setCars] = useState(null);

  //define "local" url from global file
  const url = GLOBAL.url + "cars/";

  useEffect(() => {
    const getCars = async () => {
      console.log("loading cars");
      await loadCars();
    };
    getCars();
  }, []);

  async function loadCars() {
    try {
      const res = await fetch(url);
      const data = await res.json();

      let tempArr = [];

      data.map((car) => {
        return tempArr.push({
          make: car.Make,
          model: car.Model,
          year: car.Year,
          VIN: car.VIN,
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
      <div className="containerCars w-100 overflow-auto px-3">
        {cars != null &&
          cars.map((car) => {
            return (
              <div className="card d-flex mx-3 my-3 clickable">
                <img className="card-img-top" alt="test"></img>
                <div class="card-body">
                  <p class="card-text">{car.make}</p>
                  <h5 class="card-title bold">
                    {car.model} - {car.year}
                  </h5>

                  <Link to="/car" class="btn btn-primary">
                    Show Car
                  </Link>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Cars;
