import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Login.scss";

const Login = () => {
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });

  const [createAccountForm, setCreateAccountForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    userProfile: [],
  });

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginForm({ ...loginForm, [name]: value });
  };

  const handleCreateAccountChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setCreateAccountForm({
        ...createAccountForm,
        userProfile: checked
          ? [...createAccountForm.userProfile, value]
          : createAccountForm.userProfile.filter((item) => item !== value),
      });
    } else {
      setCreateAccountForm({ ...createAccountForm, [name]: value });
    }
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    console.log(loginForm);
  };

  const handleCreateAccountSubmit = (e) => {
    e.preventDefault();
    console.log(createAccountForm);
  };

  return (
    <div className="login">
      <div className="login__container">
        <div className="login__form-section">
          <h2 className="login__title">Login</h2>
          <form className="login__form" onSubmit={handleLoginSubmit}>
            <div className="login__form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={loginForm.email}
                onChange={handleLoginChange}
                required
              />
            </div>
            <div className="login__form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={loginForm.password}
                onChange={handleLoginChange}
                required
              />
            </div>
            <button type="submit" className="login__submit">
              Login
            </button>
          </form>
          <p className="login__guest">
            <Link to="/record">Continue as Guest</Link>
          </p>
        </div>

        <div className="login__form-section-2">
          <h2 className="login__title">Create Account</h2>
          <form className="login__form" onSubmit={handleCreateAccountSubmit}>
            <div className="login__form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={createAccountForm.name}
                onChange={handleCreateAccountChange}
                required
              />
            </div>
            <div className="login__form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={createAccountForm.email}
                onChange={handleCreateAccountChange}
                required
              />
            </div>
            <div className="login__form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={createAccountForm.password}
                onChange={handleCreateAccountChange}
                required
              />
            </div>
            <div className="login__form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={createAccountForm.confirmPassword}
                onChange={handleCreateAccountChange}
                required
              />
            </div>
            <div className="login__form-group">
              <h3 className="login__profile-title">Your Profile</h3>
              <p className="login__profile-description">
                Help us understand your journey!
              </p>
              <div className="login__checkboxes">
                <label>
                  <input
                    type="checkbox"
                    name="userProfile"
                    value="competitive_athlete"
                    onChange={handleCreateAccountChange}
                  />
                  <span>Competitive Athlete</span>
                </label>
                <label>
                  <input
                    type="checkbox"
                    name="userProfile"
                    value="recovering_athlete"
                    onChange={handleCreateAccountChange}
                  />
                  <span>Recovering Athlete</span>
                </label>
                <label>
                  <input
                    type="checkbox"
                    name="userProfile"
                    value="new_to_flexibility_training"
                    onChange={handleCreateAccountChange}
                  />
                  <span>New to Flexibility Training</span>
                </label>
                <label>
                  <input
                    type="checkbox"
                    name="userProfile"
                    value="senior_seeking_mobility"
                    onChange={handleCreateAccountChange}
                  />
                  <span>Senior Seeking Mobility Enhancement</span>
                </label>
                <label>
                  <input
                    type="checkbox"
                    name="userProfile"
                    value="beginner_in_fitness"
                    onChange={handleCreateAccountChange}
                  />
                  <span>Beginner in Fitness</span>
                </label>
                <label>
                  <input
                    type="checkbox"
                    name="userProfile"
                    value="yoga_practitioner"
                    onChange={handleCreateAccountChange}
                  />
                  <span>Yoga Practitioner</span>
                </label>
              </div>
            </div>

            <button type="submit" className="login__submit">
              Create Account
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
