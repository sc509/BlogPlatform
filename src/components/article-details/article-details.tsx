import ReactMarkdown from 'react-markdown';
import { useGetArticleBySlugQuery } from '../../redux/articleApi.tsx';
import styles from './article-details.module.scss';
import { HeartOutlined } from '@ant-design/icons';
import { nanoid } from 'nanoid';

interface ArticleDetailsProps {
  slug: string;
}

function formatDate(dateString: number) {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('en-US', options);
}

function ArticleDetails({ slug }: ArticleDetailsProps) {
  const { data: articleData, error, isLoading } = useGetArticleBySlugQuery(slug);
  const {
    articlesSingle,
    articlesSingleText,
    articlesSingleTextAndLikes,
    articlesSingleLikesCount,
    articlesSingleLikes,
    articlesSingleTag,
    articlesSingleTagButton,
    articlesSingleAuthor,
    articlesSingleAuthorContent,
    articlesSingleName,
    articlesSingleDate,
    articlesSingPhoto,
    articlesSingleUserPhoto,
    articlesSingleLikesAndAuthor,
    markDown,
    articlesSingleDescription,
    articlesSingleDescriptionText,
  } = styles;
  if (isLoading) {
    return <div>Loading...</div>;
  } else if (error) {
    return <div>Error: Произошла ошибка во время загрузки</div>;
  } else {
    const article = articleData.article;
    return (
      <div>
        <div className={articlesSingle}>
          <div className={articlesSingleLikesAndAuthor}>
            <div className={articlesSingleTextAndLikes}>
              <h2 className={articlesSingleText}>{article.title}</h2>
              <div className={articlesSingleLikesCount}>
                <HeartOutlined />
                <span className={articlesSingleLikes}>{article.favoritesCount}</span>
              </div>
            </div>
            <div className={articlesSingleAuthor}>
              <div className={articlesSingleAuthorContent}>
                <p className={articlesSingleName}>{article.author.username}</p>
                <p className={articlesSingleDate}>{formatDate(article.createdAt)}</p>
              </div>
              <div className={articlesSingPhoto}>
                <img src={article.author.image} alt="User Avater" className={articlesSingleUserPhoto} />
              </div>
            </div>
          </div>
          <div className={articlesSingleTag}>
            {article.tagList &&
              article.tagList.map((tag) => {
                return (
                  <button className={articlesSingleTagButton} key={nanoid()}>
                    {tag}
                  </button>
                );
              })}
          </div>
          <div className={articlesSingleDescription}>
            <p className={articlesSingleDescriptionText}>{article.description}</p>
          </div>
          <div className={markDown}>
            <ReactMarkdown>{article.body}</ReactMarkdown>
          </div>
        </div>
      </div>
    );
  }
}

export default ArticleDetails;
