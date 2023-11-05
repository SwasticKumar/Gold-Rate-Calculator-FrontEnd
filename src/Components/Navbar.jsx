import React from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons"; // Import the desired icon

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Check if the user is logged in (you can use your own logic here)
  const isAuthenticated = localStorage.getItem("Auth Token");

  // Get the first letter of the username to display as the avatar
  const username = localStorage.getItem("userName");
  const avatarLetter = username ? username[0].toUpperCase() : "";

  // Function to handle logout
  const handleLogout = () => {
    // Clear the authentication token
    localStorage.removeItem("Auth Token");
    localStorage.removeItem("userName");

    // Redirect to the login page
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light nav-bg">
      <div className="container">
        <Link to="/" className="navbar-brand">
          <img
            src="./image/sk-logo.png"
            alt="swasticmedia"
            style={{ width: "11rem" }}
          />
        </Link>
        
        <ul className="navbar-nav ms-auto">
          {" "}
          {/* "ms-auto" class pushes items to the right */}
          {isAuthenticated ? (
            // If the user is logged in, show avatar and logout as an icon
            <li className="nav-item">
              <div className="nav-link">
                <div className="d-flex align-items-center">
                  <div className="avatar-badge ">
                    {/* <i class="fa fa-user icon"></i> */}
                    {/* <span className="avatar-letter">{avatarLetter}</span> */}
                    <Button
                      variant="link"
                      className="logout-icon "
                      onClick={handleLogout}
                    >
                      <i class="fa-solid fa-power-off light-color"></i>
                    </Button>
                  </div>
                </div>
              </div>
            </li>
          ) : (
            // If the user is not logged in, show the login link
            <li
              className={`nav-item ${
                location.pathname === "/login" ? "active" : ""
              }`}
            >
              <div className="avatar-badge">
                <Link to="/login" className="nav-link">
                  <i class="fa fa-user icon light-color"></i>
                </Link>
              </div>
            </li>
          )}
        </ul>
        {/* </div> */}
      </div>
    </nav>
  );
};

export default Navbar;
