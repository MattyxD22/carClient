import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Cars from "./pages/Cars";
import CreateAccount from "./pages/CreateAccount";
import Login from "./pages/Login";
import Tires from "./pages/Tires";
import Car from "./pages/Car";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}></Route>
      <Route index element={<App />}></Route>
      <Route path="/cars" element={<Cars />}></Route>
      <Route
        path="/createAccount"
        element={<CreateAccount></CreateAccount>}
      ></Route>
      <Route path="/Login" element={<Login></Login>}></Route>
      <Route path="/Tires" element={<Tires></Tires>}></Route>
      <Route path="/Car" element={<Car></Car>}></Route>
    </Routes>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
