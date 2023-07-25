import { useParams } from "react-router-dom";

import ArticleCardDetails from "../components/article/ArticleCardDetails";
import { useState, useEffect, Fragment, useCallback } from "react";
import Card from "../components/UI/Card";

const ArticleDetails = () => {
  const [article, setArticle] = useState({});
  const [loading, setLoading] = useState(false);
  const params = useParams();

  const articleId = params.articleId;

  const fetchArticle = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://rise-blog-backend.onrender.com/api/${articleId}`
      );

      if (response.status === 200) {
        const data = await response.json();

        if (data) {
          setArticle(data);
        }
      }
    } catch (error) {
      console.log(error.message);
    }

    setLoading(false);
  }, [articleId]);

  useEffect(() => {
    fetchArticle();
  }, [articleId, fetchArticle]);

  return (
    <Fragment>
      {loading && (
        <Card>
          <h1>Loading...</h1>
        </Card>
      )}
      {!loading && article && (
        <ArticleCardDetails
          id={article._id}
          title={article.title}
          date={article.date}
          time={article.time}
          image={article.image}
          article={article.description}
          comment={article.comments}
        />
      )}
    </Fragment>
  );
};

export default ArticleDetails;
