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
            <li><Link to="/privacy">Privacy Policy</Link></li>
            <li><Link to="/terms">Terms of Service</Link></li>
          </ul>
        </div>

        <div className="footer-column">
          <h3>Services</h3>
          <ul>
            <li><Link to="/courses">Interactive Lessons</Link></li>
            <li><Link to="/games">Educational Games</Link></li>
            <li><Link to="/projects">Creative Projects</Link></li>
            <li><Link to="/resources">Parent Resources</Link></li>
          </ul>
        </div>

        <div className="footer-column">
          <h3>Learning</h3>
          <ul>
            <li><Link to="/tracking">Progress Tracking</Link></li>
            <li><Link to="/live-classes">Live Classes</Link></li>
            <li><Link to="/science">Science Experiments</Link></li>
            <li><Link to="/math">Mathematics</Link></li>
          </ul>
        </div>
        <div className="footer-column">
          <h3>Connect</h3>
          <ul>
            <li><Link to="/community">Community</Link></li>
            <li><Link to="/blog">Blog</Link></li>
            <li><Link to="/support">Support</Link></li>
          </ul>
        </div>
    </div>
      <div className="footer-bottom">
        <p>&copy; 2024 EduCraft @ Manikiran. All Rights Reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
