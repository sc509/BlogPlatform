import ArticleDetails from "../article-details/article-details.tsx";
import { useParams } from 'react-router-dom';

function SingleArticle() {
    const { slug } = useParams();

    return <ArticleDetails slug={slug} />;
}

export default SingleArticle;
