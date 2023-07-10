import styles from "./signup.module.css";
import { Link } from "react-router-dom";
import { useRef, useContext } from "react";
import AuthContext from "../../context/auth-context";

const Signup = () => {
  const context = useContext(AuthContext);

  const fullnameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

  const sendUserDetails = async (e) => {
    e.preventDefault();

    const enteredfullname = fullnameRef.current.value;
    const enteredemail = emailRef.current.value;
    const enteredPassword = passwordRef.current.value;

    const enteredData = {
      fullname: enteredfullname,
      username: enteredemail,
      password: enteredPassword,
    };

    context.onSignUp(enteredData);

    fullnameRef.current.value = "";
    emailRef.current.value = "";
    passwordRef.current.value = "";
  };

  return (
    <div className={styles.container}>
      <div className={styles.heading}> Sign up and start writing</div>
      <form className={styles.form} onSubmit={sendUserDetails}>
        <div className={styles.inputCover}>
          <input
            type="text"
            id="name"
            placeholder="Full name"
            name="fullname"
            className={styles.input}
            ref={fullnameRef}
            autoComplete="off"
            required
          />
          <label htmlFor="name" className={styles.label}>
            {" "}
            Full Name
          </label>
        </div>

        <div className={styles.inputCover}>
          <input
            type="email"
            id="email"
            placeholder="Email Address"
            name="username"
            className={styles.input}
            ref={emailRef}
            autoComplete="off"
            required
          />
          <label htmlFor="email" className={styles.label}>
            {" "}
            Email Address{" "}
          </label>
        </div>

        <div className={styles.inputCover}>
          <input
            type="password"
            id="password"
            placeholder="Enter your password"
            name="password"
            className={styles.input}
            ref={passwordRef}
            required
          />
          <label htmlFor="password" className={styles.label}>
            {" "}
            Password{" "}
          </label>
        </div>
        <div>
          <button className={styles.action}> Sign up </button>
        </div>
      </form>

      <div className={styles.alternative}>
        Already have an account?{" "}
        <Link to="/login" className={styles.login}>
          {" "}
          Log in{" "}
        </Link>
      </div>
    </div>
  );
};

export default Signup;
