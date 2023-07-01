import styles from "./card.module.css";

function Card(props) {
    return <div className={styles.card}>{props.children}</div>
}

export default Card