import styles from "./login.module.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook } from "@fortawesome/free-brands-svg-icons";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
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
      <div onClick={context.googleSignIn} className={styles.social}>
        <FontAwesomeIcon
          icon={faGoogle}
          size="lg"
          style={{ color: "#f10404" }}
        />
        {"  "}
        Continue with Google
      </div>
      <div onClick={context.facebookSignIn} className={styles.social}>
        <FontAwesomeIcon
          icon={faFacebook}
          size="lg"
          style={{ color: "#1658ca" }}
        />{" "}
        Continue with Facebook
      </div>

      <form className={styles.form} onSubmit={sendLoginDetails}>
        <div className={styles.inputCover}>
          <input
            type="email"
            id="email"
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
