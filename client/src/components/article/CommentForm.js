import { useRef, useContext } from "react";
import AuthContext from "../../context/auth-context";
import styles from "./commentform.module.css";

const CommentForm = (props) => {
  const context = useContext(AuthContext);
  const user = useContext(AuthContext).user;

  const nameRef = useRef();
  const emailRef = useRef();
  const commentRef = useRef();

  const handleSubmit = (event) => {
    event.preventDefault();

    if (context.isLoggedin) {
      const enteredComment = commentRef.current.value;

      const commentData = {
        name: user.name,
        email: user.email,
        comment: enteredComment,
      };

      props.onAddComment(commentData);

      commentRef.current.value = "";
    } else {
      const enteredName = nameRef.current.value;
      const enteredMail = emailRef.current.value;
      const enteredComment = commentRef.current.value;

      const commentData = {
        name: enteredName,
        email: enteredMail,
        comment: enteredComment,
      };

      props.onAddComment(commentData);

      nameRef.current.value = "";
      emailRef.current.value = "";
      commentRef.current.value = "";
    }
  };

  return (
    <div className={styles.commentArea}>
      <h2 className={styles.commentH3}>Add your comment</h2>
      {context.isLoggedin && (
        <form className="commentForm" onSubmit={handleSubmit}>
          <div className={styles.control}>
            <label>Leave a reply</label>
            <textarea
              id="comment"
              name="comment"
              cols="5"
              rows="5"
              placeholder="Enter your comment"
              ref={commentRef}
              required
            ></textarea>
          </div>
          <div className={styles.action}>
            <button>Add Comment</button>
          </div>
        </form>
      )}
      {!context.isLoggedin && (
        <form className="commentForm" onSubmit={handleSubmit}>
          <div className={styles.control}>
            <label>Name(required)</label>
            <input
              id="name"
              type="text"
              placeholder="Enter your name"
              name="name"
              autoComplete="off"
              ref={nameRef}
              required
            />
            <br />
          </div>

          <div className={styles.control}>
            <label>Email(required) </label>
            <input
              id="email"
              type="email"
              placeholder="Email"
              name="email"
              autoComplete="off"
              ref={emailRef}
              required
            />
          </div>
          <br />
          <div className={styles.control}>
            <label>Leave a reply</label>
            <textarea
              id="comment"
              name="comment"
              cols="5"
              rows="5"
              placeholder="Enter your comment"
              ref={commentRef}
              required
            ></textarea>
          </div>
          <div className={styles.action}>
            <button>Add Comment</button>
          </div>
        </form>
      )}
    </div>
  );
};

export default CommentForm;
