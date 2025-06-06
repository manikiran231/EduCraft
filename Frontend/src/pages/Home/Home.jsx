import React from "react";
import { Link } from "react-router-dom";
import { motion, useAnimation } from "framer-motion";
import workout from "../../assets/workout.png";
import recipes from "../../assets/recipes.png";  
import mental from "../../assets/mental.png";
import community from "../../assets/community.png";
import progress from "../../assets/progress.jpg";
import liveClasses from "../../assets/live-classes.jpg";
import "./Home.css";

function Home() {
    // Testimonials data
    const testimonials = [
        { name: "Aditi S.", quote: "EduCraft made learning so much fun for my child!" },
        { name: "Rahul M.", quote: "The creative projects are brilliant and easy to follow." },
        { name: "Sara K.", quote: "My daughter loves the educational games." },
        { name: "Vikas P.", quote: "Finally, a platform that feels alive and engaging." },
        { name: "Nina R.", quote: "We've seen such great progress in just a few weeks." },
        { name: "Kabir A.", quote: "Interactive lessons are a game changer!" },
        { name: "Divya T.", quote: "The live classes are incredibly well-managed." },
        { name: "Meera L.", quote: "EduCraft keeps my child motivated every day." },
        { name: "Zoya N.", quote: "Parent tools helped me get involved better." }
    ];

    // Duplicate testimonials to create infinite loop effect
    const duplicatedTestimonials = [...testimonials, ...testimonials];

    return (
        <>
            <header className="heroo">
                <h1 className="manii">Welcome to EduCraft</h1>
                <p>"Where learning is an adventure!"</p>
                <Link to="/register" className="cta-button">Join Us !!</Link>
            </header>

            <section id="services" className="secrvices">
                <h2>Our Core Services</h2>
                <div className="sercvice-card">
                    <img src={workout} alt="Interactive Lessons" width="250px" />
                    <h3>Interactive Lessons</h3>
                    <p>Engaging lessons on various subjects with quizzes and activities.</p>
                </div>
                <div className="sercvice-card">
                    <img src={mental} alt="Creative Projects" width="250px" />
                    <h3>Creative Projects</h3>
                    <p>Arts, crafts, and science experiments that stimulate creativity.</p>
                </div>
                <div className="sercvice-card">
                    <img src={community} alt="Parent Resources" width="250px" />
                    <h3>Parent Resources</h3>
                    <p>Tips and tools to help parents support their child's learning journey.</p>
                </div>
                <div className="sercvice-card">
                    <img src={progress} alt="Progress Tracking" width="250px" />
                    <h3>Progress Tracking</h3>
                    <p>Track progress, earn badges, and set learning goals.</p>
                </div>
                <div className="sercvice-card">
                    <img src={liveClasses} alt="Live Classes" width="250px" />
                    <h3>User Specification</h3>
                    <p>Offer courses and activities based on user specification such as music.</p>
                </div>
                <div className="sercvice-card">
                    <img src={recipes} alt="Educational Games" width="250px" />
                    <h3>Educational Games</h3>
                    <p>Fun games designed to make learning enjoyable and effective.</p>
                </div>
            </section>

            <section id="vision" className="vhision">
                <h2>Our Vision</h2>
                <p>At EduCraft, our mission is to make learning a fun and engaging adventure for every child. We believe in nurturing curiosity, creativity, and a love for learning through interactive lessons, games, and projects. Our goal is to empower parents and educators with the tools they need to support their children's educational journey 🌱.</p>
                <p><b>Engagement:</b><br />Create an engaging and enjoyable learning experience that motivates children to explore and learn.</p>
                <p><b>Accessibility:</b><br />Ensure that high-quality educational resources are accessible to all children, regardless of their location.</p>
                <p><b>Innovation:</b><br />Continuously innovate and incorporate the latest educational technologies and methodologies.</p>
                <p><b>Holistic Development:</b><br />Foster holistic development by offering a well-rounded education that includes academics, creativity, and life skills.</p>
            </section>

            <section className="testimonials-section">
                <h2>What Our Users Say</h2>
                <div className="testimonial-wrapper" style={{ overflow: "hidden", whiteSpace: "nowrap" }}>
                    <motion.div
                        className="testimonial-scroll"
                        style={{ display: "inline-flex" }}
                        animate={{ x: ["0%", "-50%"] }}
                        transition={{
                            repeat: Infinity,
                            repeatType: "loop",
                            duration: 40,
                            ease: "linear",
                        }}
                    >
                        {duplicatedTestimonials.map((testimonial, index) => (
                            <div key={index} className="testimonial-card" style={{ display: "inline-block", minWidth: "300px", marginRight: "20px" }}>
                                <p>"{testimonial.quote}"</p>
                                <h4>- {testimonial.name}</h4>
                            </div>
                        ))}
                    </motion.div>
                </div>
            </section>
        </>
    );
}

export default Home;
