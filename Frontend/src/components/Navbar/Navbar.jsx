import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/Logo.png";
import profileIcon from "../../assets/profile.png";
import "./Navbar.css";

function Navbar() {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [navbarVisible, setNavbarVisible] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const toggleDropdown = () => setDropdownVisible(!dropdownVisible);
  const closeDropdown = () => setDropdownVisible(false);
  const toggleNavbar = () => setNavbarVisible(!navbarVisible);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  return (
    <div className="navbar-container" onClick={closeDropdown}>
      {/* Mobile hamburger */}
      <div className="hamburger" onClick={toggleNavbar}>
        <div></div>
        <div></div>
        <div></div>
      </div>

      {/* Left side: logo + links */}
      <ul className={`navbar ${navbarVisible ? "active" : ""}`}>
        <li className="logo" id="logo">
          <img src={logo} width="60px" height="35px" alt="Logo" />
        </li>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/courses">Courses</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/contact">Contact</Link></li>
      </ul>

      {/* Right side: login or profile */}
      <div className="nav-right" onClick={(e) => e.stopPropagation()}>
        {user ? (
          <div className="profile" onClick={toggleDropdown}>
            <img
              src={profileIcon}
              width="35px"
              height="35px"
              alt="User"
              className="profile-icon"
            />
            {dropdownVisible && (
              <div className="dropdown-menu">
                <Link to="/profile">My Profile</Link>
                <Link to="/my-courses">My Courses</Link>
                <Link to="/leaderboard">Leaderboard</Link>
                <Link to="/edit-profile">Edit Profile</Link>
                <button onClick={handleLogout} className="logout-button">
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <Link to="/login" className="login-button">
            Login
          </Link>
        )}
      </div>
    </div>
  );
}

export default Navbar;
