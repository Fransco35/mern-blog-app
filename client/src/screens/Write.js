import ArticleForm from "../components/article/ArticleForm";
import { Fragment } from "react";


const Write = () => {

    const sendArticle = async articledata => {
        const { title, image, time, description } = articledata


        const formData = new FormData()

        formData.append('title', title)
        formData.append('image', image)
        formData.append('time', time)
        formData.append('description', description)

        console.log(formData);

        try {
            const response = await fetch("/api/addArticles", {
                method: "POST",
                body: formData
            });


            if (response.status === 201) {
                alert("Successfully posted")
            } 
                console.log(response.json());
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <Fragment>
            <ArticleForm  onAddArticle={sendArticle}/>
        </Fragment>
    )
}

export default Write