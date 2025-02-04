import React from "react";
import "./App.css"; // Reuse existing styles

const About = () => {
  return (
    <div className="about-page">
      <h1>About Project</h1>
      <p>
        Welcome to the Interdimensional Internet project, a dynamic web
        application built to explore the infinite possibilities of
        interdimensional design! Using advanced technologies, this
        application generates portals into the unknown, leveraging APIs and
        AI-generated content.
      </p>
      <h2>About Me</h2>
      <p>
        Hi! I’m <strong>Mikah Niehaus</strong>, a Full Stack Software
        Developer and Certified AI Developer with over six years of
        experience building cloud-native, event-driven distributed systems.
        I specialize in:
      </p>
      <ul>
        <li>
          Designing and developing scalable, high-performance web
          applications.
        </li>
        <li>
          Leveraging AI to build cutting-edge applications that push the
          boundaries of technology.
        </li>
        <li>
          Utilizing .NET Core, Kubernetes, and microservices to craft
          robust backend systems.
        </li>
      </ul>
      <p>
        Check out my portfolio and contact me below for more exciting
        projects!
      </p>
    </div>
  );
};

export default About;
