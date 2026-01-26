import React, { useState, useEffect } from "react";
import "./Auth.css";
import { useDispatch, useSelector } from "react-redux";
import { authStart, authSuccess, authFailure } from "../redux/slices/authSlice";
import DotButton from "../CustomComponents/Buttons/DotButton/DotButton";

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
  SERVER_ERROR: "Something went wrong. Please try again later."
};

const Auth = () => {
  const dispatch = useDispatch();
  const { user, loading, error } = useSelector((state) => state.auth);

  /* toggle signup/login */
  const [isSignup, setIsSignup] = useState(false);

  /* local UI message */
  const [uiMessage, setUiMessage] = useState(null); //errormessage / seterrormessage
  const [uiType, setUiType] = useState(null); // "error" | "success" //errortype/ seterrortype

  /* form data */
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  /* update UI message from redux error */
  useEffect(() => {
    if (error) {
      setUiMessage(AUTH_ERROR_MESSAGES[error] || "Something went wrong");
      setUiType("error");
    }
  }, [error]);

  /* clear messages when switching mode */
  const switchMode = (value) => {
    setIsSignup(value);
    setUiMessage(null);
    setUiType(null);
    dispatch(authFailure(null));
  };

  const handleChange = (e) => {
    if (uiMessage) {
      setUiMessage(null);
      setUiType(null);
    }

    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (loading) return;

    dispatch(authStart());
    setUiMessage(null);
    setUiType(null);

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

      /* SUCCESS MESSAGE ONLY FOR LOGIN */
      if (!isSignup) {
        setUiMessage(`Logged in as ${formData.email}`);
        setUiType("success");
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
              <a className="icon"><i className="fa-brands fa-google"></i></a>
              <a className="icon"><i className="fa-brands fa-apple"></i></a>
              <a className="icon"><i className="fa-solid fa-key"></i></a>
            </div>

            <span>or use your email for registration</span>

            <input name="name" placeholder="Name" value={formData.name} onChange={handleChange} />
            <input name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
            <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} />
            <input type="password" name="confirmPassword" placeholder="Confirm Password" value={formData.confirmPassword} onChange={handleChange} />

            {/* MESSAGE SLOT (FIXED HEIGHT) */}
            <div className="auth-message-slot">
              {uiType === "error" && <p className="auth-msg error-msg">{uiMessage}</p>}
            </div>

            <DotButton type="submit" label={loading ? "Please wait..." : "Sign Up"} />

            <p className="mobile-toggle">
              Already have an account?
              <button type="button" onClick={() => switchMode(false)}>Log In</button>
            </p>
          </form>
        </div>

        {/* ================= LOGIN ================= */}
        <div className="form-container sign-in">
          <form onSubmit={handleSubmit}>
            <h1>Log In</h1>

            <div className="social-icons">
              <a className="icon"><i className="fa-brands fa-google"></i></a>
              <a className="icon"><i className="fa-brands fa-apple"></i></a>
              <a className="icon"><i className="fa-solid fa-key"></i></a>
            </div>

            <span>or use your email password</span>

            <input name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
            <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} />

            <a>Forget Your Password?</a>

            {/* MESSAGE SLOT (FIXED HEIGHT) */}
            <div className="auth-message-slot">
              {uiType === "error" && <p className="auth-msg error-msg">{uiMessage}</p>}
              {uiType === "success" && <p className="auth-msg success-msg">{uiMessage}</p>}
            </div>

            <DotButton type="submit" label={loading ? "Please wait..." : "Log In"} />

            <p className="mobile-toggle">
              Don&apos;t have an account?
              <button type="button" onClick={() => switchMode(true)}>Sign Up</button>
            </p>
          </form>
        </div>

        {/* TOGGLE PANELS (UNCHANGED) */}
        <div className="toggle-container">
          <div className="toggle">
            <div className="toggle-panel toggle-left">
              <h1>Welcome Back!</h1>
              <p>Enter your personal details to use all LMS features</p>
              <button className="hidden" onClick={() => switchMode(false)}>Log In</button>
            </div>

            <div className="toggle-panel toggle-right">
              <h1>Hello, Friend!</h1>
              <p>Register with your personal details to use all LMS features</p>
              <button className="hidden" onClick={() => switchMode(true)}>Sign Up</button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Auth;
