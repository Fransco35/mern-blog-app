import styles from "./login.module.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook } from "@fortawesome/free-brands-svg-icons";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { useContext } from "react";
import AuthContext from "../../context/auth-context";

const Login = () => {
  const context = useContext(AuthContext);

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
      <Link to="/api/auth/facebook" className={styles.social}>
        <FontAwesomeIcon
          icon={faFacebook}
          size="lg"
          style={{ color: "#1658ca" }}
        />{" "}
        Continue with Facebook
      </Link>

      <form className={styles.form}>
        <div className={styles.inputCover}>
          <input
            type="email"
            id="email"
            placeholder="Email Address"
            className={styles.input}
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
