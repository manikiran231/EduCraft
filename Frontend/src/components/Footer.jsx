import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";
import linkedin from "../assets/Linkedin.png";
import insta from "../assets/Insta.png";
function Footer() {
    return (
        <div className="footer">
            <p>&copy; 2024 EduCraft @ Manikiran. All Rights Reserved.</p>
            <div class="footer-links">
                <a href="https://www.linkedin.com/in/tamminaina-manikiran-85b03726a/" target="_blank"><img
                    src={linkedin}alt="LinkedIn" /></a>
                <a href="https://www.instagram.com/manikiran993" target="_blank"><img src={insta} alt="Instagram" /></a>
            </div>
        </div>
    );
}

export default Footer;
