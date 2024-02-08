import { Link } from "react-router-dom";

const NavigationButtons = () => {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <Link to="/cars">
        <button type="button" className="buttonFrontPage btn btn-primary w-100">
          View Cars
        </button>
      </Link>
      {/* <Link to="/tires">
        <button type="button" className="buttonFrontPage btn btn-primary w-100">
          View Tires
        </button>
      </Link> */}
      <Link to="/login">
        <button type="button" className="buttonFrontPage btn btn-primary w-100">
          Login
        </button>
      </Link>
      <Link to="/createAccount">
        <button type="button" className="buttonFrontPage btn btn-primary w-100">
          Create Account
        </button>
      </Link>
    </div>
  );
};

export default NavigationButtons;
