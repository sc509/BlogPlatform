import { Pagination as AntPagination } from 'antd';
import styles from './pagination.module.scss';
import {paginationSlice} from "../../redux/slice/pagination-slice.ts";
import {useAppSelector, useAppDispatch} from "../../redux/store.ts";

function Paginations() {
  const { paginationFooter } = styles;
  const {setCurrentPage} = paginationSlice.actions
  const currentPage = useAppSelector(state => state.pagination.currentPage);
  const totalCount = useAppSelector(state => state.pagination.articleCount)
  const dispatch = useAppDispatch();

  const handlePageChange = (page:number) =>{
      dispatch(setCurrentPage(page))
  };

  return (
    <div className={paginationFooter}>
        <AntPagination
            current={currentPage}
            total={totalCount}
            onChange={handlePageChange}
            pageSize={5}
            showSizeChanger={false}
        />
    </div>
  );
}

export default Paginations;
