import db from "../db/mock-api"
import Header from "../layout/Header"
import ArticleLayout from "../layout/ArticleLayout"
import { Fragment } from "react"

const Home = () => {
    const articleData = db
    return (
        <Fragment>
            <Header />
            <ArticleLayout list={articleData}/>
        </Fragment>
    )
}

export default Home