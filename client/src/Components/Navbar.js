import React from "react";
import "./Room.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faUser } from '@fortawesome/free-solid-svg-icons';


const Navbar = () => {
  const user = JSON.parse(localStorage.getItem("currentUser"));
  function logout(){
    localStorage.removeItem("currentUser");
    window.location.href='/login';
  }
  
  return (
    <div>
      <nav
        className="navbar navbar-expand-lg"
        style={{
          background: "linear-gradient(135deg, #ff0066, #ff6600)",
          boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
          padding: "10px 20px",
        }}
      >
        <div className="container-fluid">
          <a
            className="navbar-brand"
            href="/home"
            style={{ color: "white", fontSize: "24px", textDecoration: "none" }}
          >
            BookingApp
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon">
            </span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              {user ? (
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle"
                    href="#"
                    id="navbarDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                    style={{
                      color: "white",
                      fontWeight: "bold",
                      fontFamily: "Arial, sans-serif",
                    }}
                  >
                  <FontAwesomeIcon icon={faUser} style={{ marginLeft: "5px" }} />  {user.name} 
                  </a>
                  <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                    <li>
                      <a className="dropdown-item" href="#">
                        Bookings
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#" onClick={logout}>
                        Logout
                      </a>
                    </li>
                  </ul>
                </li>
              ) : (
                <>
                  <li className="nav-item">
                    <a
                      className="nav-link active"
                      aria-current="page"
                      href="/register"
                      style={{
                        color: "white",
                        fontSize: "18px",
                        textDecoration: "none",
                        padding: "10px 20px",
                        transition: "background-color 0.3s",
                        position: "relative",
                      }}
                    >
                      Register
                      <div className="hover-effect"></div>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      className="nav-link"
                      href="/login"
                      style={{
                        color: "white",
                        fontSize: "18px",
                        textDecoration: "none",
                        padding: "10px 20px",
                        transition: "background-color 0.3s",
                        position: "relative",
                      }}
                    >
                      Login
                      <div className="hover-effect"></div>
                    </a>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
    
};

export default Navbar;
