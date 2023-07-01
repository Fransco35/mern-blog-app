import Card from "../UI/Card"
import styles from "./articleform.module.css"

const ArticleForm = props => {

    return (
        <Card>
            <form className={styles.form}>
                <div className={styles.control}>
                    <label htmlFor="Title">Title</label>
                    <input
                    required
                    type="text"
                    name = "title"
                    id="title"
                    />
                </div>
                <div className={styles.control}>
                    <label htmlFor="Image">Image</label>
                    <input
                    required
                    type="file"
                    name = "image"
                    id="image"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    />
                </div>
                <div className={styles.control}>
                    <label htmlFor="Time">Read Time (1-10 minutes max)</label>
                    <input
                    required
                    type="number"
                    name = "duration"
                    id="duration"
                    min="1"
                    max="10"
                    />
                </div>
                <div className={styles.control}>
                    <label htmlFor="Description">Description</label>
                    <textarea
                    required
                    name = "description"
                    id="description"
                    rows="10"
                    cols="30"
                    />
                </div>
                <div className={styles.action}>
                    <button>Add Post</button>
                </div>
            </form>
        </Card>
    )
}

export default ArticleForm