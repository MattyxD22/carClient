import { useState } from "react";
import { useNavigate } from "react-router-dom";
import NavigationHeader from "../components/NavigationHeader";
import * as GLOBAL from "../globals";

const Login = () => {
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState(null);
  const [userPassword, setUserPassword] = useState(null);
  const url = GLOBAL.url + "users/";

  const updateEmail = (e) => {
    setUserEmail(e.target.value);
  };
  const updatePassword = (e) => {
    setUserPassword(e.target.value);
  };

  const loginUser = async () => {
    let data = {
      email: userEmail,
      password: userPassword,
    };

    // const res = fetch(url + "login", { method: "POST", body: data });
    // const resData = res.json();

    await fetch("http://127.0.0.1:3000/api/users/login", {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data), // body data type must match "Content-Type" header)
    })
      .then((res) => res.json())
      .then((data) => {
        let token = data.data;
        localStorage.setItem("auth-token", token.data);
        navigate("/cars");
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  return (
    <div className="pageHeader">
      <NavigationHeader></NavigationHeader>
      <div className="container loginContainer d-flex">
        <div className="row my-auto mx-auto">
          <div className="col d-flex flex-row justify-content-center align-center">
            <div className="loginForm d-flex flex-column my-auto">
              <div className="loginform_email py-2 d-flex flex-row">
                <span style={{ width: 175 }}>Email</span>
                <input
                  type="text"
                  className="form-control"
                  onInput={(text) => {
                    updateEmail(text);
                  }}
                />
              </div>
              <div className="loginform_password py-2 d-flex flex-row">
                <span style={{ width: 175 }}>Password</span>
                <input
                  type="password"
                  className="form-control"
                  onInput={(text) => {
                    updatePassword(text);
                  }}
                />
              </div>
              <div className="loginform_button py-2 d-flex">
                <div style={{ width: 100 }}></div>
                <button
                  type="button"
                  className="btn btn-primary mx-auto"
                  onClick={() => {
                    loginUser();
                  }}
                >
                  Login
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
