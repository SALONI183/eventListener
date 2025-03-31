import React from "react";
import "./LandingPage.css";
import landingPhoto from "../assets/landingPhoto.png";
import photoOne from "../assets/Fantastical.png";
import photoTwo from "../assets/screen.png";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import star from "../assets/star.png";
import wrapone from "../assets/wrap-one.png";
import wraptwo from "../assets/wrap-two.png";
import iconOne from "../assets/icon-1.png";
import iconTwo from "../assets/icon-2.png";
import iconThree from "../assets/icon-3.png";
import iconFour from "../assets/icon-4.png";
import iconFive from "../assets/icon-5.png";
import iconSix from "../assets/icon-6.png";
import iconSeven from "../assets/icon-7.png";
import iconEight from "../assets/icon-8.png";
import iconNine from "../assets/icon-9.png";
import twitter from "../assets/twitter.png";
import instagram from "../assets/instagram.png";
import youtube from "../assets/youtube.png";
import tiktok from "../assets/tiktok.png";
import dice from "../assets/dice.png";

const LandingPage = () => {
  const testimonials = [
    {
      id: 1,
      text: "Amazing tool! Saved me months",
      description:
        "This is a placeholder for your testimonials and what your client has to say. Put them here and make sure it's 100% true and meaningful.",
      name: "John Master",
      role: "Director, Spark.com",
      bgColor: "#DEDEDE",
    },
    {
      id: 2,
      text: "Amazing tool! Saved me months",
      description:
        "This is a placeholder for your testimonials and what your client has to say. Put them here and make sure it's 100% true and meaningful.",
      name: "John Master",
      role: "Director, Spark.com",
    },
    {
      id: 3,
      text: "Amazing tool! Saved me months",
      description:
        "This is a placeholder for your testimonials and what your client has to say. Put them here and make sure it's 100% true and meaningful.",
      name: "John Master",
      role: "Director, Spark.com",
    },
    {
      id: 4,
      text: "Amazing tool! Saved me months",
      description:
        "This is a placeholder for your testimonials and what your client has to say. Put them here and make sure it's 100% true and meaningful.",
      name: "John Master",
      bgColor: "#DEDEDE",
      role: "Director, Spark.com",
    },
  ];
  return (
    <>
      <main>
        <div className="section-one">
          {<Navbar />}
          <div className="main-page">
            <h1 className="heading">
              <span className="cnnct">CNNCT</span> – Easy <br />
              Scheduling Ahead
            </h1>
            <Link to="/signup">
              <button className="btn">Sign up free</button>
            </Link>
            <img className="landingImage" src={landingPhoto} alt="" />
          </div>
        </div>
        <div className="section-two">
          <div className="sec-one">
            <h2 className="headings-one">
              Simplified scheduling for you and your team
            </h2>
            <p className="headings-one-para">
              CNNCT eliminates the back-and-forth of scheduling meetings so you
              can focus on what matters. Set your availability, share your link,{" "}
              <br />
              and let others book time with you instantly.
            </p>
          </div>
          <div className="sec-two">
            <div className="part-one">
              <h2 className="headings-two">
                Stay Organized with Your <br /> Calendar & Meetings
              </h2>
              <p className="headings-two-para">
                <p className="seemless-para">Seamless Event Scheduling</p>
                <ul className="list">
                  <li>
                    View all your upcoming meetings and appointments in one
                    place.
                  </li>
                  <li>
                    Syncs with Google Calendar, Outlook, and iCloud to avoid
                    conflicts
                  </li>
                  <li>
                    Customize event types: one-on-ones, team meetings, group
                    sessions, and webinars.
                  </li>
                </ul>
              </p>
              <div className="customer">
                <h1 className="customer-heading">
                  Here's what our <span>customer</span> <br /> has to says
                </h1>
                <button className="customer-btn">Read customer stories</button>
              </div>
            </div>
            <div className="photoes">
              <img className="p-one" src={photoOne} alt="" />
              <img className="p-two" src={photoTwo} alt="" />
              <div className="description">
                <img className="star" src={star} alt="" />
                <p>
                  [short description goes in here] lorem <br /> ipsum is a
                  placeholder text <br /> to demonstrate.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="section-three">
          <div className="sec-three">
           
            <section className="testimonials-section">
  <div className="testimonials-container">
    {testimonials.map((testimonial) => (
      <div 
        className="testimonial" 
        key={testimonial.id} 
        style={{ backgroundColor: testimonial.bgColor || "#FFFFFF" }} 
      >
        <p className="test-text">{testimonial.text}</p>
        <p className="descript">{testimonial.description}</p>
        <div className="author">
          <div className="circle"></div>
          <div className="circle-info">
            {testimonial.name}
            <span>{testimonial.role}</span>
          </div>
        </div>
      </div>
    ))}
  </div>
</section>

          </div>
        </div>
        <div className="section-four">
          <section class="integration-section">
            <h2 class="integration-heading">All Link Apps and Integrations</h2>
            <div class="integration-grid">
              <div class="integration-card">
                <img src={iconOne} alt="Audiomack" />
                <div>
                  <h4>Audiomack</h4>
                  <p>Add an Audiomack player to your Linktree</p>
                </div>
              </div>
              <div class="integration-card">
                <img src={iconTwo} alt="Band" />
                <div>
                  <h4>Bandisintown</h4>
                  <p>Drive ticket sales by listing your events</p>
                </div>
              </div>
              <div class="integration-card">
                <img src={iconThree} alt="Bonfire" />
                <div>
                  <h4>Bonfire</h4>
                  <p>Display and sell your custom merch</p>
                </div>
              </div>
              <div class="integration-card">
                <img src={iconFour} alt="Bonfire" />
                <div>
                  <h4>Books</h4>
                  <p>Promote books on your Linktree</p>
                </div>
              </div>
              <div class="integration-card">
                <img src={iconFive} alt="Bonfire" />
                <div>
                  <h4>Buy Me A Gift</h4>
                  <p>Let visitors support you with a small gift</p>
                </div>
              </div>
              <div class="integration-card">
                <img src={iconSix} alt="Bonfire" />
                <div>
                  <h4>Cameo</h4>
                  <p>Make impossible fan connections possible</p>
                </div>
              </div>
              <div class="integration-card">
                <img src={iconSeven} alt="Bonfire" />
                <div>
                  <h4>Clubhouse</h4>
                  <p>Let your community in on the conversation</p>
                </div>
              </div>
              <div class="integration-card">
                <img src={iconEight} alt="Bonfire" />
                <div>
                  <h4>Community</h4>

                  <p>Build an SMS subscriber list</p>
                </div>
              </div>
              <div class="integration-card">
                <img src={iconNine} alt="Bonfire" />
                <div>
                  <h4>Contact Details</h4>
                  <p>Easily share downloadable contact details</p>
                </div>
              </div>
            </div>
          </section>
        </div>
        <div className="section-footer">
          <footer className="footer">
            <div className="footer-container">
              <div className="auth-buttons">
                <button className="btn btn-log">Log in</button>
                <button className="btn btn-sign">Sign up free</button>
              </div>
              <div className="footer-links">
                {" "}
                <div>
                  
                  <ul className="ul">
                    <li>About CNNCT</li>
                    <li>Blog</li>
                    <li>Press</li>
                    <li>Social Good</li>
                    <li>Contact</li>
                  </ul>
                </div>
                <div>
                 
                  <ul className="ul">
                    <li>Careers</li>
                    <li>Getting Started</li>
                    <li>Features and How-Tos</li>
                    <li>FAQs</li>
                    <li>Report a Violation</li>
                  </ul>
                </div>
                <div>
                
                  <ul className="ul">
                    <li>Terms and Conditions</li>
                    <li>Privacy Policy</li>
                    <li>Cookie Notice</li>
                    <li>Trust Center</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="text-cont">
              <p className="footer-text">
                We acknowledge the Traditional Custodians of the land on which
                our office stands, The Wurundjeri people of the Kulin Nation,
                and pay our respects to Elders past, present, and emerging.
              </p>
              <div className="social-icons">
                <img src={twitter} alt="" />
                <img src={instagram} alt="" />
                <img src={youtube} alt="" />
                <img src={tiktok} alt="" />
                <img src={dice} alt="" />
              </div>
            </div>
          </footer>
        </div>
      </main>
    </>
  );
};

export default LandingPage;
