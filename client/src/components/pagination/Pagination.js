import styles from "./pagination.module.css";
import {usePagination, DOTS} from "../../hooks/use-pagination"

const Pagination = props => {
    const {onPageChange, totalCount, siblingCount = 1, currentPage, pageSize } = props

    const paginationRange = usePagination({
        currentPage, totalCount, siblingCount, pageSize
    })

    if(currentPage === 0 || paginationRange.length < 2 ) {
        return null;
    }

    const onNext = () => {
        onPageChange(currentPage + 1);
    }

    const onPrevious = () => {
        onPageChange(currentPage - 1);
    }

    let lastPage = paginationRange[paginationRange.length - 1]

    return (
        <ul className={styles.paginationContainer}>
            <li className={`${styles.paginationItem} ${ currentPage === 1 ? styles.disabled : ''}`} onClick={onPrevious}>
                <div className={`${styles.arrow} ${styles.left}`}> Prev </div>
            </li>

            {paginationRange.map((pageNumber, index) => {
                if(pageNumber === DOTS) {
                    return (
                        <li className={`${styles.paginationItem} ${styles.dots}}`} key={index}>&#8230;</li>
                    )
                }

                return (
                    <li className={`${styles.paginationItem} ${styles.number} ${ pageNumber === currentPage ? styles.selected : " "}`} onClick={() => onPageChange(pageNumber)} key={index}>
                        {pageNumber}
                    </li>
                )
            })}

            <li className={`${styles.paginationItem} ${currentPage === lastPage ? styles.disabled : ""}`} onClick={onNext}>
                <div className={`${styles.arrow} ${styles.right}`}>Next</div>
            </li>
        </ul>
    )
}
export default Pagination