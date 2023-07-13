import { useParams } from "react-router-dom";

import ArticleCardDetails from "../components/article/ArticleCardDetails";
import { useState, useEffect, Fragment, useCallback } from "react";

const ArticleDetails = () => {
  const [article, setArticle] = useState({});
  const [loading, setLoading] = useState(false);
  const params = useParams();

  const articleId = params.articleId;

  const fetchArticle = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/${articleId}`);

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
      {loading && <h2>loading</h2>}
      {!loading && article && (
        <ArticleCardDetails
          id={article._id}
          title={article.title}
          date={article.date}
          time={article.time}
          image={article.image}
          article={article.description}
        />
      )}
    </Fragment>
  );
};

export default ArticleDetails;
