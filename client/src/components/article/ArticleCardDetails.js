import styles from "./articlecarddetails.module.css";

const ArticleCardDetails = (props) => {
  return (
    <section className={styles.detail}>
      <h1>{props.title}</h1>
      <p className={styles.info}>
        <span className={styles.date}>{props.date}</span>
        <span className={styles.time}>{props.time} mins read</span>
      </p>
      <img
        className={styles.img}
        src={props.image}
        alt={props.title}
        width="730"
        height="487"
      />
      <article className={styles.article}>
        <p>{props.article}</p>
      </article>
    </section>
  );
};

export default ArticleCardDetails;
