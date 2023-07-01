import styles from "./signup.module.css"
import { Link } from "react-router-dom"

const Signup = () => {

    return (
        <div className={styles.container}>
            <div className={styles.heading}> Sign up and start writing</div>
            <form className={styles.form}>
                <div className={styles.inputCover}>
                    <input
                    type="text"
                    id="name"
                    placeholder="Full name"
                    className={styles.input}
                    required
                    />
                    <label htmlFor="name" className={styles.label}> Full Name</label>
                </div>

                <div className={styles.inputCover}>
                    <input
                    type="email"
                    id="email"
                    placeholder="Email Address"
                    className={styles.input}
                    required
                    />
                    <label htmlFor="email" className={styles.label}> Email Address </label>
                </div>

                <div className={styles.inputCover}>
                    <input
                    type="password"
                    id="password"
                    placeholder="Enter your password"
                    className={styles.input}
                    required
                    />
                    <label htmlFor="password" className={styles.label}> Password </label>
                </div>
                <div>
                    <button className={styles.action}> Sign up </button>
                </div>
            </form>

            <div className={styles.alternative}>
                Already have an account? {" "}
                <Link to="/login" className={styles.login}> {" "} Log in </Link>
            </div>
        </div>
    )
}

export default Signup