import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = React.createContext({
  isLoggedin: false,
  onSignUp: async (enteredData) => {},
  onLogin: async (enteredData) => {},
  googleSignIn: () => {},
  facebookSignIn: () => {},
  logout: () => {},
});

export const AuthContextProvider = (props) => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const signup = async (enteredData) => {
    try {
      const response = await fetch("/api/signup", {
        method: "POST",
        body: JSON.stringify(enteredData),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        alert("successfully signed in");
        setIsLoggedIn(true);
      }
    } catch (error) {
      console.log(error.response);
    }
  };

  const googleAuth = () => {
    window.location.href = "http://localhost:3001/api/google";
  };

  const facebookAuth = () => {
    window.location.href = "http://localhost:3001/api/facebook";
  };

  const login = async (enteredData) => {
    try {
      const response = await fetch("/api/login", {
        method: "POST",
        body: JSON.stringify(enteredData),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        alert("successfully logged in");
        setIsLoggedIn(true);
      }
    } catch (error) {
      console.log(error.response);
    }
  };

  const navigateHomeOnSuccess = () => {
    setIsLoggedIn(true);

    navigate("/");
  };

  const navigateWriteOnSuccess = () => {
    setIsLoggedIn(true);

    navigate("/write");
  };

  const logout = async () => {
    try {
      const response = await fetch("/api/logout", {
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
        onSignUp: signup,
        onLogin: login,
        googleSignIn: googleAuth,
        facebookSignIn: facebookAuth,
        navigateHome: navigateHomeOnSuccess,
        navigateWrite: navigateWriteOnSuccess,
        logout: logout,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
