import { Outlet, Link } from "react-router-dom";
import styles from "./componentStyles.css";

const NavigationHeader = () => {
  return (
    <div className="headerBG">
      <Link to="/cars">
        <button type="button" className="buttonHeader btn btn-secondary">
          View Cars
        </button>
      </Link>
      <Link to="/tires">
        <button type="button" className="buttonHeader btn btn-secondary">
          View Tires
        </button>
      </Link>
      <Link to="/login">
        <button type="button" className="buttonHeader btn btn-secondary">
          Login
        </button>
      </Link>
      <Link to="/createAccount">
        <button type="button" className="buttonHeader btn btn-secondary">
          Create Account
        </button>
      </Link>
    </div>
  );
};

export default NavigationHeader;
