import ArticleItem from '../article-item/article-item.tsx';
import {useGetArticlesListQuery} from "../../redux/articleApi.tsx";

function ArticleList() {
    const {data: response, error, isLoading} = useGetArticlesListQuery();
    const articles = response?.articles;

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
            </div>
        );
    }
}

export default ArticleList;