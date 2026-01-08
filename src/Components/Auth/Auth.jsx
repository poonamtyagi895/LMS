import React, { useState } from "react";
import "./Auth.css";
import { useDispatch, useSelector } from "react-redux";
import { authStart, authSuccess, authFailure } from "../redux/slices/authSlice";
import Btn1 from "../Custom_components/Buttons/Btn1/Btn1";

const Auth = () => {
  const dispatch = useDispatch();
  const { user, loading, error } = useSelector((state) => state.auth);

  // toggle signup/login
  const [isSignup, setIsSignup] = useState(false);

  // form data
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // ⬇️ prevent double-submit while loading
    if (loading) return;

    console.log("Form Submitted:", {
      mode: isSignup ? "SIGNUP" : "LOGIN",
      data: formData,
    });

    // validations
    if (!formData.email || !formData.password) {
      dispatch(authFailure("Please fill all required fields"));
      return;
    }

    if (isSignup && !formData.name) {
      dispatch(authFailure("Please enter your name"));
      return;
    }

    if (isSignup && formData.password !== formData.confirmPassword) {
      dispatch(authFailure("Passwords do not match"));
      return;
    }

    dispatch(authStart());

    // mock API
    setTimeout(() => {
      const fakeUser = {
        name: isSignup ? formData.name : "Demo User",
        email: formData.email,
        role: "student",
      };

      dispatch(authSuccess(fakeUser));
    }, 800);
  };

  return (
    <div className="auth-wrapper">
      <div className={isSignup ? "container active" : "container"}>
        {/* SIGN UP FORM */}
        <div className="form-container sign-up">
          <form onSubmit={handleSubmit}>
            <h1>Create Account</h1>

            <div className="social-icons">
              <a className="icon"><i className="fa-brands fa-google"></i></a>
              <a className="icon"><i className="fa-brands fa-apple"></i></a>
              <a className="icon"><i className="fa-solid fa-key"></i></a>
            </div>

            <span>or use your email for registration</span>

            <input
              type="text"
              placeholder="Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />

            <input
              type="email"
              placeholder="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />

            <input
              type="password"
              placeholder="Password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />

            <input
              type="password"
              placeholder="Confirm Password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
            />

            {error && isSignup && (
              <p className="auth-msg error-msg">{error}</p>
            )}

            {user && isSignup && (
              <p className="auth-msg success-msg">
                Logged in as <strong>{user.email}</strong>
              </p>
            )}

            {/* Animated button */}
            <Btn1
              type="submit"
              label={loading ? "Please wait..." : "Sign Up"}
            />

            {/* mobile-only toggle */}
            <p className="mobile-toggle">
              Already have an account?{" "}
              <button
                type="button"
                onClick={() => setIsSignup(false)}
              >
                Log In
              </button>
            </p>
          </form>
        </div>

        {/* LOGIN FORM */}
        <div className="form-container sign-in">
          <form onSubmit={handleSubmit}>
            <h1>Log In</h1>

            <div className="social-icons">
              <a className="icon"><i className="fa-brands fa-google"></i></a>
              <a className="icon"><i className="fa-brands fa-apple"></i></a>
              <a className="icon"><i className="fa-solid fa-key"></i></a>
            </div>

            <span>or use your email password</span>

            <input
              type="email"
              placeholder="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />

            <input
              type="password"
              placeholder="Password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />

            <a href="#">Forget Your Password?</a>

            {error && !isSignup && (
              <p className="auth-msg error-msg">{error}</p>
            )}

            {user && !isSignup && (
              <p className="auth-msg success-msg">
                Logged in as <strong>{user.email}</strong>
              </p>
            )}

            {/* Animated button */}
            <Btn1
              type="submit"
              label={loading ? "Please wait..." : "Log In"}
            />

            {/* mobile-only toggle */}
            <p className="mobile-toggle">
              Don&apos;t have an account?{" "}
              <button
                type="button"
                onClick={() => setIsSignup(true)}
              >
                Sign Up
              </button>
            </p>
          </form>
        </div>

        {/* TOGGLE PANELS (DESKTOP) */}
        <div className="toggle-container">
          <div className="toggle">
            <div className="toggle-panel toggle-left">
              <h1>Welcome Back!</h1>
              <p>Enter your personal details to use all of LMS features</p>
              <button
                type="button"
                className="hidden"
                onClick={() => setIsSignup(false)}
              >
                Log In
              </button>
            </div>

            <div className="toggle-panel toggle-right">
              <h1>Hello, Friend!</h1>
              <p>Register with your personal details to use all of LMS features</p>
              <button
                type="button"
                className="hidden"
                onClick={() => setIsSignup(true)}
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Auth;
