import ArticleItem from '../article-item/article-item.tsx';
import {useGetArticlesListQuery} from "../../redux/articleApi.tsx";
import {useAppSelector, useAppDispatch} from "../../redux/store.ts";
import {paginationSlice} from "../../redux/slice/pagination-slice.ts";
import {useEffect} from "react";
import Paginations from "../pagination/paginations.tsx";

function ArticleList() {
    const currentPage = useAppSelector(state => state.pagination.currentPage);
    const {data: response, error, isLoading} =
        useGetArticlesListQuery({
            page:currentPage,
        });
    const articles = response?.articles;
    const totalCount = response?.articlesCount;
    const {setArticleCount} = paginationSlice.actions;
    const dispatch = useAppDispatch();
    useEffect(() => {
        if (totalCount) {
            dispatch(setArticleCount(totalCount));
        }
    }, [totalCount, dispatch]);

    if (isLoading) {
        return <div>Loading...</div>;
    } else if (error) {
        return <div>Error: Произошла ошибка во время загрузки</div>;
    } else {
        return (
            <div>
                {articles && articles.map((article) => {
                    const customKey = `${article.createdAt}-${article.title}`;
                    return <ArticleItem key={customKey} articles={article} />
                })}
                <Paginations/>
            </div>
        );
    }
}

export default ArticleList;