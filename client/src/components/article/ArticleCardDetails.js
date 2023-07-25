import styles from "./articlecarddetails.module.css";
import ArticleComment from "./ArticleComment";
import CommentForm from "./CommentForm";

const ArticleCardDetails = (props) => {
  const commentHandler = async (commentData) => {
    try {
      const response = await fetch(
        `https://rise-blog-backend.onrender.com/api/${props.id}/comment`,
        {
          method: "POST",
          body: JSON.stringify(commentData),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 201) {
        alert("comment successfully saved");
      }
    } catch (error) {
      console.log(error);
    }
  };
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
      <hr />
      <h2>Comment section</h2>

      {props.comment &&
        props.comment.map((comment) => (
          <ArticleComment
            key={comment._id}
            name={comment.name}
            comment={comment.comment}
            date={comment.date}
          />
        ))}
      <hr />
      <CommentForm onAddComment={commentHandler} />
    </section>
  );
};

export default ArticleCardDetails;
