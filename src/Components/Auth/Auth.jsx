import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Auth.css";
import { useDispatch, useSelector } from "react-redux";
import {
  authStart,
  authSuccess,
  authFailure,
} from "../redux/slices/authSlice";

import DotButton from "../CustomComponents/Buttons/DotButton/DotButton";
import DotButtonWhite from "../CustomComponents/Buttons/DotButtonWhite/DotButtonWhite";
import { showToast } from "../CustomComponents/CustomToast/CustomToast";

/* ===============================
   AUTH ERROR CODE → MESSAGE MAP
================================ */
const AUTH_ERROR_MESSAGES = {
  INVALID_CREDENTIALS: "Invalid email or password.",
  USER_NOT_FOUND: "No account found with this email.",
  EMAIL_ALREADY_EXISTS: "An account with this email already exists.",
  ACCOUNT_NOT_VERIFIED: "Please verify your account before logging in.",
  ACCOUNT_LOCKED: "Your account has been locked. Please contact support.",
  OTP_EXPIRED: "OTP has expired. Please request a new one.",
  PASSWORD_TOO_WEAK: "Password is too weak. Use at least 6 characters.",
  TERMS_NOT_ACCEPTED: "Please accept the terms and conditions.",
  SERVER_ERROR: "Something went wrong. Please try again later.",
};

const Auth = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);

  /* toggle signup/login */
  const [isSignup, setIsSignup] = useState(false);

  /* form data */
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  /* Redux error → Toast */
  useEffect(() => {
    if (error) {
      showToast(
        "error",
        AUTH_ERROR_MESSAGES[error] || "Something went wrong"
      );
    }
  }, [error]);

  const switchMode = (value) => {
    setIsSignup(value);
    dispatch(authFailure(null));
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (loading) return;

    dispatch(authStart());

    /* MOCK BACKEND */
    setTimeout(() => {
      if (!formData.email || !formData.password) {
        dispatch(authFailure("INVALID_CREDENTIALS"));
        return;
      }

      if (isSignup && !formData.name) {
        dispatch(authFailure("TERMS_NOT_ACCEPTED"));
        return;
      }

      if (isSignup && formData.password !== formData.confirmPassword) {
        dispatch(authFailure("INVALID_CREDENTIALS"));
        return;
      }

      if (formData.password.length < 6) {
        dispatch(authFailure("PASSWORD_TOO_WEAK"));
        return;
      }

      if (!isSignup && formData.email === "notfound@gmail.com") {
        dispatch(authFailure("USER_NOT_FOUND"));
        return;
      }

      if (isSignup && formData.email === "existing@gmail.com") {
        dispatch(authFailure("EMAIL_ALREADY_EXISTS"));
        return;
      }

      dispatch(
        authSuccess({
          name: isSignup ? formData.name : "Demo User",
          email: formData.email,
          role: "student",
        })
      );

      if (isSignup) {
        showToast("success", "Account created successfully");
      } else {
        showToast("success", `Logged in as ${formData.email}`);
      }
    }, 800);
  };

  return (
    <div className="auth-wrapper">
      <div className={isSignup ? "container active" : "container"}>
        {/* ================= SIGN UP ================= */}
        <div className="form-container sign-up">
          <form onSubmit={handleSubmit}>
            <h1>Create Account</h1>

            <div className="social-icons">
              <button type="button" className="icon">
                <i className="fa-brands fa-google"></i>
              </button>
              <button type="button" className="icon">
                <i className="fa-brands fa-apple"></i>
              </button>
              <button type="button" className="icon">
                <i className="fa-solid fa-key"></i>
              </button>
            </div>

            <span>or use your email for registration</span>

            <input
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
            />
            <input
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
            />
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
            />

            <DotButton
              type="submit"
              label={loading ? "Please wait..." : "Sign Up"}
            />

            <p className="mobile-toggle">
              Already have an account?
              <button type="button" onClick={() => switchMode(false)}>
                Log In
              </button>
            </p>
          </form>
        </div>

        {/* ================= LOGIN ================= */}
        <div className="form-container sign-in">
          <form onSubmit={handleSubmit}>
            <h1>Log In</h1>

            <div className="social-icons">
              <button type="button" className="icon">
                <i className="fa-brands fa-google"></i>
              </button>
              <button type="button" className="icon">
                <i className="fa-brands fa-apple"></i>
              </button>
              <button type="button" className="icon">
                <i className="fa-solid fa-key"></i>
              </button>
            </div>

            <span>or use your email password</span>

            <input
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
            />

            <button type="button" className="forgot-password">
              Forget Your Password?
            </button>

            <DotButton
              type="submit"
              label={loading ? "Please wait..." : "Log In"}
            />

            <p className="mobile-toggle">
              Don&apos;t have an account?
              <button type="button" onClick={() => switchMode(true)}>
                Sign Up
              </button>
            </p>
          </form>
        </div>

        {/* ================= TOGGLE PANELS ================= */}
        <div className="toggle-container">
          <div className="toggle">
            <div className="toggle-panel toggle-left">
              <h1>Welcome Back!</h1>
              <p>Enter your personal details to use all LMS features</p>
              <DotButtonWhite
                label="Log In"
                onClick={() => switchMode(false)}
              />
            </div>

            <div className="toggle-panel toggle-right">
              <h1>Hello, Friend!</h1>
              <p>Register with your personal details to use all LMS features</p>
              <DotButtonWhite
                label="Sign Up"
                onClick={() => switchMode(true)}
              />
            </div>
          </div>
        </div>
      </div>

      {/* TEST ROUTES */}
      <button onClick={() => navigate("/admin/dashboard")}>ADMIN</button>
      <button onClick={() => navigate("/student/dashboard")}>STUDENT</button>
    </div>
  );
};

export default Auth;
