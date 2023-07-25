import React, { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";

const AuthContext = React.createContext({
  isLoggedin: false,
  userId: null,
  onSignUp: async (enteredData) => {},
  onLogin: async (enteredData) => {},
  logout: () => {},
});

export const AuthContextProvider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setuserId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userIsLoggedIn = localStorage.getItem("userId");
    if (userIsLoggedIn) {
      const cachedUser = userIsLoggedIn;
      setuserId(cachedUser);
      setIsLoggedIn(true);
    }
  }, []);

  const signup = async (enteredData) => {
    try {
      const response = await fetch(
        // "https://rise-blog-backend.onrender.com/api/signup",
        "/api/signup",
        {
          method: "POST",
          body: JSON.stringify(enteredData),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        alert("successfully signed in");
        setIsLoggedIn(true);
        const data = await response.json();
        if (data) {
          setuserId(data.userId);
        }
        localStorage.setItem("userId", data.userId);
        setTimeout(() => {
          setIsLoggedIn(false);
          localStorage.removeItem("userId");
        }, 4 * 60 * 60 * 1000);
        navigate("/");
      }
    } catch (error) {
      console.log(error.response);
    }
  };

  const login = async (enteredData) => {
    try {
      const response = await fetch(
        // "https://rise-blog-backend.onrender.com/api/login",
        "/api/login",

        {
          method: "POST",
          body: JSON.stringify(enteredData),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        alert("successfully logged in");
        setIsLoggedIn(true);
        const data = await response.json();
        if (data) {
          setuserId(data);
        }
        localStorage.setItem("userId", data.userId);
        setTimeout(() => {
          setIsLoggedIn(false);
          localStorage.removeItem("userId");
        }, 4 * 60 * 60 * 1000);
      }
      navigate("/");
    } catch (error) {
      console.log(error.response);
    }
  };

  const logout = async () => {
    try {
      const response = await fetch(
        // "https://rise-blog-backend.onrender.com/api/logout",
        "/api/logout",

        {
          method: "POST",
          credentials: "include",
        }
      );
      if (response.status === 200) {
        setIsLoggedIn(false);
        setuserId(null);
        localStorage.clear();
        alert("successfully logged out");
      }
    } catch (error) {
      console.log(error.message);
      alert("logout failure, try again");
    }
  };
  return (
    <AuthContext.Provider
      value={{
        isLoggedin: isLoggedIn,
        userId: userId,
        onSignUp: signup,
        onLogin: login,
        logout: logout,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
