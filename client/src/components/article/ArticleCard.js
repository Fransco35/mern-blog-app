import styles from "./articlecard.module.css"
import { Link } from "react-router-dom"
const ArticleCard = props => {

    return (
        <div className={styles.article}>
            <div className={styles.articleImg}>
                <img src={props.image} alt={props.title} />
            </div>
            <h3 className={styles.articleTitle}> {props.title} </h3>
            <p>{props.article} ... <button className={styles.articleButton}> <Link to='/:articleId'> Read more </Link>  </button></p>

            <div className={styles.authorDetails}>
            <img src={props.authorImg} alt={props.author} />
            <p className={styles.authorName}>{props.author}</p>
            <p> <span className={styles.date}>{props.date}</span> <span className={styles.time}>{props.time}</span> </p>
            </div>
        </div>
       
    )
}

export default ArticleCard