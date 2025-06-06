import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";
import linkedin from "../../assets/Linkedin.png";
import insta from "../../assets/Insta.png";

function Footer() {
  return (
    <footer className="footer-container">
      <div className="footer-top">
        <div className="footer-column">
          <h3>Company</h3>
          <ul>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/contact">Contact</Link></li>
            <li><Link to="/about">Privacy Policy</Link></li>
            <li><Link to="/about">Terms of Service</Link></li>
          </ul>
        </div>

        <div className="footer-column">
          <h3>Services</h3>
          <ul>
            <li><Link to="/courses">Interactive Lessons</Link></li>
            <li><Link to="/courses">Educational Games</Link></li>
            <li><Link to="/courses">Creative Projects</Link></li>
            <li><Link to="/courses">Parent Resources</Link></li>
          </ul>
        </div>

        <div className="footer-column">
          <h3>Learning</h3>
          <ul>
            <li><Link to="/about">Progress Tracking</Link></li>
            <li><Link to="/courses">Live Classes</Link></li>
            <li><Link to="/courses">Science Experiments</Link></li>
            <li><Link to="/courses">Mathematics</Link></li>
          </ul>
        </div>
        <div className="footer-column">
          <h3>Connect</h3>
          <ul>
            <li><Link to="/">Community</Link></li>
            <li><Link to="/">Blog</Link></li>
            <li><Link to="/contact">Support</Link></li>
          </ul>
        </div>
    </div>
      <div className="footer-bottom">
        <p>&copy; 2024 EduCraft @ <a href="https://www.linkedin.com/in/tamminaina-manikiran-85b03726a/" style={{color:"yellow"}}>Manikiran</a>. All Rights Reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
