import React, { useState } from "react";
import NavigationHeader from "../components/NavigationHeader";
import * as GLOBAL from "../globals";

const CreateAccount = () => {
  const url = GLOBAL.url + "users/";

  const [createUser, setCreateUser] = useState({
    Email: "",
    Password: "",
  });

  const handleEmail = (email) => {
    setCreateUser((prevUser) => ({
      ...prevUser,
      Email: email,
    }));
  };

  const handlePassword = (password) => {
    setCreateUser((prevUser) => ({
      ...prevUser,
      Password: password,
    }));
  };

  const handleCreateAccount = async () => {
    console.log(createUser);

    const response = await fetch(url + "checkEmail/" + createUser.Email);
    const data = await response.json();
    console.log(data);
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
