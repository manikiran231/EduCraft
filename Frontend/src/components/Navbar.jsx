import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import profileIcon from "../assets/profile.png"; // use your profile image

import "./Navbar.css"; // CSS for styling

function Navbar() {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [navbarVisible, setNavbarVisible] = useState(false); // State for mobile navbar

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const closeDropdown = () => {
    setDropdownVisible(false);
  };

  const toggleNavbar = () => {
    setNavbarVisible(!navbarVisible); // Toggle navbar visibility
  };

  return (
    <div className="navbar-container" onClick={closeDropdown}>
      {/* Hamburger menu for mobile */}
      <div className="hamburger" onClick={toggleNavbar}>
        <div></div>
        <div></div>
        <div></div>
      </div>

      <ul className={`navbar ${navbarVisible ? "active" : ""}`} onClick={() => setNavbarVisible(false)}>
        <li>
          <img id="logo"src={logo} width="60px" height="35px" alt="Logo" />
        </li>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/courses">Courses</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/contact">Contact</Link></li>
        <li className="profile" onClick={(e) => { e.stopPropagation(); toggleDropdown(); }}>
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
              <Link to="/logout">Logout</Link>
            </div>
          )}
        </li>
      </ul>
    </div>
  );
}

export default Navbar;
