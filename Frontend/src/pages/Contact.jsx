import React, { useRef } from "react";
import emailjs from "emailjs-com";
import Linkedin from "../assets/Linkedin.png";
import Instagram from "../assets/Insta.png";
import "./Contact.css"
function Contact() {
    const form = useRef();

    const sendEmail = (e) => {
        e.preventDefault();

        emailjs.sendForm(
            "service_sr9sp4y",
            "template_cl0281p",
            form.current,
            "DnKdWUbD2WGVBV50D"
        )
        .then(
            (result) => {
                alert("Message sent successfully!");
                console.log(result.text);
            },
            (error) => {
                alert("Failed to send message.");
                console.log(error.text);
            }
        );

        e.target.reset();
    };

    return (    
        <>
            <section className="contact">
                <h2>Contact Us</h2>
                <p>We'd love to hear from you! Whether you have questions, feedback, or just want to say hello, feel free to reach out 🤗.</p>

                <form ref={form} onSubmit={sendEmail} className="contact-form">
                    <label htmlFor="name">Name:</label>
                    <input type="text" id="name" name="name" required />

                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" name="email" required />

                    <label htmlFor="message">Message:</label>
                    <textarea id="message" name="message" rows="6" required></textarea>

                    <button type="submit">Send Message</button>
                </form>

                <div className="social-media">
                    <h3>Connect with Us</h3>
                    <a href="https://www.linkedin.com/in/tamminaina-manikiran-85b03726a/" target="_blank" rel="noopener noreferrer">
                        <img src={Linkedin} alt="LinkedIn" />
                    </a>
                    <a href="https://www.instagram.com/manikiran993" target="_blank" rel="noopener noreferrer">
                        <img src={Instagram} alt="Instagram" />
                    </a>
                </div>
            </section>
        </>
    );
}

export default Contact;
