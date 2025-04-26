import React from "react";
import { Link } from "react-router-dom"
import "./About.css"; 
function About() {
    return (
        <>
            <section class="about">
                <h2>About Us</h2>
                <p>At EduCraft, we believe in making learning fun, interactive, and accessible for every child. Our mission is
                    to inspire a lifelong love of learning by combining innovative educational techniques with creativity and
                    play.</p>
            </section>
            <section class="ourgoals">
                <h2>Our Goals</h2>
                <div class="card">
                    <h3>Engage</h3>
                    <p>Create an enjoyable learning experience that motivates children to explore and learn</p>
                </div>
                <div class="card">
                    <h3>Innovate</h3>
                    <p>Continuously incorporate the latest educational technologies and methodologies.</p>
                </div>
                <div class="card">
                    <h3>Holistic Development</h3>
                    <p>Offer a well-rounded education that includes academics, creativity, and life skills.</p>
                </div>
                <div class="card">
                    <h3>Ensure Accessibility</h3>
                    <p>Make high-quality educational resources accessible to all children, regardless of their location.</p>
                </div>
            </section>
            <section class="ourvalues">
                <h2>Our Story</h2>
                <p>Founded with a passion for education and a vision for the future, EduCraft brings together a team of
                    educators,
                    technologists, and creative minds dedicated to transforming the way children learn. We strive to make
                    education
                    a joyful and meaningful journey for every child.</p>
            </section>
            <section class="join">
                <h2>Join Us</h2>
                <p>Be a part of the EduCraft community and embark on an exciting educational adventure. Together, we can inspire
                    the next generation of thinkers, creators, and innovators.</p>
            </section>
        </>
    )
}
export default About;