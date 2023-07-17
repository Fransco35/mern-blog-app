import styles from "./login.module.css";
import { Link } from "react-router-dom";
import { useContext, useRef } from "react";
import AuthContext from "../../context/auth-context";

const Login = () => {
  const context = useContext(AuthContext);

  const usernameRef = useRef();
  const passwordRef = useRef();

  const sendLoginDetails = async (e) => {
    e.preventDefault();

    const enteredUsername = usernameRef.current.value;
    const enteredPassword = passwordRef.current.value;

    const enteredData = {
      username: enteredUsername,
      password: enteredPassword,
    };

    context.onLogin(enteredData);

    usernameRef.current.value = "";
    passwordRef.current.value = "";
  };

  return (
    <div className={styles.container}>
      <div className={styles.heading}>Log in to your Rise Blog account</div>
      <form className={styles.form} onSubmit={sendLoginDetails}>
        <div className={styles.inputCover}>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Email Address"
            className={styles.input}
            ref={usernameRef}
            autoComplete="off"
            required
          />
          <label htmlFor="email" className={styles.label}>
            Email Address
          </label>
        </div>

        <div className={styles.inputCover}>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Enter your password"
            className={styles.input}
            ref={passwordRef}
            autoComplete="off"
            required
          />

          <label htmlFor="password" className={styles.label}>
            Password
          </label>
        </div>
        <button className={styles.action}>Login</button>
      </form>

      <div className={styles.alternative}>
        Don&apos;t have an account ?
        <Link to="/signup" className={styles.signup}>
          {" "}
          Sign Up
        </Link>
      </div>
    </div>
  );
};

export default Login;
