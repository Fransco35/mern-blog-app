import React, { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";

const AuthContext = React.createContext({
  isLoggedin: false,
  user: {},
  onSignUp: async (enteredData) => {},
  onLogin: async (enteredData) => {},
  logout: () => {},
});

export const AuthContextProvider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const userIsLoggedIn = localStorage.getItem("token");
    if (userIsLoggedIn) {
      setIsLoggedIn(true);
    }
  }, []);

  const signup = async (enteredData) => {
    try {
      const response = await fetch(
        "https://rise-blog-backend.onrender.com/api/signup",
        {
          method: "POST",
          body: JSON.stringify(enteredData),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        alert("successfully signed up");
        setIsLoggedIn(true);
        const data = await response.json();
        localStorage.setItem("token", data.token);
        setTimeout(() => {
          setIsLoggedIn(false);
          localStorage.removeItem("token");
        }, 7 * 60 * 60 * 1000);

        if (data) {
          setUser({
            name: data.fullname,
            email: data.username,
          });
        }

        navigate("/");
      }
    } catch (error) {
      console.log(error.response);
    }
  };

  const login = async (enteredData) => {
    try {
      const response = await fetch(
        "https://rise-blog-backend.onrender.com/api/login",
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
        localStorage.setItem("token", data.token);
        setTimeout(() => {
          setIsLoggedIn(false);
          localStorage.removeItem("token");
        }, 7 * 60 * 60 * 1000);
        if (data) {
          setUser({
            name: data.fullname,
            email: data.username,
          });
        }
        navigate("/");
      }
    } catch (error) {
      console.log(error.response);
    }
  };

  const logout = async () => {
    try {
      const response = await fetch(
        "https://rise-blog-backend.onrender.com/api/logout",
        {
          method: "POST",
          credentials: "include",
        }
      );
      if (response.status === 200) {
        setIsLoggedIn(false);
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
        user: user,
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
