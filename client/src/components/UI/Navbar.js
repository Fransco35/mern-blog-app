import styles from "./navbar.module.css"
import { NavLink } from "react-router-dom"
import { useState } from "react"

const Navbar = () => {
    const [click, setClick] = useState(false)

    const toggleNav = () => {
        setClick((prevState) => !prevState )
    }

    return (
        <nav className={styles.nav}>
            <div className={styles.navLogo}>
                <NavLink to="/">RISEBLOG</NavLink>
            </div>

            <form action="#" className={styles.form}>
                <input
                type="text"
                className={styles.input}
                placeholder="Search blog"
                />
                <button className={styles.button}>GO</button>
            </form>
            

            <div className={`${styles.navList} ${ click ? styles.navListII : " "}`}>
                <ul className={styles.ul}>
                    <li className={`${styles.li} ${styles.navLink}`}>
                        <NavLink to="/write"> Write</NavLink>
                    </li>
                    <li className={`${styles.li} ${styles.navLink}`}>
                        <NavLink to="/signup"> Sign up</NavLink>
                    </li>
                    <li className={`${styles.li} ${styles.navLink}`}>
                        <NavLink to="/login"> Log In</NavLink>
                    </li>
                </ul>
            </div>

            <span className={`${styles.span} ${styles.navTrigger}`} onClick={toggleNav}>
                <i></i>
                <i></i>
                <i></i>
            </span>
        </nav>
    )
}

export default Navbar