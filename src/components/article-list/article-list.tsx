import ArticleItem from '../article-item/article-item.tsx';
import { useGetArticlesListQuery } from '../../redux/articleApi.tsx';
import { useAppSelector, useAppDispatch } from '../../redux/store.ts';
import { paginationSlice } from '../../redux/slice/pagination-slice.ts';
import { useEffect } from 'react';
import Paginations from '../pagination/paginations.tsx';
import { articleSlice } from '../../redux/slice/article-slice.ts';

function ArticleList() {
  const currentPage = useAppSelector((state) => state.pagination.currentPage);
  const articlesFromStore = useAppSelector((state) => state.article.articleList);
  const { setArticles } = articleSlice.actions;
  const { data: response, error, isLoading } = useGetArticlesListQuery({ page: currentPage });
  const totalCount = response?.articlesCount;
  const { setArticleCount } = paginationSlice.actions;
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (response?.articles) {
      dispatch(setArticles(response.articles));
    }

    if (totalCount) {
      dispatch(setArticleCount(totalCount));
    }
  }, [response, totalCount, dispatch ]);

  if (isLoading) {
    return <div>Loading...</div>;
  } else if (error) {
    return <div>Error: Произошла ошибка во время загрузки</div>;
  } else {
    return (
      <div>
        {articlesFromStore &&
          articlesFromStore.map((article) => {
            const customKey = `${article.createdAt}-${article.title}`;
            return <ArticleItem key={customKey} articles={article} author={article.author} slug={article.slug} />;
          })}
        <Paginations />
      </div>
    );
  }
}

export default ArticleList;