import styles from './article-item.module.scss';
import { HeartOutlined } from '@ant-design/icons';
import { Article, Author } from '../../redux/types.ts';
import { nanoid } from 'nanoid';
import { Link } from 'react-router-dom';

interface ArticleItemProps {
  articles: Article;
  author: Author;
}

function formatDate(dateString: number) {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('en-US', options);
}

function ArticleItem({ articles }: ArticleItemProps) {
  const {
    article,
    articleTitleBlock,
    articleTitle,
    aritcleLikes,
    articleLikesCount,
    articleTag,
    articleTagButton,
    articleTextBlock,
    articleText,
    aritcleAuthor,
    articlePhoto,
    articleName,
    articleDate,
    articleTitleAndAuthor,
    aritcleAuthorContent,
    articleUserPhoto,
  } = styles;
  console.log(articles.slug)
  return (
    <div className={article}>
      <div className={articleTitleAndAuthor}>
        <div className={articleTitleBlock}>
          <h1 className={articleTitle}>
            <Link to={`/articles/${articles.slug}`}>{articles.title}</Link>
          </h1>
          <div className={aritcleLikes}>
            <HeartOutlined />
            <span className={articleLikesCount}>{articles.favoritesCount}</span>
          </div>
        </div>
        <div className={aritcleAuthor}>
          <div className={aritcleAuthorContent}>
            <p className={articleName}>{articles.author.username}</p>
            <p className={articleDate}>{formatDate(articles.createdAt)}</p>
          </div>
          <div className={articlePhoto}>
            <img src={articles.author.image} alt="User Avater" className={articleUserPhoto} />
          </div>
        </div>
      </div>
      <div className={articleTag}>
        {articles.tagList &&
          articles.tagList.map((tag) => {
            return (
              <button className={articleTagButton} key={nanoid()}>
                {tag}
              </button>
            );
          })}
      </div>
      <div className={articleTextBlock}>
        <p className={articleText}>{articles.description}</p>
      </div>
    </div>
  );
}

export default ArticleItem;