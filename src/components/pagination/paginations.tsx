import { Pagination as AntPagination } from 'antd';
import styles from './pagination.module.scss'

function Paginations(){
    const { paginationFooter } = styles;
    return(
        <div className={paginationFooter}>
            <AntPagination defaultCurrent={1} />
        </div>
    )
}

export default Paginations;