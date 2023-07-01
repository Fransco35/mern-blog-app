import styles from "./articlecarddetails.module.css"

const ArticleCardDetails = props => {

    return (
        <section className={styles.detail}>
            <h1>{props.title}</h1>
            <p className={styles.info}>
                <span className={styles.date}>{props.date}</span>
                <span className={styles.time}>{props.time}</span>
            </p>
            <img src={props.image} alt={props.title}/>
            <article className={styles.article}><p>{props.article}</p></article>
        </section>
    )
}

export default ArticleCardDetails