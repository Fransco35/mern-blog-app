import Card from "../UI/Card"
import styles from "./articleform.module.css"
import { useRef } from "react"

const ArticleForm = props => {

    const titleRef = useRef();
    const imageRef = useRef();
    const timeRef = useRef();
    const descriptionRef = useRef();

    const handleSubmit = event => {
        event.preventDefault()

        const enteredTitle = titleRef.current.value
        const enteredImage = imageRef.current.value
        const enteredTime = timeRef.current.value
        const enteredDescription = descriptionRef.current.value

        const articleData = {
            title : enteredTitle,
            image: enteredImage,
            time: enteredTime,
            description: enteredDescription
        }

        props.onAddArticle(articleData)

        titleRef.current.value = ' '
        imageRef.current.value = null
        timeRef.current.value = null
        descriptionRef.current.value = ' '


    }

    return (
        <Card>
            <form className={styles.form} onSubmit={handleSubmit}>
                <div className={styles.control}>
                    <label htmlFor="Title">Title</label>
                    <input
                    required
                    type="text"
                    name = "title"
                    id="title"
                    ref={titleRef}
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
                    ref={imageRef}
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
                    ref={timeRef}
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
                    ref={descriptionRef}
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