import Header from "../layout/Header";
import ArticleLayout from "../layout/ArticleLayout";
import { Fragment, useState, useEffect, useCallback } from "react";

const Home = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchArticles = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/");
      if (response.status === 200) {
        const data = await response.json();

        const loadedData = [];

        for (const id in data) {
          loadedData.push({
            id: data[id]._id,
            title: data[id].title,
            time: data[id].time,
            description: data[id].description,
            image: data[id].image,
            date: data[id].date,
            fullname: data[id].userId.fullname,
          });
        }

        setArticles(loadedData);
      }
    } catch (error) {
      console.log(error.message);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchArticles();
  }, [fetchArticles]);

  console.log(articles);
  return (
    <Fragment>
      <Header />
      {loading && <p>Loading ...</p>}
      {!loading && articles.length > 0 && <ArticleLayout list={articles} />}
    </Fragment>
  );
};

export default Home;
