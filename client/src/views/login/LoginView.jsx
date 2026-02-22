import React, { useState } from "react";
import "./LoginView.css";
import { login, loginAsDemoUser } from "../../api/auth-api";
import { useAuth } from "../../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import SpinnerComponent from "../../components/spinner/SpinnerComponent";
import logo from "../../../public/images/logo.png";

const LoginView = () => {
  const [authData, setAuthData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isDemoLoading, setIsDemoLoading] = useState(false);

  const navigate = useNavigate();
  const { setUserData } = useAuth();

  const changeHandler = (e) => {
    setAuthData({ ...authData, [e.target.name]: e.target.value });
  };

  const loginHandler = async (e) => {
    e.preventDefault();
    const { email, password } = authData;
    setIsLoading(true);

    try {
      const user = await login(email, password);
      setUserData(user);
      toast.success("Login successful!");
      navigate("/");
    } catch (error) {
      setIsLoading(false);
      const errorMessage =
        error.message || "An unknown error occurred during login attempt.";
      setError(errorMessage);
    }
  };

  const demoLoginHandler = async () => {
    setIsDemoLoading(true);
    setError(null);

    try {
      const user = await loginAsDemoUser();
      setUserData(user);
      toast.success("Logged in as Demo User!");
      navigate("/catalog");
    } catch (error) {
      setIsDemoLoading(false);
      setError("Demo login failed. Please try again later.");
    }
  };

  return (
    <div className="login-page">
      <div className="login-grid-container">
      <div className="left-section-container" data-aos="fade-right">
        <div className="content">
          <Link to={"/"}>
            <img src={logo} alt="Logo" className="logo" />
          </Link>
          <h1>Your Next Read Awaits</h1>
          <p>
            Organize, discover, and fall in love with books—all in one place.
          </p>
        </div>
      </div>
      <div className="right-section-container" data-aos="fade-left">
        <form className="login-form" onSubmit={loginHandler}>
          <h2>Welcome back</h2>
          <p>Welcome back, please enter your credentials.</p>
          <label htmlFor="email">Email</label>
          <input
            type="text"
            id="email"
            name="email"
            value={authData.email}
            onChange={changeHandler}
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={authData.password}
            onChange={(e) => {
              setAuthData({ ...authData, password: e.target.value });
            }}
          />
          <button type="submit">
            {isLoading ? (
              <SpinnerComponent size={25} color="white" />
            ) : (
              "Sign in"
            )}
          </button>

          <div className="demo-divider">
            <span>or</span>
          </div>

          <button
            type="button"
            className="demo-btn"
            onClick={demoLoginHandler}
            disabled={isDemoLoading}
          >
            {isDemoLoading ? (
              <SpinnerComponent size={25} color="#708D81" />
            ) : (
              <>Login as Demo User</>
            )}
          </button>

          {error && (
            <div
              style={{
                color: "red",
                border: "1px solid red",
                padding: "10px",
                marginTop: "10px",
                textAlign: "center",
              }}
            >
              Login Failed: {error}
            </div>
          )}
          <p className="not-registered">
            Don't have an account ?{" "}
            <Link to={"/register"}>Sign up for free</Link>
          </p>
        </form>
      </div>
    </div>

    </div>
    
  );
};

export default LoginView;
