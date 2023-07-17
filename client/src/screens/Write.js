import ArticleForm from "../components/article/ArticleForm";
import { Fragment } from "react";

const Write = () => {
  const sendArticle = async (articledata) => {
    const { title, image, time, description, userId } = articledata;

    const formData = new FormData();

    formData.append("title", title);
    formData.append("image", image);
    formData.append("time", time);
    formData.append("description", description);
    formData.append("userId", userId);

    try {
      const response = await fetch(
        "https://rise-blog-backend.onrender.com/api/addArticles",
        {
          method: "POST",
          body: formData,
        }
      );

      if (response.status === 201) {
        alert("Successfully posted");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <Fragment>
      <ArticleForm onAddArticle={sendArticle} />
    </Fragment>
  );
};

export default Write;
