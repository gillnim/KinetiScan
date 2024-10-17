// src/pages/Login.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Login.scss';

const Login = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    userProfile: [],
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setForm({
        ...form,
        userProfile: checked
          ? [...form.userProfile, value]
          : form.userProfile.filter((item) => item !== value),
      });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(form); // For now, just log the form data
  };

  return (
    <div className="login">
      <h2 className="login__title">Login to KinetiScan</h2>
      <form className="login__form" onSubmit={handleSubmit}>
        <div className="login__form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="login__form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="login__form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            required
          />
        </div>
        <div className="login__form-group">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={form.confirmPassword}
            onChange={handleChange}
            required
          />
        </div>
        <div className="login__form-group">
          <label>Select all that apply</label>
          <div className="login__checkboxes">
            <label>
              <input
                type="checkbox"
                name="userProfile"
                value="athlete"
                onChange={handleChange}
              />
              Athlete
            </label>
            <label>
              <input
                type="checkbox"
                name="userProfile"
                value="athlete_in_rehabilitation"
                onChange={handleChange}
              />
              Athlete in Rehabilitation
            </label>
            <label>
              <input
                type="checkbox"
                name="userProfile"
                value="fitness_enthusiast"
                onChange={handleChange}
              />
              Fitness Enthusiast
            </label>
            <label>
              <input
                type="checkbox"
                name="userProfile"
                value="starting_flexibility_journey"
                onChange={handleChange}
              />
              Someone Starting Their Flexibility/Movement Journey
            </label>
            <label>
              <input
                type="checkbox"
                name="userProfile"
                value="older_adult"
                onChange={handleChange}
              />
              Older Adult Looking to Improve Mobility
            </label>
          </div>
        </div>
        <button type="submit" className="login__submit">
          Login
        </button>
      </form>
      <p className="login__create-account">
        Don't have an account? <a href="/create-account">Create Account</a>
      </p>
      <p className="login__guest">
        <Link to = '/record'>Continue as Guest</Link>
      </p>
    </div>
  );
};

export default Login;
