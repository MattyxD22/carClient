import React, { useState } from "react";
import NavigationHeader from "../components/NavigationHeader";
import { useNavigate } from "react-router-dom";
import * as GLOBAL from "../globals";
import styles from "./styles.css";

const CreateAccount = () => {
  const navigate = useNavigate();
  const url = GLOBAL.url + "users/";

  const [createUser, setCreateUser] = useState({
    email: "",
    password: "",
  });

  const handleEmail = (email) => {
    setCreateUser((prevUser) => ({
      ...prevUser,
      email: email,
    }));
  };

  const handlePassword = (password) => {
    setCreateUser((prevUser) => ({
      ...prevUser,
      password: password,
    }));
  };

  const handleCreateAccount = async () => {
    // Check if email already is inside the system
    const response = await fetch(url + "checkEmail/" + createUser.email);
    const data = await response.json();

    // if email doesnt exist, proceed to create account
    if (data.Exist === false) {
      await fetch(url + "createAccount", {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        headers: {
          "content-type": "application/json",
          //Authorization: localStorage.getItem("auth-token"),
        },
        body: JSON.stringify({
          email: createUser.email,
          password: createUser.password,
        }), // body data type must match "Content-Type" header)
      })
        .then((res) => res.json())
        .then((data) => {
          alert("Your account has been created successfully");
          navigate("/login");
        })
        .catch((err) => {
          alert(err.message);
        });
    } else {
      alert("An account with this email already exists");
    }
  };

  return (
    <div className="pageHeader">
      <NavigationHeader></NavigationHeader>
      <div className="container loginContainer d-flex flex-column align-content-center justify-content-center">
        <div className="border rounded py-4 px-4">
          <div className="d-flex flex-row createAccount_row">
            <span className="">Email</span>
            <input
              type="email"
              className="form-control ms-5"
              onChange={(e) => {
                handleEmail(e.target.value);
              }}
            />
          </div>
          <div className="d-flex flex-row createAccount_row">
            <span className="">Password</span>
            <input
              type="password"
              className="form-control ms-5"
              onChange={(e) => {
                handlePassword(e.target.value);
              }}
            />
          </div>
          <div className="d-flex flex-row createAccount_row">
            <button
              type="button"
              className="btn btn-primary mx-auto"
              onClick={() => {
                handleCreateAccount();
              }}
            >
              Create Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateAccount;
