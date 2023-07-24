import styles from "./articlecomment.module.css";
const ArticleComment = (props) => {
  return (
    <div className={styles.comment}>
      <img
        src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
        alt="avatar"
        title="the commentor's avatar"
        className={styles.avatar}
      />
      <p className={styles.authorName}>{props.name}</p>
      <p className={styles.authorComment}>{props.comment}</p>
    </div>
  );
};

export default ArticleComment;
