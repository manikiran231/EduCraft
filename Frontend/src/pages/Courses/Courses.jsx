import React from "react";
import workout from "../../assets/workout.png";
import recipes from "../../assets/recipes.png";
import languageLearning from "../../assets/language-learning.jpg";
import mental from "../../assets/mental.png";
import virtualTrips from "../../assets/virtual-trips.jpg";
import musicArts from "../../assets/music-arts.jpg";
import community from "../../assets/community.png";
import codingForKids from "../../assets/coding-for-kids.jpg";
import "./Courses.css";
function Courses() {
    return (
        <>
            <section className="services">
                <h2>Our Services</h2>
                <p className="p">At EduCraft, we offer a diverse array of innovative educational services designed to make learning engaging
                    and accessible for every child. Our mission is to inspire a lifelong love of learning by combining
                    high-quality interactive lessons, creative projects, and more. We are particularly
                    dedicated to fostering educational excellence through interactive and immersive experiences, tailored to
                    meet the unique needs of each learner, ensuring education is not only effective but also enjoyable. 🚀📚✨
                </p>
                <div className="service-card">
                    <img src={workout} alt="Interactive Lessons" />
                    <div>
                        <h3>Interactive Lessons</h3>
                        <p>Engaging, high-quality video lessons designed to captivate children’s attention. These lessons
                            incorporate interactive quizzes and activities to reinforce learning and make education enjoyable
                            and effective.</p>
                    </div>
                </div>
                <div className="service-card">
                    <img src={recipes} alt="Virtual Educational Games" />
                    <div>
                        <h3>Virtual Educational Games</h3>
                        <p>Fun and educational games that cover various subjects such as math, science, and language arts. These
                            games are designed to enhance critical thinking, problem-solving skills, and knowledge retention
                            through play.</p>
                    </div>
                </div>
                <div className="service-card">
                    <img src={languageLearning} alt="Language Learning" />
                    <div>
                        <h3>Language Learning</h3>
                        <p>Courses and activities designed to help children master new languages. This service includes
                            interactive lessons, cultural immersion experiences, and fun activities that make learning a new
                            language enjoyable and effective.</p>
                    </div>
                </div>
                <div className="service-card">
                    <img src={mental} alt="Creative Projects" />
                    <div>
                        <h3>Creative Projects</h3>
                        <p>Hands-on arts, crafts, and science experiments that stimulate creativity and innovation. Each project
                            comes with step-by-step guides to help children create and learn, encouraging them to explore and
                            express their creativity.</p>
                    </div>
                </div>
                <div className="service-card">
                    <img src={virtualTrips} alt="Virtual Field Trips" />
                    <div>
                        <h3>Virtual Field Trips</h3>
                        <p>Explore the world from the comfort of home with interactive virtual tours and cultural experiences.
                            These trips offer a glimpse into different cultures, histories, and sciences, broadening children’s
                            horizons and knowledge.</p>
                    </div>
                </div>
                <div className="service-card">
                    <img src={musicArts} alt="Music and Arts" />
                    <div>
                        <h3>Music and Arts</h3>
                        <p>Music lessons and art classes that nurture artistic talents. Children can explore different
                            instruments, learn to read music, and create beautiful artworks, fostering their creativity and
                            appreciation for the arts.</p>
                    </div>
                </div>
                <div className="service-card">
                    <img src={community} alt="Parent Resources" />
                    <div>
                        <h3>Parent Resources</h3>
                        <p>Comprehensive tips and tools to help parents support their child's learning journey. This service
                            includes guides on effective learning strategies, educational resources, and ways to foster a
                            positive learning environment at home.</p>
                    </div>
                </div>

                <div className="service-card">
                    <img src={codingForKids} alt="Coding for Kids" />
                    <div>
                        <h3>Coding for Kids</h3>
                        <p>Learn programming through engaging and interactive lessons. This service includes real-world projects
                            where children can create their own apps, games, and websites, developing essential coding skills in
                            a fun way.</p>
                    </div>
                </div>
            </section>
        </>
    )
}
export default Courses;