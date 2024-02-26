import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import styles from "./componentStyles.css";

const NavigationHeader = () => {
  const [isSignedIn, setIsSignedIn] = useState(false);

  const signOut = () => {
    localStorage.removeItem("auth-token");
    setIsSignedIn(false);
    window.location.reload();
  };

  useEffect(() => {
    if (localStorage.getItem("auth-token") !== null) {
      setIsSignedIn(true);
    }
  }, [isSignedIn]);

  return (
    <div className="headerBG">
      <Link to="/cars">
        <button type="button" className="buttonHeader btn btn-secondary">
          View Cars
        </button>
      </Link>
      {/* <Link to="/tires">
        <button type="button" className="buttonHeader btn btn-secondary">
          View Tires
        </button>
      </Link> */}
      {isSignedIn === true ? (
        <></>
      ) : (
        <Link to="/login">
          <button type="button" className="buttonHeader btn btn-secondary">
            Login
          </button>
        </Link>
      )}

      {isSignedIn === true ? (
        <></>
      ) : (
        <Link to="/createAccount">
          <button type="button" className="buttonHeader btn btn-secondary">
            Create Account
          </button>
        </Link>
      )}

      <Link>
        {isSignedIn === true ? (
          <button
            type="button"
            onClick={signOut}
            className="btn btn-danger buttonHeader"
          >
            Log Out
          </button>
        ) : (
          <></>
        )}
      </Link>
    </div>
  );
};

export default NavigationHeader;
