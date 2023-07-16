import React, { useState } from "react";

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

  const signup = async (enteredData) => {
    try {
      const response = await fetch("https://rise-blog-backend.onrender.com/api/signup", {
        method: "POST",
        body: JSON.stringify(enteredData),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        alert("successfully signed in");
        setIsLoggedIn(true);
        const data = await response.json();
        setuserId(data.userId);
      }
    } catch (error) {
      console.log(error.response);
    }
  };

  const login = async (enteredData) => {
    try {
      const response = await fetch("https://rise-blog-backend.onrender.com/api/login", {
        method: "POST",
        body: JSON.stringify(enteredData),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        alert("successfully logged in");
        setIsLoggedIn(true);
        const data = await response.json();
        setuserId(data.userId);
      }
    } catch (error) {
      console.log(error.response);
    }
  };

  const logout = async () => {
    try {
      const response = await fetch("https://rise-blog-backend.onrender.com/api/logout", {
        method: "POST",
      });
      if (response.status === 200) {
        setIsLoggedIn(false);
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
