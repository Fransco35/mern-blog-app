import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = React.createContext({
  isLoggedin: false,
  onSignUp: async (enteredData) => {},
  googleSignIn: () => {},
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

  const navigateHomeOnSuccess = () => {
    setIsLoggedIn(true);

    navigate("/");
  };

  const navigateWriteOnSuccess = () => {
    setIsLoggedIn(true);

    navigate("/write");
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedin: isLoggedIn,
        onSignUp: signup,
        googleSignIn: googleAuth,
        navigateHome: navigateHomeOnSuccess,
        navigateWrite: navigateWriteOnSuccess,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
