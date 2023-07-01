import styles from "./articlelayout.module.css"
import ArticleCard from "../components/article/ArticleCard"
import Pagination from "../components/pagination/Pagination"
import { useState, useMemo } from "react";

let pageSize = 10;

const ArticleLayout = props => {
    const [currentPage, setCurrentPage] = useState(1)

    const currentPageData = useMemo(() => {
        const firstPageIndex = (currentPage - 1) * pageSize;
        const lastPageIndex = firstPageIndex + pageSize

        return props.list.slice(firstPageIndex, lastPageIndex)
    }, [currentPage, props.list])

    return (
        <div className={styles.articleContainer}>
            <div className={styles.heading}> All Stories</div>

            <div className={styles.articles}>
                {currentPageData.map(item => (
                    <ArticleCard
                    key={item.id}
                    image={item.image}
                    title={item.title}
                    article={item.post}
                    authorImg={item.authorImg}
                    author={item.author}
                    date={item.date}
                    time={item.time}
                    />
                ))}
            </div>
            <div className={styles.pagination}>
                <Pagination 
                currentPage={currentPage}
                totalCount={props.list.length}
                pageSize={pageSize}
                onPageChange={page => setCurrentPage(page)}
                />
            </div>
        </div>
    )
}

export default ArticleLayout;