import React from "react";

const Landing = () => {
  return (
    <section className="landing">
      <div className="dark-overlay">
        <div className="landing-inner">
          <h1 className="x-large">The Pod Guild</h1>
          <p className="lead">
            Create a profile, find your counterpart and get podcasting!
          </p>
          <div className="buttons">
            <a href="register.html" className="btn btn-primary">
              Sign Up
            </a>
            <a href="login.html" className="btn">
              Login
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Landing;
